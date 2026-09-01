import Contato from "../models/Contato.js";
import Pacote from "../models/Pacote.js";
import Pagamento from "../models/Pagamento.js";

// ==========================================================
// Conteúdo legal da LYXUS (Termos de Uso, Política de Cookies
// e Política de Privacidade/LGPD) fornecido pelo cliente.
// "sigilo" e "outros" continuam com texto-base — não havia
// documento próprio anexado para essas duas abas.
// ==========================================================

const termos = {

    uso:{
        titulo:"Termos de Uso",
        atualizado:"25 de agosto de 2026",
        paragrafos:[
            "1. APRESENTAÇÃO E ACEITAÇÃO",
            "1.1. Os presentes Termos de Uso (“Termos”) regulam o acesso e a utilização do site, sistemas, aplicações, páginas, conteúdos, áreas restritas, painéis, integrações, APIs, canais digitais e demais ambientes tecnológicos disponibilizados pela LYXUS (“Plataforma” ou “Serviços”).",
            "1.2. Ao acessar, navegar, cadastrar-se, contratar, solicitar proposta, utilizar funcionalidades da Plataforma ou manter relacionamento com a LYXUS por meios digitais, o usuário declara que leu, compreendeu e concorda com estes Termos, com a Política de Privacidade, com a Política de Cookies e com os demais documentos eventualmente aplicáveis.",
            "1.3. Caso o usuário não concorde, total ou parcialmente, com estes Termos, não deverá utilizar a Plataforma nem os Serviços disponibilizados pela LYXUS.",
            "1.4. O aceite poderá ocorrer: a) por clique em botão, checkbox, comando eletrônico ou funcionalidade equivalente; b) por assinatura eletrônica ou digital de instrumento contratual; c) pelo uso continuado da Plataforma, quando o ambiente indicar de forma clara que a navegação ou utilização implica concordância com estes Termos, respeitada a legislação aplicável.",
            "1.5. Quando houver contratação formal de serviços entre a LYXUS e o usuário ou empresa por ele representada, os contratos específicos prevalecerão sobre estes Termos naquilo que regularem de forma particular, permanecendo estes Termos aplicáveis de forma complementar.",
            "2. IDENTIFICAÇÃO DA LYXUS",
            "2.1. A Plataforma é disponibilizada pela Lyxus, E-mail de contato: Contato@lyxus.com.br Canal oficial de atendimento: whatsapp +55 53 99183-8611",
            "2.2. Enquanto a pessoa jurídica da LYXUS não estiver formalmente constituída, a operação poderá ser conduzida por pessoa física responsável, cuja identificação completa constará nos instrumentos contratuais, documentos de formalização e comunicações que exijam qualificação legal específica, não sendo necessária sua divulgação integral neste Termo de Uso. Após a constituição da pessoa jurídica, estes Termos deverão ser atualizados para refletir a razão social, o CNPJ, o endereço da sede e a representação legal da LYXUS.",
            "2.3. O usuário reconhece que a identificação da operadora da Plataforma poderá ser atualizada ao longo do tempo, especialmente em caso de constituição societária, reorganização interna ou alteração cadastral, preservando-se os direitos e obrigações assumidos.",
            "3. OBJETO E FINALIDADE DA PLATAFORMA",
            "3.1. A LYXUS atua na área de tecnologia, desenvolvimento web, serviços digitais, infraestrutura, automação, suporte técnico, manutenção de soluções, consultoria e atividades correlatas.",
            "3.2. A Plataforma poderá ter, entre outras, as seguintes finalidades: a) apresentar institucionalmente a LYXUS; b) divulgar serviços, soluções, portfólio, conteúdos e materiais informativos; c) permitir o contato comercial, solicitação de propostas e atendimento; d) disponibilizar áreas restritas, painéis, ambientes de suporte ou relacionamento com clientes, parceiros, fornecedores, candidatos, colaboradores e sócios; e) viabilizar funcionalidades técnicas relacionadas aos serviços prestados pela LYXUS.",
            "3.3. A descrição das funcionalidades e dos serviços poderá ser alterada, expandida, restringida ou descontinuada pela LYXUS a qualquer tempo, observadas as obrigações contratuais já assumidas e os direitos dos usuários afetados.",
            "3.4. A LYXUS poderá oferecer serviços gratuitos, pagos, recorrentes, personalizados, sob demanda ou sujeitos a contratação formal específica, conforme o caso.",
            "4. ELEGIBILIDADE E CAPACIDADE PARA USO",
            "4.1. O uso da Plataforma é permitido somente a pessoas que tenham capacidade legal para praticar atos da vida civil ou que estejam devidamente representadas ou assistidas na forma da lei.",
            "4.2. Caso o usuário atue em nome de pessoa jurídica, declara possuir poderes suficientes para representá-la, contratar, solicitar serviços, fornecer informações e assumir obrigações em nome da entidade representada.",
            "4.3. A LYXUS poderá, a qualquer tempo, exigir comprovação de identidade, de representação legal, de vínculo profissional ou de legitimidade para acesso a funcionalidades específicas da Plataforma.",
            "4.4. O acesso a determinadas áreas, recursos, integrações ou serviços poderá depender de aprovação prévia, contratação formal, perfil de permissão, autenticação reforçada ou outros requisitos técnicos e jurídicos definidos pela LYXUS.",
            "5. CADASTRO, ACESSO E SEGURANÇA DE CONTA",
            "5.1. Algumas funcionalidades poderão exigir cadastro prévio, criação de conta, autenticação ou uso de credenciais específicas.",
            "5.2. O usuário se compromete a: a) fornecer dados verdadeiros, completos, atualizados e compatíveis com sua condição real; b) manter suas informações cadastrais atualizadas; c) não criar conta em nome de terceiro sem autorização válida; d) utilizar exclusivamente suas próprias credenciais, salvo perfis corporativos formalmente autorizados.",
            "5.3. O login, a senha, tokens, chaves de acesso, códigos de autenticação, credenciais de API e demais meios de autenticação são pessoais, sigilosos e intransferíveis, salvo quando a própria LYXUS permitir formalmente o uso corporativo compartilhado sob controle do cliente ou da organização responsável.",
            "5.4. O usuário é responsável por zelar pela segurança de suas credenciais e deverá comunicar imediatamente à LYXUS qualquer suspeita de uso indevido, acesso não autorizado, perda, vazamento ou comprometimento de sua conta.",
            "5.5. A LYXUS poderá suspender, bloquear, limitar ou encerrar acessos quando houver: a) suspeita de fraude; b) uso indevido da conta; c) violação destes Termos; d) risco à segurança da Plataforma; e) determinação legal, regulatória ou contratual.",
            "6. RESPONSABILIDADES DO USUÁRIO",
            "6.1. O usuário é integralmente responsável pelas informações que fornecer, inserir, transmitir, publicar, anexar, sincronizar ou tornar disponíveis por meio da Plataforma.",
            "6.2. O usuário se compromete a: a) utilizar a Plataforma de boa-fé, de forma ética e em conformidade com a legislação; b) não violar direitos de terceiros, inclusive direitos de personalidade, propriedade intelectual, sigilo, honra, imagem, reputação, concorrência e proteção de dados; c) não fornecer dados de terceiros sem base legal adequada ou autorização válida, quando exigida; d) não utilizar a Plataforma para fins ilícitos, abusivos, discriminatórios, fraudulentos, difamatórios ou que possam causar danos à LYXUS, a outros usuários ou a terceiros.",
            "6.3. O usuário responderá pelos danos diretos e indiretos decorrentes de atos praticados a partir de sua conta, de suas credenciais ou de seu ambiente, quando houver culpa, dolo, negligência, imprudência, imperícia ou descumprimento destes Termos.",
            "6.4. O usuário reconhece que a precisão e veracidade dos dados informados são essenciais para o uso regular dos serviços e que inconsistências, omissões ou falsidades podem inviabilizar o atendimento, a contratação, o suporte ou a continuidade da relação com a LYXUS.",
            "7. CONDUTAS PROIBIDAS",
            "7.1. Sem prejuízo de outras vedações previstas em lei, é proibido ao usuário: a) violar, tentar violar ou comprometer a segurança da Plataforma; b) acessar áreas, contas, sistemas ou dados sem autorização; c) usar engenharia reversa, scraping, crawling abusivo, extração automatizada indevida ou técnicas similares sem autorização expressa; d) enviar vírus, malware, scripts maliciosos, cargas automatizadas excessivas, comandos nocivos ou qualquer código que comprometa a integridade da Plataforma; e) utilizar a Plataforma para spam, phishing, fraude, simulação de identidade, desinformação ou manipulação indevida; f) explorar falhas de segurança, bugs ou vulnerabilidades com finalidade ilegítima; g) interferir no funcionamento da Plataforma, em servidores, redes, integrações ou serviços de terceiros conectados; h) reproduzir, copiar, vender, sublicenciar ou explorar comercialmente partes da Plataforma sem autorização; i) utilizar a Plataforma para tratamento de dados pessoais de terceiros em desconformidade com a legislação aplicável.",
            "7.2. A prática de qualquer das condutas acima poderá ensejar, a critério da LYXUS e sem prejuízo de demais medidas: a) advertência; b) suspensão ou bloqueio de acesso; c) cancelamento de conta; d) rescisão contratual; e) adoção de medidas judiciais, extrajudiciais e comunicação às autoridades competentes.",
            "8. PROPRIEDADE INTELECTUAL",
            "8.1. Todos os elementos da Plataforma, incluindo, sem limitação, textos, marcas, nomes empresariais, logotipos, layouts, identidade visual, imagens, bancos de dados, fluxos, códigos-fonte, códigos-objeto, documentações, scripts, APIs, modelos, metodologias, estruturas, funcionalidades, interfaces, materiais institucionais, designs, conteúdos e tecnologias são protegidos pela legislação aplicável e pertencem à LYXUS ou a terceiros que tenham autorizado seu uso.[web:221][web:219]",
            "8.2. Estes Termos não conferem ao usuário qualquer cessão, transferência ou licença ampla de propriedade intelectual, salvo quando expressamente previsto em contrato específico.",
            "8.3. É vedado ao usuário: a) reproduzir, adaptar, modificar, distribuir, sublicenciar, comercializar ou explorar economicamente a Plataforma ou qualquer de seus elementos sem autorização prévia e expressa; b) remover avisos de propriedade, marcas d’água, créditos, mecanismos de proteção ou identificações técnicas; c) utilizar a marca LYXUS ou marcas relacionadas de forma que gere confusão, associação indevida ou prejuízo à reputação da empresa.",
            "8.4. O usuário poderá utilizar a Plataforma apenas nos limites estritamente necessários às finalidades legítimas para as quais o acesso foi concedido.",
            "8.5. Quando o usuário enviar conteúdo, documentos, arquivos, imagens, dados, mensagens, tickets, briefs ou qualquer outro material para a LYXUS no contexto de proposta, contratação, suporte ou execução de serviços, declara possuir legitimidade para fazê-lo e garante que esse envio não viola direitos de terceiros.",
            "9. CONTEÚDO, INFORMAÇÕES E MATERIAIS DO USUÁRIO",
            "9.1. O usuário permanece titular dos direitos que possuir sobre conteúdos e informações por ele enviados, salvo disposição específica em contrato.",
            "9.2. Ao inserir conteúdo na Plataforma para fins de atendimento, execução de serviços, suporte, testes, integração, hospedagem ou operação técnica, o usuário autoriza a LYXUS a acessar, armazenar, processar, reproduzir tecnicamente e utilizar tais materiais na medida necessária à prestação dos serviços, ao cumprimento de contrato, à segurança do ambiente e ao exercício regular de direitos.",
            "9.3. A LYXUS poderá recusar, suspender, remover ou restringir conteúdos e materiais que: a) sejam ilícitos; b) infrinjam direitos de terceiros; c) exponham dados pessoais indevidamente; d) representem risco à segurança; e) contrariem estes Termos, contratos ou políticas aplicáveis.",
            "9.4. A LYXUS não se torna autora, revisora jurídica, auditora de conformidade ou responsável integral pelo conteúdo inserido pelo usuário, salvo quando houver contratação específica prevendo atuação nesse sentido.",
            "10. PLANOS, PROPOSTAS, CONTRATAÇÃO E PAGAMENTOS",
            "10.1. A navegação institucional na Plataforma poderá ser gratuita, mas determinados serviços, funcionalidades, integrações, áreas restritas, assinaturas, planos, licenças, suportes e projetos poderão depender de contratação específica.",
            "10.2. As condições comerciais dos serviços da LYXUS poderão constar em: a) propostas; b) contratos; c) anexos técnicos; d) ordens de serviço; e) páginas de planos, preços e condições, quando existentes.",
            "10.3. Os valores, formas de pagamento, periodicidade, reajustes, prazos, escopo e regras de cancelamento obedecerão ao que estiver expressamente previsto no instrumento comercial ou contratual aplicável.",
            "10.3.1. Nos contratos de prestação continuada, assinaturas, planos, licenças, suporte recorrente ou serviços continuados, os valores poderão ser reajustados a cada 12 (doze) meses, contados da data de início da contratação ou do último reajuste, com base na variação acumulada do IPCA/IBGE, ou, na sua impossibilidade de utilização, por outro índice oficial que venha a substituí-lo.",
            "10.3.2. O atraso no pagamento de qualquer valor devido poderá sujeitar o contratante à incidência de multa moratória de 2% (dois por cento) sobre o valor em atraso, juros de mora de 1% (um por cento) ao mês, calculados pro rata die, e correção monetária, quando cabível e prevista no instrumento aplicável.",
            "10.3.3. Em caso de inadimplemento, a LYXUS poderá encaminhar aviso de cobrança por e-mail, painel da Plataforma, mensagem eletrônica, aplicativo de comunicação, notificação contratual ou outro canal informado pelo contratante, concedendo prazo razoável para regularização antes da adoção de medidas de restrição ou suspensão.",
            "10.3.4. Não havendo regularização após a notificação de cobrança, a LYXUS poderá, observada a natureza do serviço contratado: a) restringir parcialmente funcionalidades não essenciais; b) suspender temporariamente acessos, integrações, licenças, suporte, publicações, áreas restritas ou demais funcionalidades vinculadas ao serviço inadimplido; c) interromper novas entregas, implantações, manutenções evolutivas, suporte técnico não emergencial ou execuções futuras relacionadas ao objeto contratado.",
            "10.3.5. A suspensão por inadimplemento não prejudica a exigibilidade dos valores vencidos, dos encargos moratórios e das demais obrigações contratuais já constituídas, permanecendo o contratante responsável pelos valores devidos até a efetiva regularização ou rescisão, conforme o instrumento aplicável.",
            "10.3.6. A reativação dos serviços ou acessos suspensos poderá depender da comprovação da quitação integral dos valores em aberto, dos encargos incidentes e, quando aplicável, da viabilidade técnica de restabelecimento.",
            "10.3.7. Na hipótese de inadimplência persistente, a LYXUS poderá rescindir a contratação, bloquear definitivamente o acesso ao serviço e adotar as medidas administrativas ou judiciais cabíveis para cobrança dos valores devidos, observado o instrumento contratual aplicável e a legislação vigente.",
            "10.4. Quando a Plataforma permitir contratação, assinatura, pagamento, upgrade, renovação ou cancelamento digital, o usuário declara estar ciente de que tais atos possuem efeitos jurídicos e financeiros compatíveis com a manifestação eletrônica de vontade.",
            "10.5. O eventual processamento de pagamentos poderá ocorrer por meio de terceiros especializados, hipótese em que o usuário também estará sujeito aos termos e políticas desses provedores, sem prejuízo das responsabilidades legais da LYXUS dentro de sua esfera de atuação.",
            "11. DISPONIBILIDADE, MANUTENÇÃO E CONTINUIDADE DOS SERVIÇOS",
            "11.1. A LYXUS envidará esforços razoáveis para manter a Plataforma em funcionamento, segura e disponível, mas não garante disponibilidade ininterrupta, ausência absoluta de falhas, imutabilidade ou compatibilidade irrestrita com todos os dispositivos, navegadores, integrações ou ambientes externos.",
            "11.2. A Plataforma poderá sofrer: a) indisponibilidades temporárias; b) atualizações; c) manutenções programadas ou emergenciais; d) alterações técnicas, visuais ou funcionais; e) suspensão parcial de recursos; f) descontinuação de ferramentas ou integrações.",
            "11.3. Sempre que razoavelmente possível, a LYXUS poderá comunicar manutenções programadas ou alterações relevantes, sem que isso constitua obrigação absoluta em todos os casos.",
            "11.4. A continuidade de certas funcionalidades poderá depender de serviços de terceiros, provedores de nuvem, APIs, registradores, serviços de e-mail, gateways, operadoras, bancos, navegadores ou outros agentes externos sobre os quais a LYXUS não detém controle integral.",
            "12. LIMITAÇÃO DE RESPONSABILIDADE",
            "12.1. A LYXUS não garante que a Plataforma atenderá integralmente a expectativas subjetivas do usuário quando tais expectativas não estiverem formalmente previstas em contrato, especificação técnica, proposta aprovada ou obrigação legal aplicável.",
            "12.2. Sem prejuízo das normas de ordem pública e dos direitos irrenunciáveis previstos em lei, a LYXUS não será responsável por: a) falhas decorrentes de culpa exclusiva do usuário; b) uso indevido da Plataforma ou descumprimento de instruções; c) indisponibilidade, falha ou alteração em serviços de terceiros; d) ataques, incidentes ou eventos causados exclusivamente por terceiros, quando não houver falha própria comprovada da LYXUS; e) danos indiretos, lucros cessantes, perda de oportunidade, perda de receita, perda de dados por falha externa, salvo quando a responsabilidade decorrer de obrigação legal específica ou culpa comprovada da LYXUS; f) conteúdos, decisões, atos e omissões praticados pelo usuário ou por terceiros por ele autorizados.",
            "12.3. Quando houver áreas logadas, integrações, APIs, automações ou ambientes administrativos, o usuário reconhece que a segurança também depende de suas próprias práticas, como: a) proteção de senha; b) gestão de acessos internos; c) segurança do dispositivo; d) uso de rede confiável; e) cuidado com compartilhamento de credenciais.",
            "12.4. A eventual responsabilidade da LYXUS, quando reconhecida, observará os limites previstos em lei e nos contratos específicos aplicáveis, sem prejuízo da análise do caso concreto.",
            "13. PRIVACIDADE, COOKIES E PROTEÇÃO DE DADOS",
            "13.1. O tratamento de dados pessoais realizado no contexto da Plataforma será disciplinado pela Política de Privacidade da LYXUS, pela Política de Cookies, pelo Sumário de Privacidade e, quando aplicável, por contratos específicos celebrados com clientes, parceiros, fornecedores, candidatos, colaboradores e demais titulares.",
            "13.2. Os presentes Termos não substituem mecanismos próprios de obtenção de consentimento, quando exigidos por lei, nem dispensam a observância das bases legais aplicáveis ao tratamento de dados pessoais.",
            "13.3. Ao utilizar a Plataforma, o usuário reconhece que determinados dados técnicos e operacionais poderão ser tratados para: a) autenticação; b) segurança; c) prevenção a fraudes; d) auditoria; e) manutenção de sessão; f) melhoria de desempenho; g) cumprimento de obrigações legais e exercício regular de direitos.",
            "13.4. Quando a LYXUS atuar como operadora em nome de cliente controlador, o tratamento de dados poderá obedecer também às instruções documentadas desse cliente e às políticas próprias do serviço correspondente.",
            "13.5. O usuário poderá exercer direitos relacionados aos seus dados pessoais pelos canais indicados na Política de Privacidade.",
            "14. RELAÇÃO COM TERCEIROS E SERVIÇOS EXTERNOS",
            "14.1. A Plataforma poderá conter links, integrações, embeds, bibliotecas, APIs, serviços de autenticação, plugins, ferramentas de análise, provedores de pagamento, repositórios, meios de comunicação, redes sociais e outros recursos mantidos por terceiros.",
            "14.2. Tais ambientes externos possuem regras próprias, termos próprios e políticas próprias, pelas quais seus respectivos responsáveis respondem dentro de sua esfera de atuação.",
            "14.3. A presença de link, integração ou referência a terceiros não implica endosso integral, garantia ou assunção automática de responsabilidade pela LYXUS sobre conteúdo, segurança, disponibilidade, práticas comerciais ou tratamentos de dados realizados por terceiros.",
            "14.4. O usuário é responsável por ler os termos, políticas e condições dos terceiros que utilizar no contexto da Plataforma.",
            "15. COMUNICAÇÕES, NOTIFICAÇÕES E CANAIS OFICIAIS",
            "15.1. A LYXUS poderá entrar em contato com o usuário por e-mail, telefone, WhatsApp, notificações no sistema, avisos em painel, documentos eletrônicos, comunicações contratuais ou outros meios razoáveis compatíveis com o relacionamento existente.",
            "15.2. O usuário é responsável por manter seus dados de contato atualizados.",
            "15.3. Comunicações enviadas aos canais informados pelo usuário serão consideradas válidas para todos os efeitos permitidos em lei, salvo prova de erro imputável exclusivamente à LYXUS.",
            "15.4. A LYXUS poderá disponibilizar canais específicos para: a) suporte; b) comercial; c) privacidade e proteção de dados; d) financeiro; e) notificações jurídicas ou contratuais.",
            "16. SUSPENSÃO, ENCERRAMENTO E DESCONTINUIDADE DE ACESSO",
            "16.1. A LYXUS poderá suspender, restringir ou encerrar o acesso do usuário, total ou parcialmente, observada a natureza do serviço contratado, a gravidade da situação e a legislação aplicável, nas seguintes hipóteses: a) violação destes Termos ou dos instrumentos contratuais aplicáveis; b) risco relevante à segurança da Plataforma, da infraestrutura, dos dados, de outros usuários ou de terceiros; c) descumprimento contratual, inclusive inadimplemento, quando aplicável; d) comportamento abusivo, fraudulento, ilícito ou incompatível com a boa-fé objetiva; e) cumprimento de ordem judicial, administrativa ou regulatória; f) necessidade técnica relevante, desde que não emergencial e, sempre que tecnicamente possível, precedida de comunicação prévia em prazo razoável.",
            "16.1.1. A suspensão imediata, sem aviso prévio, somente poderá ocorrer quando houver risco grave ou iminente à segurança da Plataforma, à integridade da infraestrutura, à proteção de dados, aos direitos de terceiros, em caso de fraude, uso ilícito, violação grave destes Termos, determinação legal ou situação emergencial que exija resposta imediata. Em tais hipóteses, a LYXUS poderá comunicar o usuário concomitantemente ao ato ou tão logo seja razoavelmente possível.",
            "16.1.2. Nas hipóteses de manutenção programada, atualização, correção, migração, ajuste técnico, evolução de infraestrutura ou outras medidas previsíveis que possam causar indisponibilidade parcial ou total, a LYXUS deverá, sempre que tecnicamente possível, comunicar o usuário com antecedência razoável, indicando a natureza da intervenção, a previsão estimada de impacto e, quando aplicável, a janela de manutenção. Fontes jurídicas e práticas contratuais recomendam distinguir manutenção programada de intervenção emergencial, com aviso prévio para a primeira e comunicação tão logo possível para a segunda.",
            "16.1.3. Sempre que compatível com a gravidade do caso e com a proteção da Plataforma, a LYXUS poderá adotar medidas graduais antes do encerramento definitivo, tais como aviso, limitação de funcionalidades, bloqueio temporário, solicitação de regularização, suspensão parcial ou outras providências proporcionais. A suspensão sumária sem informação clara pode ser considerada abusiva em certos contextos, especialmente quando não houver risco grave ou motivo concreto suficientemente demonstrável.",
            "16.1.4. Nos casos de suspensão motivada por suposta infração do usuário que não envolva risco grave e imediato, a LYXUS poderá, conforme a natureza do serviço e a viabilidade operacional, permitir manifestação, esclarecimento ou regularização pelo usuário antes do encerramento definitivo da relação. Precedentes e análises jurídicas indicam maior defensabilidade quando há informação adequada e oportunidade posterior ou prévia de regularização, especialmente fora de cenários emergenciais.",
            "16.2. O usuário poderá solicitar cancelamento de conta ou encerramento de relacionamento nos termos da legislação e dos instrumentos contratuais aplicáveis, observado que determinadas informações poderão ser retidas por obrigação legal, contratual ou para exercício regular de direitos.",
            "16.3. A suspensão ou o encerramento de acesso não afasta obrigações anteriormente constituídas, inclusive financeiras, contratuais, de confidencialidade, propriedade intelectual, preservação de prova e proteção de dados. A interrupção indevida de serviços pode gerar discussão sobre perdas e danos e até lucros cessantes quando houver prejuízo comprovado ao cliente, razão pela qual critérios, aviso e proporcionalidade reduzem risco jurídico.",
            "17. ALTERAÇÕES DESTES TERMOS",
            "17.1. A LYXUS poderá revisar, atualizar ou modificar estes Termos a qualquer tempo para refletir: a) mudanças legais ou regulatórias; b) mudanças nas funcionalidades da Plataforma; c) evolução tecnológica; d) alterações em práticas operacionais, comerciais ou de segurança.",
            "17.2. A versão vigente será publicada nos canais oficiais da LYXUS, com indicação da data de atualização.",
            "17.3. Quando a alteração impactar de forma relevante direitos ou obrigações dos usuários, a LYXUS poderá adotar medidas adicionais de comunicação, conforme a natureza do serviço e a viabilidade operacional.",
            "17.4. O uso continuado da Plataforma após a entrada em vigor da nova versão poderá caracterizar aceite das modificações, quando permitido pela legislação aplicável e desde que o usuário tenha sido razoavelmente informado.",
            "18. INTEGRIDADE DOCUMENTAL E PREVALÊNCIA",
            "18.1. Estes Termos devem ser interpretados em conjunto com: a) a Política de Privacidade; b) a Política de Cookies; c) o Sumário de Privacidade e Tratamento de Dados; d) contratos, anexos, ordens de serviço, propostas e instrumentos específicos celebrados com a LYXUS; e) eventuais avisos específicos de funcionalidades ou ambientes determinados.",
            "18.2. Em caso de conflito entre estes Termos e contrato específico celebrado entre as partes, prevalecerá o contrato específico naquilo que tratar de forma particular, sem prejuízo da aplicação complementar destes Termos.",
            "18.3. A eventual nulidade ou inexequibilidade de uma cláusula não comprometerá as demais disposições, que permanecerão válidas e eficazes na maior extensão permitida pela legislação.",
            "19. LEI APLICÁVEL E FORO",
            "19.1. Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa do Brasil.",
            "19.2. Fica eleito o foro da Comarca de Bagé/Rio Grande do Sul, com renúncia a qualquer outro, por mais privilegiado que seja, para dirimir controvérsias decorrentes destes Termos, ressalvadas as hipóteses em que a legislação aplicável imponha foro diverso, especialmente em relações submetidas a normas de proteção do consumidor.",
            "19.3. Antes da adoção de medidas judiciais, as partes poderão buscar solução administrativa ou extrajudicial, quando isso for compatível com a natureza do conflito.",
            "20. CONTATO",
            "20.1. Para dúvidas sobre estes Termos, solicitações, suporte ou comunicações formais, o usuário poderá entrar em contato pelos canais oficiais da LYXUS:",
            "E-mail: Legal@lyxus.com.br Canal de suporte: whatsapp +55 53 99183-8611"
        ]
    },

    sigilo:{
        titulo:"Termo de Sigilo e Confidencialidade",
        atualizado:"Agosto de 2026",
        paragrafos:[
            "Toda informação trocada entre a LYXUS e o cliente durante uma proposta ou projeto — incluindo dados de negócio, documentos, senhas e materiais entregues — é tratada como confidencial.",
            "A equipe LYXUS se compromete a não divulgar, comercializar ou compartilhar informações do cliente com terceiros sem autorização expressa.",
            "Essa obrigação de sigilo permanece válida mesmo após o encerramento do contrato ou da proposta, por prazo indeterminado, salvo disposição contrária acordada entre as partes."
        ]
    },

    cookies:{
        titulo:"Política de Cookies",
        atualizado:"13 de agosto de 2026",
        paragrafos:[
            "1. APRESENTAÇÃO",
            "1.1. Esta Política de Cookies da LYXUS (“Lyxus”, “nós”) explica, de forma clara e transparente, como utilizamos cookies e tecnologias semelhantes em nossos sites, páginas, sistemas e aplicações.",
            "1.2. Esta Política complementa a Política de Privacidade da LYXUS e deve ser lida em conjunto com ela, bem como com os Termos de Uso eventualmente aplicáveis.",
            "1.3. O objetivo deste documento é informar ao usuário: a) quais cookies e tecnologias semelhantes podem ser utilizados; b) para quais finalidades eles são utilizados; c) quais dados podem ser coletados por meio desses recursos; d) por quanto tempo eles podem permanecer ativos; e) se há compartilhamento com terceiros; f) como o usuário pode gerenciar suas preferências, inclusive aceitar, recusar ou revogar consentimentos.",
            "1.4. A LYXUS busca seguir as boas práticas indicadas pela legislação aplicável, em especial a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD), bem como orientações da Autoridade Nacional de Proteção de Dados (ANPD).",
            "2. O QUE SÃO COOKIES E TECNOLOGIAS SEMELHANTES",
            "2.1. Cookies são pequenos arquivos ou registros digitais armazenados no dispositivo do usuário quando ele acessa um site, sistema ou aplicação.",
            "2.2. Esses arquivos podem permitir, entre outras funções: a) o funcionamento técnico de páginas e sistemas; b) o reconhecimento do navegador ou do dispositivo utilizado; c) a memorização de preferências do usuário; d) a coleta de informações estatísticas sobre navegação; e) a personalização de conteúdo e experiências; f) o suporte a funcionalidades de segurança, autenticação e prevenção a fraudes.",
            "2.3. Além de cookies, a LYXUS poderá utilizar tecnologias semelhantes, como identificadores de sessão, pixels, logs de rastreamento, armazenamento local do navegador e outros mecanismos compatíveis com a finalidade informada nesta Política.",
            "3. TIPOS DE COOKIES UTILIZADOS PELA LYXUS",
            "3.1. A LYXUS poderá utilizar cookies próprios (primários) e cookies de terceiros, conforme a funcionalidade e os serviços integrados aos seus ambientes digitais.",
            "3.2. Os cookies podem ser classificados, quanto à duração, como: a) cookies de sessão, que expiram ao final da navegação ou quando o navegador é fechado; e b) cookies persistentes, que permanecem armazenados no dispositivo por período determinado ou até exclusão manual pelo usuário.",
            "3.3. Quanto à finalidade, a LYXUS poderá utilizar as seguintes categorias:",
            "I – Cookies estritamente necessários 3.3.1. São cookies indispensáveis para o funcionamento do site, aplicação ou sistema, permitindo funções essenciais como: a) autenticação de usuário; b) manutenção de sessão; c) segurança de acesso; d) prevenção de fraudes; e) balanceamento técnico de recursos; f) registro de preferências essenciais de privacidade ou consentimento.",
            "3.3.2. Sem esses cookies, determinadas funcionalidades podem não operar corretamente ou se tornar indisponíveis.",
            "II – Cookies de funcionalidade 3.3.3. São cookies utilizados para lembrar escolhas e preferências do usuário, como idioma, região, preferências de visualização e outras configurações não estritamente necessárias, mas que tornam a navegação mais conveniente.",
            "III – Cookies analíticos ou de desempenho 3.3.4. São cookies utilizados para entender como os usuários interagem com os ambientes digitais da LYXUS, permitindo: a) mensuração de tráfego; b) análise de páginas acessadas; c) detecção de erros; d) análise de desempenho e usabilidade.",
            "3.3.5. Esses cookies ajudam a melhorar nossos serviços, mas não são essenciais ao funcionamento básico da navegação.",
            "IV – Cookies de publicidade, marketing e rastreamento 3.3.6. São cookies utilizados para: a) medir a eficácia de campanhas; b) personalizar anúncios; c) limitar repetição de publicidade; d) identificar padrões de navegação relacionados a ações de marketing e relacionamento.",
            "3.3.7. Quando utilizados, esses cookies não serão ativados sem base legal adequada, especialmente consentimento quando exigido pela legislação aplicável.",
            "4. QUAIS DADOS PODEM SER COLETADOS POR MEIO DE COOKIES",
            "4.1. Dependendo da categoria e da finalidade do cookie, poderão ser coletados dados como: a) endereço IP; b) identificadores de sessão; c) tipo de navegador, idioma, sistema operacional e dispositivo utilizado; d) dados de localização aproximada ou região de acesso; e) páginas visitadas, tempo de navegação, cliques e interações; f) registros de ações realizadas em áreas logadas; g) horário e data de acesso (timestamp); h) informações de origem do acesso, incluindo navegador, dispositivo e parâmetros técnicos da conexão.",
            "4.2. Em determinadas situações, os dados coletados por cookies podem estar associados a outros dados pessoais já tratados pela LYXUS, especialmente quando o usuário estiver autenticado em sistemas ou áreas restritas.",
            "4.3. Sempre que possível, a LYXUS observará os princípios da necessidade, adequação e minimização, evitando a coleta excessiva de dados.",
            "5. FINALIDADES DO USO DE COOKIES",
            "5.1. A LYXUS utiliza cookies e tecnologias semelhantes para as seguintes finalidades: a) permitir o funcionamento técnico e seguro de seus ambientes digitais; b) autenticar usuários e manter sessões ativas; c) registrar preferências do usuário, inclusive preferências de privacidade; d) prevenir fraudes, acessos indevidos e incidentes de segurança; e) gerar estatísticas e análises sobre uso, desempenho e estabilidade; f) aprimorar a experiência do usuário e a qualidade dos serviços; g) apoiar, quando aplicável, ações de comunicação e marketing com base legal adequada.",
            "5.2. A finalidade específica de cada cookie poderá variar conforme o ambiente digital, sistema, integração de terceiros ou funcionalidade disponível naquele momento.",
            "6. BASES LEGAIS PARA O USO DE COOKIES",
            "6.1. A LYXUS poderá utilizar diferentes bases legais para o tratamento de dados pessoais por meio de cookies, conforme a natureza e a finalidade de cada categoria.",
            "6.2. Em regra: a) cookies estritamente necessários poderão ser utilizados com fundamento na execução regular dos serviços, segurança da informação, legítimo interesse e demais hipóteses legais aplicáveis, desde que respeitados os direitos do titular; b) cookies analíticos, de funcionalidade não essencial e de marketing serão utilizados, quando exigido pela legislação, com base no consentimento do usuário.",
            "6.3. Sempre que o consentimento for a base legal aplicável: a) os cookies correspondentes serão desativados por padrão até manifestação válida do usuário; b) o usuário poderá aceitar, rejeitar ou configurar categorias de cookies; c) a revogação do consentimento poderá ser feita de forma tão simples quanto a sua concessão.",
            "6.4. A recusa de cookies não essenciais não impedirá o acesso às funcionalidades básicas do site, ressalvadas limitações estritamente relacionadas aos recursos opcionais que dependam desses cookies.",
            "7. GESTÃO DE CONSENTIMENTO E PREFERÊNCIAS",
            "7.1. Ao acessar os ambientes digitais da LYXUS, o usuário poderá visualizar um banner ou painel de preferências de cookies.",
            "7.2. Esse mecanismo poderá permitir: a) aceitar todos os cookies aplicáveis; b) rejeitar todos os cookies não necessários; c) escolher, de forma granular, quais categorias de cookies deseja permitir.",
            "7.3. O consentimento, quando coletado, poderá ser registrado para fins de demonstração de conformidade.",
            "7.4. O usuário poderá, a qualquer momento: a) revisar suas escolhas; b) alterar preferências; c) retirar consentimento anteriormente concedido.",
            "7.5. A retirada do consentimento não afeta a licitude do tratamento realizado com base no consentimento previamente manifestado, mas impedirá a continuidade do uso dos cookies correspondentes dali em diante, quando tecnicamente viável.",
            "8. COMPARTILHAMENTO COM TERCEIROS",
            "8.1. Alguns cookies poderão ser operados por terceiros contratados ou integrados aos ambientes digitais da LYXUS, como ferramentas de: a) analytics; b) hospedagem e infraestrutura; c) autenticação; d) atendimento e suporte; e) marketing e mensuração de campanhas.",
            "8.2. Quando houver cookies de terceiros, os dados coletados por esses recursos poderão ser compartilhados com os respectivos provedores, de acordo com suas próprias políticas e condições de tratamento.",
            "8.3. A LYXUS procura selecionar parceiros que adotem padrões adequados de segurança e proteção de dados, mas recomenda que o usuário também consulte as políticas dos respectivos terceiros quando tais integrações estiverem presentes.",
            "8.4. O compartilhamento com terceiros ocorrerá de forma compatível com as finalidades informadas nesta Política, na Política de Privacidade e na legislação aplicável.",
            "9. PRAZOS DE RETENÇÃO DOS COOKIES",
            "9.1. Os cookies utilizados pela LYXUS poderão permanecer ativos: a) apenas durante a sessão do usuário; ou b) por períodos definidos conforme sua finalidade e configuração técnica.",
            "9.2. De forma geral: a) cookies de sessão são removidos automaticamente quando o navegador é encerrado; b) cookies persistentes permanecem armazenados até o fim de seu prazo de validade, exclusão manual pelo usuário ou revogação da autorização correspondente.",
            "9.3. Sempre que possível, a LYXUS buscará limitar a retenção de cookies ao tempo necessário para cumprir a finalidade específica para a qual foram utilizados.",
            "9.4. Informações técnicas complementares sobre duração e finalidade poderão ser apresentadas: a) no painel de preferências de cookies; b) em tabelas específicas de cookies em páginas da LYXUS; ou c) em documentos complementares integrados a esta Política.",
            "10. COMO DESABILITAR OU BLOQUEAR COOKIES",
            "10.1. O usuário poderá, a qualquer momento, bloquear, excluir ou desabilitar cookies por meio: a) do painel ou banner de preferências disponibilizado pela LYXUS, quando aplicável; e/ou b) das configurações do navegador ou dispositivo utilizado.",
            "10.2. O procedimento para gerenciamento de cookies pode variar conforme o navegador. Em geral, os navegadores mais comuns oferecem opções para: a) visualizar cookies armazenados; b) excluir cookies individualmente ou em lote; c) bloquear cookies de terceiros; d) bloquear todos os cookies; e) receber alerta antes do armazenamento.",
            "10.3. O bloqueio de cookies estritamente necessários poderá comprometer o funcionamento de partes do site, sistema ou aplicação.",
            "10.4. Caso algum mecanismo de rastreamento não possa ser desabilitado diretamente pelo navegador, essa informação deverá ser informada pela LYXUS no ambiente correspondente ou em documento complementar.",
            "11. SEGURANÇA E PROTEÇÃO DOS DADOS COLETADOS POR COOKIES",
            "11.1. Os dados pessoais coletados por meio de cookies e tecnologias semelhantes são protegidos por medidas técnicas e administrativas compatíveis com a natureza dos serviços e os riscos envolvidos.",
            "11.2. Tais medidas podem incluir: a) controle de acessos; b) segregação de ambientes; c) monitoramento de segurança; d) gestão de logs; e) revisão periódica de permissões e integrações; f) avaliação de fornecedores e serviços de terceiros.",
            "11.3. Ainda que a LYXUS adote boas práticas de segurança, nenhum ambiente digital é absolutamente imune a falhas ou incidentes. Por isso, o uso de recursos de segurança também depende de condutas adequadas dos próprios usuários, como cuidado com credenciais, dispositivos e redes utilizadas.",
            "12. DIREITOS DOS TITULARES",
            "12.1. Sempre que o tratamento de dados pessoais por meio de cookies envolver dados sujeitos à LGPD, o titular poderá exercer os direitos previstos em lei, conforme detalhado na Política de Privacidade da LYXUS, incluindo: a) confirmação da existência de tratamento; b) acesso aos dados; c) correção de dados incompletos, inexatos ou desatualizados; d) eliminação, anonimização ou bloqueio, quando cabível; e) informação sobre compartilhamento com terceiros; f) revogação de consentimento, quando essa for a base legal; g) oposição ao tratamento, quando cabível.",
            "12.2. O exercício desses direitos poderá depender da possibilidade técnica de vincular o dado ao titular, especialmente em operações realizadas com identificadores técnicos ou dados pseudonimizados.",
            "13. ALTERAÇÕES DESTA POLÍTICA",
            "13.1. Esta Política de Cookies poderá ser alterada a qualquer tempo para refletir: a) mudanças na legislação; b) mudanças nas orientações da ANPD; c) atualização de ferramentas, tecnologias, integrações e funcionalidades da LYXUS; d) alterações na forma de uso de cookies e mecanismos semelhantes.",
            "13.2. A versão vigente será disponibilizada nos canais oficiais da LYXUS, com indicação da data de atualização.",
            "14. CONTATO",
            "14.1. Em caso de dúvidas sobre esta Política de Cookies, sobre o uso de cookies pela LYXUS ou sobre o tratamento de dados pessoais relacionado a esses recursos, o usuário poderá entrar em contato pelos canais oficiais da empresa.",
            "14.2. Dados de contato: E-mail: Legal@lyxus.com.br whatsapp +55 53 99183-8611",
            "15. DISPOSIÇÕES FINAIS",
            "15.1. Esta Política de Cookies deve ser interpretada em conjunto com a Política de Privacidade, os Termos de Uso e, quando aplicável, com contratos específicos celebrados com a LYXUS.",
            "15.2. Em caso de conflito entre esta Política e disposições legais imperativas, prevalecerá a legislação aplicável."
        ]
    },

    lgpd:{
        titulo:"Política de Privacidade",
        atualizado:"13 de agosto de 2026",
        paragrafos:[
            "1. APRESENTAÇÃO",
            "1.1. A LYXUS (“Lyxus”, “nós”) valoriza a proteção dos dados pessoais dos titulares que se relacionam conosco, sejam leads, clientes, representantes, parceiros, fornecedores, candidatos, colaboradores ou sócios.",
            "1.2. Esta Política de Privacidade tem por finalidade informar, de forma clara e transparente, como a Lyxus coleta, utiliza, armazena, compartilha e protege dados pessoais, em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD) e demais normas aplicáveis.",
            "1.3. Ao utilizar nossos sites, sistemas, aplicações, canais de atendimento ou ao celebrar contratos com a Lyxus, o titular declara estar ciente de que seus dados pessoais poderão ser tratados nos termos desta Política.",
            "2. ÂMBITO DE APLICAÇÃO 2.1. Esta Política se aplica ao tratamento de dados pessoais realizado pela Lyxus na qualidade de Controladora, inclusive quando o tratamento ocorrer: a) por meio do site institucional da Lyxus e eventuais landing pages; b) por meio de sistemas, aplicações e plataformas desenvolvidos e/ou operados pela Lyxus; c) no contexto da celebração e execução de contratos de prestação de serviços; d) em processos de prospecção comercial, atendimento, suporte, gestão de parceiros, seleção de candidatos, administração de colaboradores e relacionamento com sócios. 2.2. Quando a Lyxus atuar na qualidade de Operadora de dados pessoais, no âmbito da prestação de serviços de tecnologia a clientes que sejam Controladores, o tratamento observará exclusivamente as instruções do respectivo Controlador e as condições previstas no contrato aplicável e no respectivo Acordo de Tratamento de Dados Pessoais (DPA), não se aplicando, nesse caso, esta Política como documento definidor das finalidades e meios do tratamento por parte da Lyxus.",
            "3. CATEGORIAS DE TITULARES E DADOS COLETADOS",
            "3.1. LEADS (CONTATOS COMERCIAIS E INTERESSADOS)",
            "3.1.1. A Lyxus poderá tratar dados pessoais de leads, entendidos como pessoas que demonstram interesse em nossos serviços, incluindo: a) dados de identificação e contato fornecidos em formulários, e-mails, mensagens ou interações semelhantes, como nome, e-mail, telefone, empresa e cargo, conforme o contexto; e b) dados técnicos, logs e dados de rastreamento utilizados para fins de segurança, autenticação, auditoria, prevenção a fraudes, melhoria dos serviços e análise de desempenho, tais como: endereço IP; cookies e identificadores de sessão; dados de localização aproximada; logs de sistema; registros de ações realizadas em sistemas da Lyxus; data e horário de acesso; identificadores internos de usuário, quando aplicáveis; e origem do acesso, como dispositivo, navegador e rede utilizada.",
            "3.2. CLIENTES E POSSÍVEIS CLIENTES",
            "3.2.1. Para fins de análise de proposta, negociação, contratação e execução de serviços, a Lyxus poderá tratar dados pessoais de clientes e potenciais clientes, incluindo:",
            "a)dados de identificação, como nome e sobrenome, RG, CPF ou CNPJ, nacionalidade, estado civil e fotografia ou imagem, quando necessária à identificação, à segurança ou ao cumprimento de procedimentos internos;",
            "b)dados de contato e endereço, como endereço residencial ou comercial, e-mail pessoal e/ou profissional, números de telefone, cargo, empresa e setor;",
            "c)dados financeiros e de cobrança, como número de conta bancária, banco e agência, dados de faturamento, vencimentos, formas de pagamento, dados de cartão bancário ou cartão de crédito, quando utilizados para pagamento dos serviços, histórico de contratos e transações, referências comerciais e informações de análise de risco e score de crédito, quando necessárias à contratação, à mitigação de fraude, à concessão de condições comerciais ou à avaliação de adimplemento, observados os direitos do titular previstos na LGPD, inclusive o direito à revisão de decisões automatizadas;",
            "d) dados técnicos, logs e dados de rastreamento relacionados ao uso de sistemas, portais, APIs ou ferramentas operadas pela Lyxus, tais como endereço IP; cookies e identificadores de sessão; dados de localização aproximada; logs de sistema; registros de ações realizadas em registros ou ambientes controlados pela Lyxus; data e horário de acesso; identificadores internos de usuário; e origem do acesso, como dispositivo, navegador e rede utilizada.",
            "3.3. REPRESENTANTES DE CLIENTES (PESSOA FÍSICA VINCULADA A CNPJ)",
            "3.3.1. Quando o cliente for pessoa jurídica, a Lyxus poderá tratar dados pessoais de seus representantes, sócios ou responsáveis legais, tais como:",
            "a) dados de identificação: - nome e sobrenome; - RG, CPF ou CNPJ; - fotografia/imagem da pessoa (para identificação e segurança); - endereço residencial ou comercial;",
            "b) dados de contato: - e-mail pessoal e/ou profissional; - números de telefone fixo e celular;",
            "c) dados profissionais: - cargo, empresa, setor; - matrícula interna, quando aplicável;",
            "d) dados financeiros e de cobrança: - número de conta bancária, banco e agência; - dados de cobrança; - dados de cartão bancário/cartão de crédito, quando aplicável; - histórico de contratos e relacionamento;",
            "e) dados técnicos, logs e rastreamento, relacionados ao uso de sistemas, nos mesmos moldes indicados para clientes.",
            "3.4. PARCEIROS, FORNECEDORES E PRESTADORES",
            "3.4.1. Para gestão de parcerias, contratação de fornecedores e prestadores de serviço, a Lyxus poderá tratar dados de:",
            "a) identificação: - nome e sobrenome; - RG, CPF ou CNPJ; - fotografia/imagem, quando necessária; - endereço residencial ou comercial;",
            "b) contato: - e-mail pessoal e/ou profissional; - números de telefone fixo e celular;",
            "c) dados profissionais: - cargo, empresa, setor; - matrícula interna, quando aplicável;",
            "d) dados financeiros: - número de conta bancária, banco, agência, para fins de pagamento; - histórico de contratos e relacionamento;",
            "e) dados técnicos, logs e rastreamento, relacionados ao uso de sistemas de gestão, portais ou integrações, conforme já descrito.",
            "3.5. CANDIDATOS A VAGAS",
            "3.5.1. No contexto de processos seletivos, a Lyxus poderá tratar dados de candidatos, tais como:",
            "a) dados de identificação: - nome e sobrenome; - data e local de nascimento; - RG, CPF ou CNPJ; - nacionalidade, estado civil; - fotografia/imagem da pessoa (quando fornecida em currículos ou perfis profissionais);",
            "b) dados de contato e endereço: - endereço residencial; - e-mail pessoal; - números de telefone fixo e celular;",
            "c) dados profissionais e de histórico: - cargo, empresa, setor atuais ou anteriores; - número da carteira de trabalho, quando aplicável; - histórico de funções, experiências, avaliações de desempenho e faixas salariais informadas ou apuradas no processo seletivo;",
            "d) dados financeiros e de pagamento (quando a contratação se concretizar): - número de conta bancária, banco, agência;",
            "e) dados técnicos, logs e rastreamento, decorrentes de uso de plataformas de recrutamento ou sistemas internos, na mesma linha dos dados de logs já descritos.",
            "3.6. COLABORADORES E SÓCIOS",
            "3.6.1. Para fins de cumprimento de obrigações trabalhistas, previdenciárias, fiscais, contratuais e de gestão interna, a Lyxus poderá tratar dados pessoais de colaboradores e sócios, tais como:",
            "a) identificação: - nome e sobrenome; - data e local de nascimento; - RG, CPF ou CNPJ; - nacionalidade, estado civil; - fotografia/imagem;",
            "b) contato e endereço: - endereço residencial; - e-mail pessoal e/ou corporativo; - números de telefone fixo e celular;",
            "c) dados profissionais: - cargo, empresa, setor; - número da carteira de trabalho, matrícula interna; - histórico de funções, avaliações de desempenho, dados de jornada (quando aplicável);",
            "d) dados financeiros: - número de conta bancária, banco, agência; - informações de remuneração, benefícios, participação societária, quando aplicável;",
            "e) dados técnicos, logs e rastreamento, relacionados ao uso de sistemas corporativos, acessos, credenciais e registros de ações em sistemas internos.",
            "4. FINALIDADES E BASES LEGAIS DO TRATAMENTO",
            "4.1. O tratamento de dados pessoais pela Lyxus ocorre para finalidades legítimas, específicas e informadas ao titular, tais como:",
            "a) prospecção comercial, resposta a demandas e apresentação de propostas; b) análise de viabilidade de contratação, concessão de condições comerciais e gestão de risco; c) celebração, execução e gestão de contratos de prestação de serviços; d) faturamento, cobrança, contabilização e cumprimento de obrigações legais, fiscais e regulatórias; e) gestão de parcerias, fornecedores e prestadores; f) condução de processos seletivos e eventual contratação de candidatos; g) administração de quadro de colaboradores e sócios, inclusive com obrigações trabalhistas e societárias; h) segurança da informação, prevenção a fraudes, controle de acessos e auditoria de sistemas; i) melhoria contínua de sites, sistemas e serviços, inclusive por meio de análise de logs e dados de navegação; j) envio de comunicações relacionadas aos serviços, suporte e informações relevantes, e, quando houver base legal adequada, ações de marketing e relacionamento.",
            "4.2. As principais bases legais utilizadas pela Lyxus para o tratamento de dados pessoais incluem, conforme o caso:",
            "a) execução de contrato ou de procedimentos preliminares relacionados a contrato do qual o titular seja parte; b) cumprimento de obrigação legal ou regulatória; c) exercício regular de direitos em processo judicial, administrativo ou arbitral; d) legítimo interesse da Lyxus ou de terceiro, respeitados os direitos e liberdades fundamentais do titular e sempre que houver expectativa razoável de tratamento; e) consentimento do titular, quando exigido pela LGPD (especialmente para comunicações de marketing não relacionadas a contratos e determinadas análises de crédito).",
            "4.3. Caso a Lyxus venha a tratar dados sensíveis (como dados de saúde, convicção religiosa, opinião política, filiação a sindicato, dado biométrico utilizado para identificar o titular, entre outros), será exigido o cumprimento das condições específicas previstas na LGPD, com base legal adequada e medidas reforçadas de segurança. Sempre que possível, esse tipo de dado será evitado ou minimizado.",
            "5. COOKIES, DADOS TÉCNICOS E LOGS",
            "5.1. O site, sistemas e aplicações da Lyxus poderão utilizar cookies e tecnologias similares para:",
            "a) permitir o funcionamento adequado de funcionalidades essenciais (cookies estritamente necessários); b) lembrar preferências do usuário (cookies de funcionalidade); c) obter estatísticas agregadas de acesso e desempenho (cookies analíticos); d) eventualmente, apoiar estratégias de marketing digital (cookies de marketing), quando utilizados.",
            "5.2. Os dados técnicos e logs (como IP, identificadores de sessão, dados de localização aproximada, registros de ações em sistemas, timestamps e informações de dispositivo/navegador) são coletados principalmente para:",
            "a) garantir segurança da informação e integridade dos sistemas; b) prevenir e detectar fraudes e acessos indevidos; c) atender a requisitos de auditoria e conformidade; d) melhorar a experiência de uso e a performance das soluções.",
            "5.3. O titular poderá configurar seu navegador para recusar cookies não essenciais. Determinadas funcionalidades, contudo, podem depender de cookies estritamente necessários para funcionar corretamente.",
            "6. COMPARTILHAMENTO DE DADOS PESSOAIS",
            "6.1. A Lyxus poderá compartilhar dados pessoais com terceiros nas seguintes situações, entre outras:",
            "a) com provedores de serviços de tecnologia (hospedagem, e-mails, backup, serviços de nuvem, ferramentas de gestão, etc.); b) com plataformas de pagamento, bancos e instituições financeiras, para processar transações; c) com escritórios de contabilidade, advocacia e consultorias, quando necessário ao cumprimento de obrigações legais ou à defesa de direitos; d) com empresas parceiras e fornecedores envolvidos na execução de serviços contratados pelo titular ou pela empresa que representa; e) com bureaus de crédito ou órgãos de proteção ao crédito, quando necessário à análise de risco e concessão de limites, desde que respeitada a legislação aplicável; f) com autoridades públicas, reguladores ou órgãos de fiscalização, quando houver obrigação legal, regulatória ou ordem específica.",
            "6.2. Sempre que possível, o compartilhamento ocorrerá com dados minimizados e estritamente necessários à finalidade.",
            "6.3. A Lyxus não comercializa dados pessoais de titulares, isto é, não vende listas de dados nem cede dados para fins alheios às finalidades descritas nesta Política.",
            "7.RETENÇÃO, ELIMINAÇÃO E RESTRIÇÃO DE USO DE DADOS PESSOAIS",
            "7.1. A Lyxus manterá os dados pessoais apenas pelo tempo necessário para cumprir as finalidades informadas nesta Política, observando a natureza do tratamento, a categoria dos dados, a necessidade operacional e os fundamentos legais aplicáveis.",
            "7.2. Encerrada a finalidade do tratamento, os dados pessoais poderão ser conservados quando houver fundamento legal que autorize ou imponha sua retenção, inclusive para:",
            "a) cumprimento de obrigação legal ou regulatória;",
            "b) exercício regular de direitos em processo judicial, administrativo ou arbitral;",
            "c) prevenção à fraude, apuração de incidentes, auditoria e segurança;",
            "d) atendimento a determinações de autoridades competentes; e",
            "e) cumprimento de prazos de guarda previstos na legislação aplicável.",
            "7.2.1. Os prazos de retenção adotados pela Lyxus variarão conforme a natureza da relação jurídica, a categoria de dado pessoal e as exigências legais ou regulatórias incidentes, podendo abranger, conforme o caso, prazos prescricionais e decadenciais de natureza civil, contratual, consumerista, fiscal, contábil, trabalhista, previdenciária e probatória.",
            "7.2.2. Nos casos em que a Lyxus atuar como provedora de aplicações de internet, os registros de acesso a aplicações serão mantidos pelo prazo mínimo previsto na legislação específica aplicável, observado o Marco Civil da Internet e eventuais determinações judiciais ou requisições legalmente cabíveis.",
            "7.2.3. Sempre que possível, a Lyxus adotará medidas para reduzir o volume de dados mantidos, inclusive por meio de bloqueio, descaracterização, anonimização, agregação ou eliminação segura, conforme a natureza da informação e a viabilidade técnica e operacional, sem prejuízo das hipóteses legais de conservação.",
            "7.3. Quando a eliminação imediata não for possível ou admissível, a Lyxus restringirá o acesso aos dados conservados e limitará seu uso às finalidades que justificam sua retenção, especialmente para cumprimento de obrigação legal, regulatória, contratual ou para exercício regular de direitos.",
            "7.4. Uma vez cessados os fundamentos legais e operacionais que autorizam a conservação dos dados, a Lyxus promoverá sua eliminação, anonimização ou outra medida compatível com a legislação vigente e com suas rotinas internas de governança e segurança da informação.",
            "8. DIREITOS DOS TITULARES",
            "8.1. O titular de dados pessoais tem, nos termos da LGPD, os seguintes direitos, entre outros:",
            "a) confirmação da existência de tratamento; b) acesso aos dados pessoais tratados; c) correção de dados incompletos, inexatos ou desatualizados; d) anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei; e) portabilidade dos dados a outro fornecedor de serviço ou produto, mediante requisição expressa e observados segredos comerciais; f) eliminação de dados pessoais tratados com base no consentimento, exceto nas hipóteses de guarda autorizadas por lei; g) informação sobre compartilhamentos realizados com terceiros; h) informação sobre a possibilidade de não fornecer consentimento e sobre as consequências dessa negativa; i) revogação do consentimento quando esta for a base legal utilizada.",
            "8.2. O exercício de direitos poderá ser solicitado por meio dos canais de contato indicados ao final desta Política. Em determinadas situações, a Lyxus poderá solicitar comprovação de identidade para garantir segurança e evitar acesso indevido a dados.",
            "9. SEGURANÇA DA INFORMAÇÃO",
            "9.1. A Lyxus adota medidas técnicas e administrativas razoáveis para proteger os dados pessoais contra acessos não autorizados, perda, destruição ou alteração indevida, considerando o estado da técnica, o custo de implementação e a natureza das operações de tratamento.",
            "9.2. Tais medidas podem incluir, entre outras:",
            "a) controle de acessos e perfis de usuário em sistemas; b) registro de logs e monitoramento de atividades relevantes; c) uso de criptografia e outras técnicas de proteção em repouso e em trânsito, quando apropriado; d) políticas internas de segurança e treinamento de colaboradores; e) contratos com fornecedores prevendo obrigações de segurança e confidencialidade.",
            "9.3. Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos titulares, a Lyxus avaliará o evento e, quando aplicável, comunicará o titular e as autoridades competentes, conforme previsto na LGPD e em orientações da Autoridade Nacional de Proteção de Dados (ANPD).",
            "10. TRANSFERÊNCIAS INTERNACIONAIS",
            "10.1. É possível que alguns dados pessoais sejam armazenados ou processados em serviços de nuvem localizados fora do território brasileiro.",
            "10.2. Nessas hipóteses, a Lyxus buscará assegurar que tais serviços observem padrões de proteção de dados compatíveis com a legislação brasileira, inclusive por meio de cláusulas contratuais adequadas e avaliações de segurança.",
            "11. DADOS DE CRIANÇAS E ADOLESCENTES",
            "11.1. A Lyxus não tem como foco principal a coleta de dados de crianças e adolescentes. Caso seja necessário tratar dados de menores em algum contexto específico, serão observadas as regras da LGPD, com consentimento de pelo menos um dos pais ou responsável legal, sempre que exigido.",
            "12. ATUALIZAÇÃO DESTA POLÍTICA",
            "12.1. Esta Política poderá ser atualizada periodicamente para refletir mudanças nas práticas de tratamento de dados pessoais, nas soluções oferecidas ou na legislação aplicável.",
            "12.2. Sempre que houver alteração relevante, a nova versão será disponibilizada no site da Lyxus, com indicação da data de atualização.",
            "13. CANAL DE CONTATO E ENCARREGADO PELO TRATAMENTO (DPO)",
            "13.1. Para dúvidas, solicitações de direitos, reclamações ou comunicações relacionadas à proteção de dados pessoais, o titular poderá entrar em contato com a Lyxus por meio de:",
            "E-mail: legal@lyxus.com.br Endereço: INDISPONÍVEL",
            "13.2. A Lyxus designa como Encarregado pelo Tratamento de Dados Pessoais o Sr. Bruno Prates D’Oliveira, que atuará em nome da empresa como canal de comunicação com os titulares de dados pessoais e com a ANPD, nos termos da LGPD. 13.3. Contato do Encarregado: Nome: Bruno Prates D’Oliveira E-mail:legal@lyxus.com.br Endereço: INDISPONÍVEL",
            "14. DISPOSIÇÕES FINAIS",
            "14.1. Esta Política de Privacidade não substitui, mas complementa, outros documentos contratuais celebrados entre a Lyxus e seus clientes, parceiros, fornecedores, colaboradores e sócios.",
            "14.2. Em caso de divergência entre esta Política e contratos específicos, no que diz respeito ao tratamento de dados pessoais, prevalecerão as disposições que assegurem maior proteção ao titular, observado sempre o cumprimento da legislação aplicável."
        ]
    },

    outros:{
        titulo:"Outras Políticas",
        atualizado:"Agosto de 2026",
        paragrafos:[
            "Esta página reúne disposições complementares que não se encaixam diretamente nos Termos de Uso, Sigilo, Cookies ou Política de Privacidade.",
            "Em caso de dúvida sobre qualquer cláusula ou termo publicado aqui, entre em contato através da página de Suporte antes de utilizar os serviços da LYXUS."
        ]
    },

    reembolso:{
        titulo:"Política de Reembolso e Cancelamento",
        atualizado:"Agosto de 2026",
        paragrafos:[
            "1. OBJETO",
            "1.1. Esta Política estabelece as regras de reembolso e cancelamento aplicáveis à contratação de pacotes, planos, assinaturas e demais serviços oferecidos pela LYXUS, complementando os Termos de Uso e, quando houver, o contrato específico celebrado com o cliente.",
            "2. DIREITO DE ARREPENDIMENTO (CONTRATAÇÕES DIGITAIS)",
            "2.1. Nos termos do art. 49 do Código de Defesa do Consumidor, quando a contratação ocorrer fora do estabelecimento comercial (por exemplo, pelo site ou por canais digitais), o cliente pessoa física, na condição de consumidor, poderá desistir da contratação em até 7 (sete) dias corridos, contados da data da contratação ou do recebimento do serviço/produto, sem necessidade de justificativa.",
            "2.2. Exercido o arrependimento dentro do prazo legal e desde que não tenha havido início de execução do serviço, os valores eventualmente pagos serão integralmente restituídos, atualizados monetariamente, conforme os prazos e meios previstos nesta Política.",
            "2.3. Caso o serviço já tenha sido parcial ou integralmente iniciado a pedido expresso do cliente dentro do prazo de arrependimento, poderá ser descontado o valor proporcional correspondente à parte já executada, observada a boa-fé e a transparência na informação prestada ao cliente.",
            "3. CANCELAMENTO DE ASSINATURAS E SERVIÇOS RECORRENTES",
            "3.1. Assinaturas, planos e serviços de manutenção contratados em regime de cobrança recorrente (mensal, anual ou outra periodicidade) podem ser cancelados a qualquer momento pelo cliente, mediante solicitação pelos canais de suporte oficiais da LYXUS.",
            "3.2. O cancelamento produz efeitos a partir do fim do ciclo de cobrança vigente, salvo disposição diversa prevista em contrato específico, não gerando reembolso automático de valores referentes a período já iniciado, exceto nas hipóteses legais de arrependimento (item 2) ou de falha comprovada e não sanada na prestação do serviço.",
            "3.3. Não há multa ou fidelidade mínima para o cancelamento de assinaturas, salvo quando expressamente pactuado em contrato ou proposta comercial específica, hipótese em que prevalecerão as condições ali estabelecidas.",
            "3.4. Serviços contratados sob demanda, projetos personalizados, desenvolvimentos sob medida ou entregas com escopo fechado seguem as regras de cancelamento e reembolso definidas na proposta ou contrato específico, prevalecendo estas sobre a presente Política no que forem conflitantes.",
            "4. HIPÓTESES QUE NÃO GERAM REEMBOLSO",
            "4.1. Não haverá reembolso, ainda que solicitado o cancelamento, nas seguintes hipóteses, sem prejuízo de outras previstas em contrato específico: a) serviços integralmente prestados ou entregues; b) desenvolvimentos personalizados já iniciados fora do prazo de arrependimento, observado o item 2.3; c) domínios, licenças de terceiros, certificados ou serviços de terceiros já adquiridos e repassados ao cliente; d) descumprimento contratual pelo próprio cliente que tenha motivado a suspensão ou o encerramento do serviço.",
            "5. FORMA E PRAZO DE RESTITUIÇÃO",
            "5.1. Quando devido, o reembolso será realizado preferencialmente pelo mesmo meio de pagamento utilizado na contratação (Pix, cartão ou outro), podendo variar o prazo de efetivação conforme a instituição financeira ou o meio de pagamento envolvido.",
            "5.2. A LYXUS processará a solicitação de reembolso em prazo razoável, buscando concluir a restituição em até 30 (trinta) dias corridos, contados da confirmação da solicitação, salvo prazo diverso informado ao cliente em razão de particularidades do meio de pagamento.",
            "6. COMO SOLICITAR",
            "6.1. Solicitações de cancelamento ou reembolso devem ser feitas pelos canais oficiais de suporte da LYXUS, informando os dados da contratação (pacote, data e forma de pagamento), para agilizar a análise e o atendimento.",
            "Canal de suporte: whatsapp +55 53 99183-8611 · E-mail: Contato@lyxus.com.br",
            "7. DISPOSIÇÕES FINAIS",
            "7.1. Esta Política poderá ser atualizada a qualquer tempo, aplicando-se a versão vigente na data da contratação, sem prejuízo de direitos já adquiridos pelo cliente.",
            "7.2. Aplicam-se, no que couber, as disposições dos Termos de Uso e da legislação consumerista e civil vigente."
        ]
    },

    assinatura:{
        titulo:"Termos de Assinatura e Manutenção",
        atualizado:"Agosto de 2026",
        paragrafos:[
            "1. OBJETO",
            "1.1. Estes Termos regulam a contratação de pacotes, planos e serviços de assinatura recorrente e/ou manutenção continuada oferecidos pela LYXUS, incluindo, conforme o caso, hospedagem, suporte técnico, manutenção evolutiva e corretiva de sites, sistemas e aplicações.",
            "2. VIGÊNCIA E RENOVAÇÃO AUTOMÁTICA",
            "2.1. As assinaturas têm vigência determinada pela periodicidade contratada (mensal, anual ou outra) e são renovadas automaticamente ao final de cada ciclo, salvo cancelamento solicitado pelo cliente antes do vencimento, conforme a Política de Reembolso e Cancelamento.",
            "2.2. A renovação automática implica nova cobrança do valor vigente na data da renovação, ressalvado reajuste comunicado previamente nos termos do item 3.",
            "3. VALORES E REAJUSTE",
            "3.1. Os valores da assinatura são os informados no momento da contratação, no painel do cliente ou em proposta específica.",
            "3.2. Nos serviços de prestação continuada, os valores poderão ser reajustados a cada 12 (doze) meses, contados da contratação ou do último reajuste, com base na variação acumulada do IPCA/IBGE ou índice oficial que venha a substituí-lo, conforme também previsto nos Termos de Uso.",
            "3.3. Eventual reajuste será comunicado ao cliente com antecedência razoável, pelos canais de contato informados no cadastro.",
            "4. ESCOPO DA MANUTENÇÃO",
            "4.1. Quando o plano contratado incluir manutenção, esta compreende, salvo disposição diversa em proposta específica: a) correção de falhas (bugs) na solução entregue pela LYXUS; b) atualizações de segurança e compatibilidade; c) pequenos ajustes de conteúdo e configuração dentro do escopo original do projeto.",
            "4.2. Não integram o escopo padrão de manutenção, salvo contratação adicional: a) desenvolvimento de novas funcionalidades não previstas no escopo original; b) redesenhos completos ou mudanças estruturais relevantes; c) integração com sistemas de terceiros não previstos originalmente; d) falhas decorrentes de alterações feitas por terceiros não autorizados pela LYXUS.",
            "4.3. Solicitações fora do escopo padrão poderão ser orçadas à parte, mediante proposta específica, sem prejuízo da continuidade da assinatura vigente.",
            "5. PRAZOS DE ATENDIMENTO",
            "5.1. A LYXUS envidará esforços razoáveis para responder solicitações de suporte em prazo compatível com a natureza do plano contratado, priorizando falhas críticas que afetem o funcionamento essencial do serviço.",
            "5.2. Prazos específicos de atendimento (SLA), quando aplicáveis, constarão da proposta comercial ou contrato específico celebrado com o cliente.",
            "6. INADIMPLÊNCIA E SUSPENSÃO",
            "6.1. O não pagamento da assinatura na data de vencimento sujeita o cliente às consequências previstas no item 10.3 dos Termos de Uso, incluindo encargos moratórios, notificação de cobrança e possível suspensão dos serviços após prazo razoável de regularização.",
            "6.2. A suspensão por inadimplência não desobriga o cliente do pagamento dos valores vencidos, podendo a LYXUS retomar a prestação do serviço mediante a devida regularização financeira.",
            "7. CANCELAMENTO",
            "7.1. O cliente poderá cancelar a assinatura a qualquer tempo, observadas as regras e efeitos previstos na Política de Reembolso e Cancelamento da LYXUS.",
            "7.2. Encerrada a assinatura, a LYXUS poderá manter cópia de segurança dos dados e materiais do cliente por prazo razoável, conforme a Política de Privacidade, findo o qual poderão ser eliminados, salvo obrigação legal de retenção.",
            "8. DISPOSIÇÕES FINAIS",
            "8.1. Aplicam-se, no que couber e não conflitarem, os Termos de Uso, a Política de Reembolso e Cancelamento e a Política de Privacidade da LYXUS.",
            "8.2. Em caso de conflito entre estes Termos e contrato específico celebrado entre as partes, prevalecerá o contrato específico naquilo que regular de forma particular."
        ]
    },

    dpa:{
        titulo:"DPA — Acordo Padrão de Tratamento de Dados",
        atualizado:"Agosto de 2026",
        paragrafos:[
            "1. OBJETO E PARTES",
            "1.1. Este documento (\"DPA\" — Data Processing Agreement) estabelece as condições padrão sob as quais a LYXUS realiza o tratamento de dados pessoais em nome de clientes, quando atua como Operadora, nos termos da Lei nº 13.709/2018 (LGPD), em relação a dados pessoais cujo Controlador seja o cliente contratante.",
            "1.2. Este DPA aplica-se de forma complementar ao contrato principal de prestação de serviços firmado entre a LYXUS e o cliente, prevalecendo, em caso de conflito específico sobre proteção de dados, o quanto aqui disposto.",
            "2. DEFINIÇÕES",
            "2.1. Para os fins deste DPA, aplicam-se as definições da LGPD, especialmente: \"dado pessoal\", \"titular\", \"controlador\", \"operador\", \"tratamento\" e \"incidente de segurança\".",
            "3. OBJETO, NATUREZA E FINALIDADE DO TRATAMENTO",
            "3.1. A LYXUS tratará dados pessoais estritamente na medida necessária para a execução dos serviços contratados pelo cliente (Controlador), conforme instruções documentadas deste, salvo quando outra forma de tratamento for exigida por lei ou determinação de autoridade competente.",
            "3.2. Os tipos de dados pessoais tratados, as categorias de titulares e a duração do tratamento correspondem àqueles necessários à prestação do serviço contratado, conforme especificado no contrato principal, proposta ou anexo técnico aplicável.",
            "4. OBRIGAÇÕES DA LYXUS COMO OPERADORA",
            "4.1. A LYXUS compromete-se a: a) tratar os dados pessoais apenas conforme as instruções documentadas do Controlador; b) garantir que as pessoas autorizadas a tratar os dados estejam sujeitas a obrigação de confidencialidade; c) adotar medidas técnicas e administrativas de segurança compatíveis com a natureza dos dados tratados; d) auxiliar o Controlador, dentro de limites razoáveis, no atendimento a solicitações de titulares de dados e a demandas de autoridades competentes; e) notificar o Controlador em prazo razoável sobre incidentes de segurança que possam acarretar risco relevante aos titulares.",
            "4.2. A LYXUS não utilizará os dados pessoais tratados em nome do Controlador para finalidade diversa da contratada, nem os comercializará ou compartilhará com terceiros não autorizados, ressalvadas as hipóteses legais e as suboperadoras necessárias à prestação do serviço.",
            "5. SUBOPERADORES",
            "5.1. A LYXUS poderá utilizar suboperadores (como provedores de nuvem, hospedagem, e-mail transacional e gateways de pagamento) para viabilizar a prestação dos serviços, respondendo perante o Controlador pela atuação desses terceiros na medida de sua responsabilidade legal e contratual.",
            "5.2. A LYXUS buscará contratar suboperadores que adotem padrões de segurança e confidencialidade compatíveis com a legislação aplicável.",
            "6. SEGURANÇA DA INFORMAÇÃO",
            "6.1. A LYXUS adota medidas técnicas e organizacionais razoáveis para proteger os dados pessoais tratados contra acessos não autorizados, perda, alteração, destruição ou divulgação indevida, observado o estado da técnica e a natureza dos dados envolvidos.",
            "7. INCIDENTES DE SEGURANÇA",
            "7.1. Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos titulares de dados tratados em nome do Controlador, a LYXUS comunicará o Controlador em prazo razoável, fornecendo as informações disponíveis para que este avalie a necessidade de comunicação à Autoridade Nacional de Proteção de Dados (ANPD) e aos titulares, conforme a LGPD.",
            "8. DIREITOS DOS TITULARES",
            "8.1. Caso a LYXUS receba diretamente solicitação de titular de dados relativa a tratamento realizado em nome do Controlador, encaminhará a solicitação ao Controlador em prazo razoável, prestando o auxílio necessário dentro de suas possibilidades técnicas e operacionais.",
            "9. TÉRMINO DO TRATAMENTO",
            "9.1. Encerrado o contrato principal, a LYXUS eliminará ou devolverá ao Controlador, conforme instrução deste e a viabilidade técnica, os dados pessoais tratados em seu nome, ressalvada a retenção exigida por obrigação legal, regulatória ou para exercício regular de direitos em processos administrativos ou judiciais.",
            "10. ENCARREGADO E CONTATO",
            "10.1. Dúvidas ou solicitações relacionadas a este DPA podem ser dirigidas ao Encarregado pelo Tratamento de Dados Pessoais da LYXUS.",
            "Encarregado: Bruno Prates D’Oliveira · E-mail: legal@lyxus.com.br",
            "11. DISPOSIÇÕES FINAIS",
            "11.1. Este DPA é regido pelas leis brasileiras, em especial a LGPD, aplicando-se subsidiariamente os Termos de Uso e a Política de Privacidade da LYXUS.",
            "11.2. A nulidade eventual de alguma cláusula não afeta a validade das demais, que permanecerão em vigor na maior extensão permitida pela legislação aplicável."
        ]
    }

};

const institucionalController = {

    sobre(req, res){

        res.render("institucional/sobre");

    },

    equipe(req, res){

        res.render("institucional/equipe");

    },

    beneficios(req, res){

        res.render("institucional/beneficios");

    },

    // ===========================
    // Assinaturas (pacotes que o cliente já assina + pacotes
    // disponíveis pra assinar). "Assinatura" aqui é simplesmente
    // um Pagamento aprovado ligado a um Pacote — não existe um
    // model separado pra isso.
    // ===========================

    async assinaturas(req, res){

        try{

            const pacotesDisponiveis = await Pacote.find({ ativo:true })
                .sort({ preco:1 });

            let minhasAssinaturas = [];

            if(req.session.usuario){

                const pagamentos = await Pagamento.find({
                    usuario: req.session.usuario.id,
                    status:"aprovado"
                })
                    .populate("pacote")
                    .sort({ createdAt:-1 });

                // Um cliente pode ter mais de um pagamento aprovado pro
                // mesmo pacote (renovação); aqui só mostramos cada
                // pacote uma vez, com a data da assinatura mais recente.
                const vistos = new Set();

                pagamentos.forEach(pagamento => {

                    if(!pagamento.pacote) return;

                    const id = String(pagamento.pacote._id);

                    if(vistos.has(id)) return;

                    vistos.add(id);

                    minhasAssinaturas.push({
                        pacote: pagamento.pacote,
                        desde: pagamento.createdAt
                    });

                });

            }

            res.render("institucional/assinaturas", {
                pacotesDisponiveis,
                minhasAssinaturas
            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    faq(req, res){

        res.render("institucional/faq");

    },

    // ===========================
    // Termos (uso / sigilo / cookies / lgpd / outros)
    // ===========================

    termosTela(req, res){

        const conteudo = termos[req.params.tipo];

        if(!conteudo){

            return res.status(404).render("erro/404");

        }

        res.render("institucional/termos",{

            conteudo,
            tipoAtual: req.params.tipo

        });

    },

    // ===========================
    // Páginas com formulário de interesse
    // ===========================

    trabalheConoscoTela(req, res){

        res.render("institucional/trabalhe-conosco",{ enviado:false, erro:null });

    },

    apoiadorTela(req, res){

        res.render("institucional/apoiador",{ enviado:false, erro:null });

    },

    parceirosTela(req, res){

        res.render("institucional/parceiros",{ enviado:false, erro:null });

    },

    suporteTela(req, res){

        res.render("institucional/suporte",{ enviado:false, erro:null });

    },

    // ===========================
    // Envio genérico dos formulários acima
    // ===========================

    async enviarContato(req, res){

        const tipo = req.body.tipo;

        const tiposValidos = ["apoiador","parceiro","trabalhe-conosco","suporte"];

        if(!tiposValidos.includes(tipo)){

            return res.status(400).render("erro/500",{
                mensagem:"Formulário inválido."
            });

        }

        const view = `institucional/${tipo === "parceiro" ? "parceiros" : tipo}`;

        try{

            const { nome, email, telefone, mensagem, ...resto } = req.body;

            delete resto.tipo;

            if(!nome || !email){

                return res.render(view,{
                    enviado:false,
                    erro:"Preencha ao menos nome e e-mail."
                });

            }

            await Contato.create({
                tipo,
                nome,
                email,
                telefone,
                mensagem,
                detalhes:resto
            });

            res.render(view,{ enviado:true, erro:null });

        }catch(err){

            console.error(err);

            res.render(view,{
                enviado:false,
                erro:"Não foi possível enviar agora. Tente novamente em instantes."
            });

        }

    }

};

export default institucionalController;
