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

  router.post('/', async (req, res) => {
    // Facebook will be sending an object called "entry" for "leadgen" webhook event
    if (!req.body.entry) {
        return res.status(500).send({ error: 'Invalid POST data received' });
    }

    // Travere entries & changes and process lead IDs
    for (const entry of req.body.entry) {
        for (const change of entry.changes) {
            // Process new lead (leadgen_id)
            //await processNewLead(change.value.leadgen_id);
            console.log({lead:change.value.leadgen_id}); 
        }
    }

    // Success
    res.send({ success: true });
}); 

module.exports = router; 
