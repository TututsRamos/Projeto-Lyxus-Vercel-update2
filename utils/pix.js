// Gerador de "Pix copia e cola" (padrão BR Code / EMV QRCPS-MPM do Bacen).
// Não depende de nenhum gateway/API externa: com uma chave Pix válida
// (CPF, CNPJ, e-mail, telefone ou chave aleatória) já é possível gerar
// um código de cobrança real, que qualquer banco lê para preencher o
// pagamento automaticamente. A confirmação de recebimento continua
// manual (o admin marca como aprovado no painel).

function removerAcentos(texto = ""){

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}

// Monta um campo no formato TLV (ID + Length + Value) exigido pelo padrão EMV
function campo(id, valor){

    const tamanho = String(valor.length).padStart(2, "0");

    return `${id}${tamanho}${valor}`;

}

// CRC16/CCITT-FALSE — checksum obrigatório no final do payload Pix
function crc16(payload){

    let crc = 0xFFFF;

    for(let i = 0; i < payload.length; i++){

        crc ^= payload.charCodeAt(i) << 8;

        for(let j = 0; j < 8; j++){

            if((crc & 0x8000) !== 0){

                crc = ((crc << 1) ^ 0x1021) & 0xFFFF;

            }else{

                crc = (crc << 1) & 0xFFFF;

            }

        }

    }

    return crc.toString(16).toUpperCase().padStart(4, "0");

}

/**
 * Gera o payload Pix "copia e cola".
 *
 * @param {Object} dados
 * @param {String} dados.chave           Chave Pix do recebedor (obrigatório)
 * @param {String} dados.nomeRecebedor   Nome do titular da chave (máx. 25 caracteres)
 * @param {String} dados.cidade          Cidade do titular (máx. 15 caracteres)
 * @param {Number} dados.valor           Valor da cobrança em reais (ex: 199.9)
 * @param {String} [dados.identificador] Identificador da cobrança (txid), sem espaços/acentos
 * @param {String} [dados.descricao]     Descrição curta opcional da cobrança
 */
export function gerarPixCopiaCola({ chave, nomeRecebedor, cidade, valor, identificador, descricao }){

    if(!chave){

        throw new Error("Chave Pix não configurada");

    }

    const nome = removerAcentos(nomeRecebedor || "LIXUS HOLDING")
        .toUpperCase()
        .slice(0, 25);

    const cidadeFormatada = removerAcentos(cidade || "SAO PAULO")
        .toUpperCase()
        .slice(0, 15);

    const txid = (identificador || "LIXUS")
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 25) || "***";

    const valorFormatado = Number(valor || 0).toFixed(2);

    // Merchant Account Information (chave Pix)
    let merchantAccount = campo("00", "br.gov.bcb.pix");

    merchantAccount += campo("01", chave);

    if(descricao){

        merchantAccount += campo("02", removerAcentos(descricao).slice(0, 40));

    }

    let payload = "";

    payload += campo("00", "01");                     // Payload Format Indicator
    payload += campo("01", "11");                      // Point of Initiation (11 = estático)
    payload += campo("26", merchantAccount);            // Merchant Account Info (Pix)
    payload += campo("52", "0000");                     // Merchant Category Code
    payload += campo("53", "986");                      // Moeda (BRL)
    payload += campo("54", valorFormatado);              // Valor da cobrança
    payload += campo("58", "BR");                        // País
    payload += campo("59", nome);                         // Nome do recebedor
    payload += campo("60", cidadeFormatada);               // Cidade do recebedor
    payload += campo("62", campo("05", txid));               // Additional Data (txid)

    // O CRC16 é calculado já incluindo o próprio identificador "6304" no final
    payload += "6304";

    const checksum = crc16(payload);

    return payload + checksum;

}
