const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", (req, res) => {
  // Capturar los valores de los parámetros de consulta
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const verifyToken = req.query["hub.verify_token"];

  // Imprimir los valores para verificar que los capturamos
  console.log("Hub Mode:", mode);
  console.log("Hub Challenge:", challenge);
  console.log("Hub Verify Token:", verifyToken);

  // Si la verificación es exitosa, responde con el 'challenge'
  const verify_token = process.env.VERIFY_TOKEN; // El token que has definido

  if (mode === "subscribe" && verify_token === verifyToken) {
    // Verificación exitosa, responde con el challenge
    res.status(200).send(challenge);
  } else {
    // Verificación fallida
    res.sendStatus(403);
  }
});

router.post("/", async (req, res) => {
  // Facebook will be sending an object called "entry" for "leadgen" webhook event
  if (!req.body.entry) {
    return res.status(500).send({ error: "Invalid POST data received" });
  }

  // Travere entries & changes and process lead IDs
  for (const entry of req.body.entry) {
    for (const change of entry.changes) {
      // Process new lead (leadgen_id)
      console.log({id:change.value.leadgen_id}); 
      
      await processNewLead(change.value.leadgen_id);

      console.log({ lead: change.value });
    }
  }

  // Success
  res.send({ success: true });
});

async function processNewLead(leadId) {
  let response;

  try {
    // FACEBOOK_PAGE_ACCESS_TOKEN=109000867725441
    // Get lead details by lead ID from Facebook API
    response = await axios.get(
      `https://graph.facebook.com/v9.0/${leadId}/?access_token=${process.env.APP_TOKEN}`
    );
  } catch (err) {
    // Log errors
    return console.warn(
      `An invalid response was received from the Facebook API: ${leadId}`
    );
  }

  // Ensure valid API response returned
  if (!response.lead) {
      return console.warn(`An invalid response was received from the Facebook API: ${response}`);
  }

  // // Lead fields
  // const leadForm = [];

  // // Extract fields
  // for (const field of response.data.field_data) {
  //     // Get field name & value
  //     const fieldName = field.name;
  //     const fieldValue = field.values[0];

  //     // Store in lead array
  //     leadForm.push(`${fieldName}: ${fieldValue}`);
  // }

  // // Implode into string with newlines in between fields
  // const leadInfo = leadForm.join('\n');

  // Log to console
  console.log({ data: response });

  // Use a library like "nodemailer" to notify you about the new lead
  //
  // Send plaintext e-mail with nodemailer
  // transporter.sendMail({
  //     from: `Admin <admin@example.com>`,
  //     to: `You <you@example.com>`,
  //     subject: 'New Lead: ' + name,
  //     text: new Buffer(leadInfo),
  //     headers: { 'X-Entity-Ref-ID': 1 }
  // }, function (err) {
  //     if (err) return console.log(err);
  //     console.log('Message sent successfully.');
  // });
  //
}

async function SendLeadToConstrucaribe(lead) {
  // Configuración
  const url = "https://api.construcaribe.com/contact-projects"; // Cambia a tu endpoint

  try {
    await axios.post(
      url,
      {
        full_name: item.name,
        message: "Mas información sobre el proyecto porfavor!",
        email: item.email,
        phone: item.Teléfono,
        project_id: item.project_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;
