import bcrypt from "bcrypt";

export default async function hashSenha(senha){

    return await bcrypt.hash(senha,10);

}