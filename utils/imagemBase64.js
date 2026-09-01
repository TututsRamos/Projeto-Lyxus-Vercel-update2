// Converte um arquivo recebido pelo multer (memoryStorage, ver
// middleware/upload.js) numa Data URI base64 — pronta pra ser
// salva direto num campo String do Mongo e usada como "src" de
// <img> sem depender de nenhuma pasta/disco gravável.
//
// É a peça que resolve o erro 500 ao subir foto/imagem em
// produção (Vercel): lá o projeto roda como função serverless e
// não tem como escrever arquivo em "public/uploads" de forma
// persistente.
export default function imagemParaBase64(file){

    if(!file || !file.buffer) return null;

    return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

}
