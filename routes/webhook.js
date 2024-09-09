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
  
    if (mode === 'subscribe' && verifyToken === verify_token) {
      // Verificación exitosa, responde con el challenge
      res.status(200).send(challenge);
      
    } else {
      // Verificación fallida
      res.sendStatus(403);
    }
  });

  router.post('/leadgen', (req, res) => {

    const { entry, object } = req.body;

    console.log({entry});

    // if (object === 'user') {
    //   entry.forEach(entry => {
    //     const changes = entry.changes;
    //     changes.forEach(change => {
    //       console.log('Change detected:');
    //       console.log('Field:', change.field);
    //       console.log('Verb:', change.value.verb);
    //       console.log('Object ID:', change.value.object_id);
    //     });
    //   });
    // }
  
    // Responder a Facebook con un 200 para confirmar que recibimos el evento
    res.status(200).send('EVENT_RECEIVED');
  });

module.exports = router; 
