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

  router.post('/', (req, res) => {

    console.log("SE EJECUTO EL POST");

    res.status(200).send('EVENT_RECEIVED');
  });

module.exports = router; 
