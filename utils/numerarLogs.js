// Recebe o array "logs" de um Contrato (na ordem em que foram
// criados) e devolve uma cópia com o campo "numero" calculado
// (1, 2, 3... na ordem de criação). Como a exclusão de log agora
// é definitiva (ver controllers/contratoController.js), não há
// mais numeração negativa — os logs restantes sempre fecham a
// sequência automaticamente.
export default function numerarLogs(logs){

    return (logs || []).map((log, i) => {

        const obj = typeof log.toObject === "function" ? log.toObject() : log;

        return { ...obj, numero: i + 1 };

    });

}
