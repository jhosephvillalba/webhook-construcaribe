// Token secreto que Facebook y tu aplicación conocen
const APP_SECRET = process.env.APP_TOKEN;

// Función para verificar la firma de Facebook
function verifySignature(req, res, buf) {
  const signature = req.headers['x-hub-signature-256'];
  if (!signature) {
    return false;
  }

  const elements = signature.split('=');
  const method = elements[0];
  const receivedSignature = elements[1];

  const expectedSignature = crypto
    .createHmac('sha256', APP_SECRET)
    .update(buf)
    .digest('hex');

  // Compara las firmas
  return crypto.timingSafeEqual(
    Buffer.from(receivedSignature),
    Buffer.from(expectedSignature)
  );
}

module.exports = {
    verifySignature, 
}