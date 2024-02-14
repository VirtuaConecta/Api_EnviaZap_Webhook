const config = require('./config');
const axios = require('axios');

class MessageReceived {
  static async sendMessageToApiIn(obj) {
    try {
        const fone_zap =`+${obj.to.replace(/[^0-9]/g, "")}`;
        const fone_zap1 =obj.to;
        const tel1 = `+${obj.from.replace(/[^0-9]/g, "")}`;
        const tel2 = obj.from; 
        const dataAtual = new Date();
        const numeroAleatorioNaoRepetido = MessageReceived.gerarNumeroAleatorio();
        // Formate a data atual como "yyyy-MM-ddTHH:mm:ss.000Z"
        const dataFormatada = dataAtual.toISOString();
        // Obtenha o timestamp em segundos
        const timestamp = Math.floor(dataAtual.getTime() / 1000);
       const messageData = {
        "id": obj.id,
        "object": "message",
        "event": "message:in:new",
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
            "flow": "inbound",
            "status": "active",
            "ack": "delivered",
            "from": tel2,
            "fromNumber":tel1,
            "to": fone_zap1,
            "toNumber": fone_zap,
            "date": dataFormatada,
            "timestamp": obj.t,
            "body": obj.body,
            "chat": {
                "id": tel2,
                "name": obj.notifyName,
                "date":dataFormatada,
                "type": "chat",
                "status": "pending",
                "waStatus": "active",
                "statusUpdatedAt": dataFormatada,
                "deletedAt": dataFormatada,
                "firstMessageAt": dataFormatada,
                "lastMessageAt": dataFormatada,
                "lastOutboundMessageAt": dataFormatada,
                "lastInboundMessageAt": dataFormatada,
                "lastReactionAt": dataFormatada,
                "lastReactionEmoji": "????",
                "lastAutoReply": null,
                "lastAutoReplyAt": null,
                "stats": {
                    "notes": 0,
                    "localMessages": 2,
                    "inboundMessages": 0,
                    "outboundMessages": 0
                },
                "labels": [],
                "owner": {
                    "agent": null
                },
                "contact": {
                    "wid":tel2,
                    "displayName": obj.sender.pushname,
                    "formattedName": tel1,
                    "formattedShortName": tel1,
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
            "events": {},
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
                "notifyName": obj.sender.pushname,
                "source": "android"
            }
        }
        
        
         
      };
      if (obj.quotedMsg) {
        messageData.data.quoted = {
            "body": obj.quotedMsg.body,
            "date": dataFormatada,
            "from": obj.quotedParticipant,
            "isForwarded": obj.fromMe,
            "timestamp": obj.timestamp,
            "type": obj.quotedMsg.type,
            "wid": obj.quotedStanzaID
        };
    }
    
      const url = `${config.api_url}/api/MessageIn`;
       console.log("Body in=>",messageData);
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

module.exports = MessageReceived;