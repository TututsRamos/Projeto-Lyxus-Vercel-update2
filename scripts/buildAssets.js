// ==========================================================
// Junta os CSS e JS que carregam em TODA página (views/partials/
// head.ejs e scripts.ejs) num único arquivo de cada, pra reduzir
// o número de requisições que o navegador faz antes de conseguir
// mostrar a página.
//
// Hoje cada visita faz o navegador pedir, um por um: 19 arquivos
// CSS (base + componentes) e 5 arquivos JS, fora fontes e ícones
// externos — cada um desses é uma ida e volta separada até o
// servidor. Isso não muda NADA do conteúdo, ordem ou estilo: é o
// mesmo CSS e o mesmo JS, exatamente na mesma ordem em que já
// carregavam, só que entregues num arquivo só em vez de 19 (ou 5).
//
// Não faz minificação agressiva (remover espaços/comentários com
// regex) de propósito — o risco de um regex quebrar algum CSS ou
// JS específico não vale o ganho, que já é pequeno perto do gzip
// que o Express já aplica (compression(), em app.js). O ganho real
// aqui é reduzir REQUISIÇÕES, não bytes.
//
// Roda automaticamente antes de cada deploy na Vercel (ver
// "vercel-build" no package.json) e pode rodar manualmente com
// "npm run build". Sempre que algum desses arquivos CSS/JS for
// editado, rode de novo (ou faça um novo deploy) pra atualizar o
// bundle.
// ==========================================================

import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync, existsSync } from "fs";
import { createHash } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.join(__dirname, "..");
const PUBLIC = path.join(RAIZ, "public");

// Mesma ordem em que os arquivos aparecem hoje em
// views/partials/head.ejs — a ordem do CSS importa (cascata), por
// isso é mantida exatamente igual aqui.
const ARQUIVOS_CSS = [

    "css/base/reset.css",
    "css/base/variables.css",
    "css/base/themes.css",
    "css/base/typography.css",
    "css/base/global.css",
    "css/base/animations.css",
    "css/base/responsive.css",

    "css/components/buttons.css",
    "css/components/navbar.css",
    "css/components/footer.css",
    "css/components/theme-switcher.css",
    "css/components/conta-drawer.css",
    "css/components/cards.css",
    "css/components/forms.css",
    "css/components/faq.css",
    "css/components/processo.css",
    "css/components/feedback.css",
    "css/components/categoria-icone.css",
    "css/components/cookie-banner.css"

];

// Mesma ordem de views/partials/scripts.ejs.
const ARQUIVOS_JS = [

    "js/theme.js",
    "js/navbar.js",
    "js/hero.js",
    "js/conta-drawer.js",
    "js/cookies.js"

];

function juntarArquivos(lista){

    return lista
        .map(caminhoRelativo => {

            const conteudo = readFileSync(path.join(PUBLIC, caminhoRelativo), "utf8");

            // Comentário indicando de onde veio cada trecho, só pra
            // facilitar debug direto no bundle final (não afeta nada).
            return `/* ---- ${caminhoRelativo} ---- */\n${conteudo}`;

        })
        .join("\n\n");

}

function limparPastaAntiga(pasta){

    if(!existsSync(pasta)) return;

    for(const arquivo of readdirSync(pasta)){

        unlinkSync(path.join(pasta, arquivo));

    }

}

function gerarBundle(nome, lista, pastaDestino, extensao){

    const conteudo = juntarArquivos(lista);

    // Hash curto do conteúdo: o nome do arquivo muda sempre que o
    // conteúdo muda, então o "Cache-Control: max-age=7d" do
    // express.static (ver app.js) nunca serve uma versão antiga pro
    // visitante depois de um deploy novo — o HTML sempre aponta pro
    // nome novo.
    const hash = createHash("md5").update(conteudo).digest("hex").slice(0, 10);

    mkdirSync(pastaDestino, { recursive:true });

    limparPastaAntiga(pastaDestino);

    const nomeArquivo = `${nome}.${hash}.${extensao}`;

    writeFileSync(path.join(pastaDestino, nomeArquivo), conteudo, "utf8");

    return nomeArquivo;

}

function build(){

    const nomeCss = gerarBundle("bundle", ARQUIVOS_CSS, path.join(PUBLIC, "css", "dist"), "css");
    const nomeJs = gerarBundle("bundle", ARQUIVOS_JS, path.join(PUBLIC, "js", "dist"), "js");

    const manifestoPasta = path.join(PUBLIC, "dist");

    mkdirSync(manifestoPasta, { recursive:true });

    writeFileSync(

        path.join(manifestoPasta, "manifest.json"),

        JSON.stringify({

            css: `/css/dist/${nomeCss}`,
            js: `/js/dist/${nomeJs}`

        }, null, 2),

        "utf8"

    );

    console.log("✅ Bundle de assets gerado:");
    console.log(`   CSS -> /css/dist/${nomeCss}`);
    console.log(`   JS  -> /js/dist/${nomeJs}`);

}

build();
