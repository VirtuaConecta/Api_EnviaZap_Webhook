const config = require('./config');
const axios = require('axios');

class MessageFailed {
  static async sendMessageToApiFailed(obj,msg) {
    try {
        const fone_zap =`+${obj.me.id.user.replace(/[^0-9]/g, "")}`;
        const fone_zap1 =obj.me.id.user;
        //const tel = obj.to.split("@");
        const tel1 =`+${obj.to.replace(/[^0-9]/g, "")}`;

        const tel2 = obj.to; 

        const id =`${obj.me.timestamp}_${obj.me.id.user}`;
        const dataAtual = new Date();
        const numeroAleatorioNaoRepetido = MessageFailed.gerarNumeroAleatorio();
        // Formate a data atual como "yyyy-MM-ddTHH:mm:ss.000Z"
        const dataFormatada = dataAtual.toISOString();
        // Obtenha o timestamp em segundos
        const timestamp = Math.floor(dataAtual.getTime() / 1000);
       const messageData = [
        {"event":"message:out:failed",
       "date":dataFormatada,
       "message":"Message delivery failed",
       "entity":"message",
       "entityId":obj.me.id._serialized,
       "entityUrl":"",
       "user":obj.me.id.user,
       "data":{
            "id":id,
       "waId":numeroAleatorioNaoRepetido,
       "phone":tel1,
       "wid":tel2,
       "status":"failed",
       "deliveryStatus":"failed",
       "createdAt":dataFormatada,
       "failedAt":dataFormatada,
       "deliverAt":dataFormatada,
       "processedAt":dataFormatada,
       "failureReason":obj.text,
       "message":msg,
       "quote":"",
       "priority":"normal",
       "retentionPolicy":"plan_defaults",
       "retry":{
           "max":100,
           "count":obj.me.hostRetryCount,
           "lastRetryAt":dataFormatada
       },
       "webhookStatus":"pending",
       "device":"00000000000000"
               }
           }
       ]
    
       const url = `${config.api_url}/api/MessageFailed`;
       console.log("Body failed=>",messageData);
      const response = await axios.post(url, messageData);
      return response.data; // Você pode retornar os dados da resposta, se necessário
    } catch (error) {
      throw error; // Ou lidar com o erro aqui, conforme necessário
    }
  }
 
  static gerarNumeroAleatorio() {
    const caracteres = '0123456789ABCDEF';
    let numeroAleatorio = '';

    for (let i = 0; i < 20; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      numeroAleatorio += caracteres.charAt(indiceAleatorio);
    }

    return numeroAleatorio;
  }
  
}

module.exports = MessageFailed;