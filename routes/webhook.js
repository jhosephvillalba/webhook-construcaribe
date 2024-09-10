const express = require('express'); 
const router = express.Router(); 

router.get('/', (req, res) => {
    // Capturar los valores de los parámetros de consulta
    const mode = req.query['hub.mode'];
    const challenge = req.query['hub.challenge'];
    const verifyToken = req.query['hub.verify_token'];
  
    // Imprimir los valores para verificar que los capturamos
    console.log('Hub Mode:', mode);
    console.log('Hub Challenge:', challenge);
    console.log('Hub Verify Token:', verifyToken);
  
    // Si la verificación es exitosa, responde con el 'challenge'
    const verify_token = process.env.VERIFY_TOKEN; // El token que has definido

    if (mode === 'subscribe' && verify_token === verifyToken) {
      // Verificación exitosa, responde con el challenge
      res.status(200).send(challenge);
      
    } else {
      // Verificación fallida
      res.sendStatus(403);
    }
  });

  router.post('/', (req, res) => {
    let body = req.body;
  
    // Checks if this is an event from a page subscription
    if (body.object === 'page') {
  
      // // Iterates over each entry - there may be multiple if batched
      // body.entry.forEach(function(entry) {
  
      //   // Gets the body of the webhook event
      //   let webhookEvent = entry.messaging[0];
      //   console.log(webhookEvent);
  
      //   // Get the sender PSID
      //   let senderPsid = webhookEvent.sender.id;
      //   console.log('Sender PSID: ' + senderPsid);
  
      //   // Check if the event is a message or postback and
      //   // pass the event to the appropriate handler function
      //   if (webhookEvent.message) {
      //     handleMessage(senderPsid, webhookEvent.message);
      //   } else if (webhookEvent.postback) {
      //     handlePostback(senderPsid, webhookEvent.postback);
      //   }
      // });
  
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
  
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  });

module.exports = router; 
