// Script de execução única. Roda fora do app.js e serve só
// pra forçar a troca de senha das contas padrão de equipe
// (staff, marketing, suporte) que JÁ EXISTEM no banco — o
// utils/seedEquipePadrao.js só cria a conta se ela ainda não
// existir, então quem já tinha rodado o projeto antes precisa
// deste script pra atualizar a senha das contas atuais.
//
// Uso (a partir da raiz do projeto):
//   node scripts/atualizarSenhaEquipe.js
//
// Depois de rodar uma vez, pode apagar este arquivo.

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Usuario from "../models/Usuario.js";
import hashSenha from "../utils/hashSenha.js";

const NOVA_SENHA = "LyXuS0826";

const EMAILS_EQUIPE = [
    "staff@lyxus.com.br",
    "marketing@lyxus.com.br",
    "suporte@lyxus.com.br"
];

async function main(){

    await mongoose.connect(process.env.MONGO_URI);

    const senhaCriptografada = await hashSenha(NOVA_SENHA);

    for(const email of EMAILS_EQUIPE){

        const usuario = await Usuario.findOne({ email });

        if(!usuario){
            console.log(`⚠️  Conta não encontrada: ${email} (nada a atualizar)`);
            continue;
        }

        usuario.senha = senhaCriptografada;
        await usuario.save();

        console.log(`✅ Senha atualizada: ${email}`);

    }

    await mongoose.disconnect();

    console.log("Concluído.");

}

main().catch(err => {
    console.error("Erro ao atualizar senhas da equipe:", err);
    process.exit(1);
});
