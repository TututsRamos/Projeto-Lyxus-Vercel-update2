import Log from "../models/Log.js";

export default async function registrarLog(tipo, autorId, descricao, dados = {}){

    try{

        await Log.create({
            tipo,
            autor: autorId || null,
            descricao,
            dados
        });

    }catch(err){

        // Log nunca deve derrubar a operação principal
        console.error("Erro ao registrar log:", err.message);

    }

}
