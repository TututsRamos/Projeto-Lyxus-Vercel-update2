import mongoose from "mongoose";

export async function conectarBanco() {

    try {

        // maxPoolSize baixo é o recomendado pro MongoDB em ambiente
        // serverless (Vercel): cada container/cold start já abre sua
        // própria conexão, então um pool grande só desperdiça conexões
        // no Atlas sem ganhar nada em velocidade.
        await mongoose.connect(process.env.MONGO_URI, {

            maxPoolSize: 5

        });

        console.log("✅ MongoDB conectado.");

    } catch (err) {

        console.error("ERRO MONGOOSE");
        console.error(err);

        process.exit(1);

    }

}