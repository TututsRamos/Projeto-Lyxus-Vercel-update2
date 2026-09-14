import multer from "multer";

// A Vercel roda o projeto como função serverless: o sistema de
// arquivos é somente leitura (fora de /tmp, que também não
// persiste entre chamadas). Usar diskStorage gravando em
// "public/uploads" funciona em ambiente local, mas quebra em
// produção com erro 500 assim que alguém tenta subir uma foto/
// imagem (era o caso do cadastro de usuário).
//
// Por isso o multer aqui guarda o arquivo em memória
// (req.file.buffer) — quem consome o upload (controllers)
// converte pra base64 e salva direto no Mongo, através de
// utils/imagemBase64.js. Assim funciona igual local e na Vercel,
// sem depender de nenhuma pasta gravável.
const fileFilter = (req,file,cb)=>{

    const permitidos = [

        "image/jpeg",

        "image/png",

        "image/webp"

    ];

    if(permitidos.includes(file.mimetype)){

        cb(null,true);

    }else{

        cb(new Error("Arquivo inválido"));

    }

};

export default multer({

    storage: multer.memoryStorage(),

    fileFilter,

    limits:{

        fileSize:5*1024*1024

    }

});

// Upload específico pras evidências da Área de pesquisa e
// avaliação Lyxus (ver models/AvaliacaoEvidencia.js): além das
// imagens de sempre, aceita PDF (relatórios exportados de
// ferramentas como PageSpeed Insights, por exemplo). Mesmo
// storage em memória — mesmo motivo do comentário acima.
const fileFilterEvidencia = (req,file,cb)=>{

    const permitidos = [

        "image/jpeg",

        "image/png",

        "image/webp",

        "application/pdf"

    ];

    if(permitidos.includes(file.mimetype)){

        cb(null,true);

    }else{

        cb(new Error("Arquivo inválido"));

    }

};

export const uploadEvidencia = multer({

    storage: multer.memoryStorage(),

    fileFilter: fileFilterEvidencia,

    limits:{

        fileSize:8*1024*1024

    }

});
