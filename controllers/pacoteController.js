import Pacote from "../models/Pacote.js";
import Pagamento from "../models/Pagamento.js";
import { gerarPixCopiaCola } from "../utils/pix.js";
import imagemParaBase64 from "../utils/imagemBase64.js";

const pacoteController = {

    // ===========================
    // LISTAR
    // ===========================

    async listar(req,res){

        try{

            const pacotes = await Pacote.find()
                .sort({createdAt:-1});

            res.render("dashboard/pacotes/lista",{

                pacotes

            });

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // FORM NOVO PACOTE
    // ===========================

    novo(req,res){

        res.render("dashboard/pacotes/novo");

    },

    // ===========================
    // SALVAR
    // ===========================

    async salvar(req,res){

        try{

            let{

                nome,

                descricao,

                preco,

                beneficios,

                destaque,

                ativo

            }=req.body;

            if(typeof beneficios==="string"){

                beneficios=beneficios
                    .split("\n")
                    .map(item=>item.trim())
                    .filter(item=>item!="");

            }

            await Pacote.create({

                nome,

                descricao,

                preco,

                beneficios,

                destaque:destaque==="true",

                ativo:ativo==="true",

                imagem:req.file ? imagemParaBase64(req.file) : ""

            });

            res.redirect("/dashboard/pacotes");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // FORM EDITAR
    // ===========================

    async editar(req,res){

        try{

            const pacote=await Pacote.findById(req.params.id);

            if(!pacote){

                return res.redirect("/dashboard/pacotes");

            }

            res.render("dashboard/pacotes/editar",{

                pacote

            });

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // ATUALIZAR
    // ===========================

    async atualizar(req,res){

        try{

            let{

                nome,

                descricao,

                preco,

                beneficios,

                destaque,

                ativo

            }=req.body;

            if(typeof beneficios==="string"){

                beneficios=beneficios
                    .split("\n")
                    .map(item=>item.trim())
                    .filter(item=>item!="");

            }

            const dados={

                nome,

                descricao,

                preco,

                beneficios,

                destaque:destaque==="true",

                ativo:ativo==="true"

            };

            if(req.file){

                dados.imagem=imagemParaBase64(req.file);

            }

            await Pacote.findByIdAndUpdate(

                req.params.id,

                dados

            );

            res.redirect("/dashboard/pacotes");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // EXCLUIR
    // ===========================

    async excluir(req,res){

        try{

            await Pacote.findByIdAndDelete(

                req.params.id

            );

            res.redirect("/dashboard/pacotes");

        }catch(err){

            console.error(err);

            res.status(500).render("erro/500");

        }

    },

    async publico(req,res){

    try{

        const pacotes = await Pacote.find({

            ativo:true

        }).sort({

            preco:1

        });

        res.render("pacotes/lista",{

            pacotes

        });

    }catch(err){

        console.error(err);

        res.status(500).render("erro/500");

    }

},

    // ===========================
    // DETALHES DE UM PACOTE
    // ===========================

    async detalhe(req, res){

        try{

            const pacote = await Pacote.findOne({
                _id: req.params.id,
                ativo:true
            });

            if(!pacote){

                return res.status(404).render("erro/404");

            }

            const outros = await Pacote.find({
                ativo:true,
                _id:{ $ne: pacote._id }
            }).limit(3);

            res.render("pacotes/detalhes",{

                pacote,
                outros

            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/404");

        }

    },

    // ===========================
    // TELA DE CHECKOUT
    // ===========================

    async checkoutForm(req, res){

        try{

            const pacote = await Pacote.findOne({
                _id: req.params.id,
                ativo:true
            });

            if(!pacote){

                return res.status(404).render("erro/404");

            }

            res.render("pacotes/checkout",{

                pacote,
                erro:null

            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    },

    // ===========================
    // FINALIZAR CHECKOUT (gera solicitação/pagamento pendente)
    // ===========================

    async finalizarCheckout(req, res){

        try{

            const pacote = await Pacote.findById(req.params.id);

            if(!pacote){

                return res.status(404).render("erro/404");

            }

            const { metodo } = req.body;

            const pagamento = await Pagamento.create({

                usuario: req.session.usuario ? req.session.usuario.id : null,
                pacote: pacote._id,
                valor: pacote.preco,
                metodo,
                status:"pendente"

            });

            // Quando o método é Pix e existe uma chave configurada,
            // geramos um código de pagamento real (o cliente paga de
            // verdade). A confirmação/aprovação continua manual, feita
            // pelo admin no painel ao ver o dinheiro cair na conta.
            let pix = null;

            if(metodo === "pix"){

                // middleware/locals.js já buscou (com cache) a
                // Configuracao pra essa mesma requisição.
                const configuracao = res.locals.config;

                if(configuracao && configuracao.pixChave){

                    try{

                        const copiaCola = gerarPixCopiaCola({
                            chave: configuracao.pixChave,
                            nomeRecebedor: configuracao.pixNomeRecebedor,
                            cidade: configuracao.pixCidade,
                            valor: pacote.preco,
                            identificador: String(pagamento._id).slice(-10),
                            descricao: pacote.nome
                        });

                        pix = { copiaCola };

                    }catch(erroPix){

                        console.error("Erro ao gerar Pix:", erroPix.message);

                    }

                }

            }

            res.render("pacotes/checkout",{

                pacote,
                sucesso:true,
                metodo,
                pix

            });

        }catch(err){

            console.error(err);
            res.status(500).render("erro/500");

        }

    }

};

export default pacoteController;