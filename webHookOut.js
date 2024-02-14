const config = require('./config');
const axios = require('axios');

class MessageSender {
  static async sendMessageToApi(obj) {
    try {
        const fone_zap =`+${obj.me.id.user}`;
        const fone_zap1 =obj.me.id._serialized;
        const tel1 = `+${obj.to.remote.user}`
        const tel2 =`${obj.to.remote._serialized}`; 
        const dataAtual = new Date();
        const numeroAleatorioNaoRepetido = MessageSender.gerarNumeroAleatorio();
        // Formate a data atual como "yyyy-MM-ddTHH:mm:ss.000Z"
        const dataFormatada = dataAtual.toISOString();
        // Obtenha o timestamp em segundos
        const timestamp = Math.floor(dataAtual.getTime() / 1000);
       const messageData = {
        
        "id": obj.to.id,
        "object": "message",
        "event": "message:out:new",
        "created": timestamp,
        "device": {
            "id": "00000000000",
            "phone": fone_zap,
            "alias": "IRSSL-Confirmacao",
            "plan": "io-professional",
            "version": 1
        },
        "data": {
            "id": numeroAleatorioNaoRepetido,
            "type": "text",
            "flow": "outbound",
            "status": "active",
            "ack": "sent",
            "from": fone_zap1,
            "fromNumber": fone_zap,
            "to":tel2,
            "toNumber": tel1,
            "date": dataFormatada,
            "timestamp": timestamp,
            "body":obj.text ,
            "chat": {
                "id": tel2,
                "name": " ",
                "date": dataFormatada,
                "type": "chat",
                "status": "active",
                "waStatus": "active",
                "statusUpdatedAt":dataFormatada,
                "deletedAt": dataFormatada,
                "firstMessageAt": dataFormatada,
                "lastMessageAt": dataFormatada,
                "lastOutboundMessageAt": dataFormatada,
                "lastInboundMessageAt": dataFormatada,
                "lastAutoReply": null,
                "lastAutoReplyAt": null,
                "stats": {
                    "notes": 0,
                    "localMessages": 14,
                    "inboundMessages": 0,
                    "outboundMessages": 0
                },
                "labels": [],
                "owner": {
                    "agent": null
                },
                "contact": {
                    "wid":tel2,
                    "name": obj.me.pushname,
                    "shortName": obj.me.pushname,
                    "displayName": obj.me.pushname,
                    "formattedName": obj.me.pushname,
                    "formattedShortName": obj.me.pushname,
                    "syncedAt": dataFormatada,
                    "phone": tel1,
                    "image": {
                        "url": ""
                    },
                    "info": {
                        "languages": [],
                        "links": [],
                        "fullName": null
                    },
                    "locationInfo": {
                        "alpha2": "BR",
                        "alpha3": "BRA",
                        "countryCallingCodes": [
                            "+55"
                        ],
                        "currencies": [
                            "BRL"
                        ],
                        "emoji": "????",
                        "ioc": "BRA",
                        "languages": [
                            {
                                "code": "POR",
                                "iso": "pt",
                                "name": "Portuguese",
                                "nativeName": "Português"
                            }
                        ],
                        "name": "Brazil",
                        "status": "assigned"
                    },
                    "metadata": []
                }
            },
            "events": {
                "sent": {
                    "date": dataFormatada
                }
            },
            "meta": {
                "rtl": false,
                "containsEmoji": false,
                "isGif": false,
                "isStar": false,
                "isGroup": false,
                "isForwarded": false,
                "isEphemeral": false,
                "isNotification": false,
                "isLive": false,
                "isBroadcast": false,
                "isBizNotification": false,
                "isDoc": false,
                "isLinkPreview": false,
                "isPSA": false,
                "isRevoked": false,
                "isUnreadType": false,
                "isFailed": false,
                "notifyName": "",
                "source": "api",
                "via": "platform"
            }
        }
         
      };
      
       console.log("Body",messageData);
      const url = `${config.api_url}/api/MessageOut`;
      console.log("url de envio",url);
      const response = await axios.post(url, messageData);
      return response.data; // Você pode retornar os dados da resposta, se necessário
    } catch (error) {
        console.log( '==== resposta Erro em webHookOut ======');
        console.error(error);
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

module.exports = MessageSender;