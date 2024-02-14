const MessageSender = require('./webHookOut'); // Importa a classe do arquivo webHookOut.js
const MessageReceived = require('./webHookIn');
const MessageFailed =require('./webHookFailed');

const express = require('express');
const venom = require('venom-bot');

const app = express();
const port = 80;


app.use(express.json());

let client; // Armazena a instância Venom para manipulação de mensagens

// Função para iniciar a sessão Venom
async function iniciarVenom() {
  client = await venom.create({
    session: 'bot',
    headless: true,
    devtools: false,
    useChrome: true,
    debug: false,
    logQR: true,
    browserArgs: [''],
    refreshQR: 15000,
    autoClose: 60000,
    createPathFile: false,
  });

  client.onStateChange(async (state) => {
    if (state === 'CONNECTED') {
      console.log('Conectado ao WhatsApp!');
    }
  });

  // Configurar client.onMessage aqui para capturar mensagens
  client.onMessage(async (message) => {
    const resposta = message.body.toLowerCase().trim();
    const telefoneRemetente = message.from; // Número de telefone do remetente
  

    console.log('Body:', message);

    await MessageReceived.sendMessageToApiIn(message); 


  });
}

// Rota para receber os dados do número de telefone e mensagem
app.post('/v1/messages', async (req, res) => {
  const { phone, message ,quote,device} = req.body;

  if (!phone || !message) {
    return res.status(400).json({ error: 'Telefone e mensagem são obrigatórios.' });
  }

  if (!client) {
    return res.status(500).json({ error: 'Sessão Venom não inicializada.' });
  }

  try {

    const tel1 = `${phone}@c.us`;
   var response = await client.sendText(tel1, message);

   console.log( '==== resposta OK======');
  
     // Enviar os dados para a outra API usando a classe MessageSender
     
     await MessageSender.sendMessageToApi(response); 

     
    res.json({ success: 'Mensagem enviada com sucesso!' });

  } catch (error) {
    console.log( '==== resposta Erro ======');
    console.error(error);
    await MessageFailed.sendMessageToApiFailed(error,message);

    res.status(500).json({ error: 'Erro ao enviar a mensagem.' });
  }
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
  iniciarVenom().catch((error) => {
    console.error(error);
  });
});
