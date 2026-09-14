import { obterConfiguracao, obterDestaquesAtivos } from "../utils/cache.js";
import { gerarLinkWhatsapp } from "../utils/whatsapp.js";
//import formatarData from "../utils/formatarData.js";

// Não há cookie-parser no projeto (mesma decisão já tomada em
// comunidadeController.js) — lemos o cookie de consentimento na
// mão pra não precisar de uma dependência nova só pra isso.
function lerCookieConsentimento(req){

    const header = req.headers.cookie || "";

    const match = header
        .split(";")
        .map(c => c.trim())
        .find(c => c.startsWith("lyxus_cookie_consent="));

    if(!match) return null;

    const valor = decodeURIComponent(match.split("=")[1] || "");

    return (valor === "aceito" || valor === "recusado") ? valor : null;

}

export default async function(req,res,next){

    try{

        res.locals.usuario = req.session.usuario || null;

        // Consentimento de cookies (banner Aceitar/Recusar no rodapé
        // público). null = usuário ainda não decidiu (banner aparece);
        // "aceito"/"recusado" = já decidiu nesse navegador. Usado
        // aqui pra decidir se o Google Analytics carrega ou não.
        res.locals.cookieConsent = lerCookieConsentimento(req);

        // Helpers de permissão pras views do dashboard. master/admin
        // sempre têm acesso total; staff só se a chave estiver no
        // array "permissoes" salvo no usuário (definido pelo master
        // em /dashboard/usuarios).
        res.locals.souMaster = !!(req.session.usuario && ["master","admin"].includes(req.session.usuario.tipo));

        res.locals.temPermissao = function(chave){

            const u = req.session.usuario;

            if(!u) return false;

            if(["master","admin"].includes(u.tipo)) return true;

            return Array.isArray(u.permissoes) && u.permissoes.includes(chave);

        };

        // Monta o "src" de uma imagem salva em foto/imagem/logo/banner.
        // Hoje esses campos guardam uma Data URI base64 (ver
        // utils/imagemBase64.js), que já é um "src" pronto — mas
        // registros antigos, salvos antes dessa correção, ainda têm
        // só o nome do arquivo, então continuamos apontando pra
        // "/uploads/" nesse caso pra não quebrar quem já tinha imagem.
        res.locals.urlImagem = function(valor, padrao = "padrao.png"){

            if(!valor) return `/uploads/${padrao}`;

            if(valor.startsWith("data:")) return valor;

            return `/uploads/${valor}`;

        };

        // Configuracao e Destaque vinham direto do banco aqui, TODA
        // requisição (esse middleware roda antes de qualquer rota).
        // obterConfiguracao()/obterDestaquesAtivos() (utils/cache.js)
        // guardam o resultado por 1 minuto e reusam nas requisições
        // seguintes — inclusive já cria o documento de Configuracao
        // com os defaults (inclusive tawk.to) se o master nunca abriu
        // /dashboard/configuracoes ainda, igual antes.
        //
        // As duas consultas não dependem uma da outra, então rodam
        // em paralelo (Promise.all) em vez de uma esperar a outra.
        const [configuracao, destaquesAtivos] = await Promise.all([

            obterConfiguracao(),
            obterDestaquesAtivos()

        ]);

        res.locals.config = configuracao;

        // Destaques da semana — cards mostrados nas telas de login e
        // cadastro (na parte inferior do painel de marca), no lugar
        // do texto fixo genérico. Podem existir vários simultâneos,
        // cada um mirando login, cadastro ou os dois — por isso já
        // separamos aqui em duas listas prontas pra cada tela usar.

        res.locals.destaquesLogin = destaquesAtivos.filter(
            d => d.exibirEm === "ambos" || d.exibirEm === "login"
        );

        res.locals.destaquesCadastro = destaquesAtivos.filter(
            d => d.exibirEm === "ambos" || d.exibirEm === "cadastro"
        );

        // Link pronto do WhatsApp, usado no botão "Contato" da navbar,
        // no ícone do rodapé e em outros pontos do site. Usa o número
        // cadastrado em dashboard/configuracoes; se ainda não tiver
        // sido preenchido, cai no número padrão da LYXUS.
        res.locals.linkWhatsapp = gerarLinkWhatsapp(
            configuracao && configuracao.whatsapp
        );

       // res.locals.formatarData = formatarData;

        next();

    }catch(err){ 

        console.error(err);

        next();

    }

}