export default function formatarData(data){

    if(!data){

        return "";

    }

    return new Date(data).toLocaleDateString("pt-BR",{

        day:"2-digit",
        month:"2-digit",
        year:"numeric"

    });

}