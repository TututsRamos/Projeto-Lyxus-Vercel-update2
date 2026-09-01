import Configuracao from "../models/Configuracao.js";

export default async function(req,res,next){

    let configuracao = await Configuracao.findOne();

    if(!configuracao){

        await Configuracao.create({

            empresa:"principal"

        });

    }

    next();

}