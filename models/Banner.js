import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({

    titulo:{
        type:String,
        required:true
    },

    subtitulo:{
        type:String,
        default:""
    },

    imagem:{
        type:String,
        required:true
    },

    link:{
        type:String,
        default:""
    },

    ordem:{
        type:Number,
        default:0
    },

    ativo:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

export default mongoose.model("Banner", bannerSchema);
