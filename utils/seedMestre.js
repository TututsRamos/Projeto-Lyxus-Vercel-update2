import Usuario from "../models/Usuario.js";
import hashSenha from "./hashSenha.js";

// Cria o usuário mestre uma única vez, na primeira vez que o
// servidor sobe com o banco vazio. Ele é o único usuário que
// pode criar administradores.
//
// As credenciais do mestre NÃO ficam em comentário nem
// hardcoded aqui: vêm de MASTER_LOGIN e MASTER_SENHA no .env
// (arquivo que já está no .gitignore, então nunca vai pro
// repositório). Depois desse primeiro cadastro, só o hash fica
// salvo no banco — a senha em texto puro só existe no .env.
//
// IMPORTANTE: como esse "login" não é um e-mail de verdade,
// guardamos ele tanto em "nome" quanto em "email" pra já
// funcionar com o sistema de login atual (que autentica por
// e-mail). Isso é um ajuste temporário — quando mexermos nas
// rotas de login (próximas fases), vale considerar um campo
// de login separado do e-mail.

export async function criarUsuarioMestre(){

    try{

        const existente = await Usuario.findOne({ tipo:"master" });

        if(existente){

            // Segurança: o mestre nunca pode ficar trancado fora
            // do próprio sistema. Se por acaso alguém desativou
            // essa conta (de propósito ou sem querer), reativa
            // automaticamente aqui.
            if(!existente.ativo){

                existente.ativo = true;
                await existente.save();

                console.log("⚠️ Usuário mestre estava desativado — reativado automaticamente.");

            }

            return;
        }

        const login = process.env.MASTER_LOGIN;
        const senha = process.env.MASTER_SENHA;

        if(!login || !senha){

            console.error("❌ MASTER_LOGIN e/ou MASTER_SENHA não definidos no .env — usuário mestre não foi criado.");
            return;

        }

        const senhaCriptografada = await hashSenha(senha);

        await Usuario.create({
            nome:login,
            nomeCompleto:"Usuário Mestre",
            email:login,
            senha:senhaCriptografada,
            tipo:"master",
            nivelPermissao:999,
            ativo:true
        });

        console.log("✅ Usuário mestre criado a partir das credenciais do .env");

    }catch(err){

        console.error("Erro ao criar usuário mestre:", err.message);

    }

}
