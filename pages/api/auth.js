const nonce = require('nonce');
const createNonce = nonce();

export default (req, res) => {
  const { shop, timestamp, hmac } = req.query;
  const scopes = process.env.SHOPIFY_AUTH_SCOPES;
  const redirect_uri = process.env.SHOPIFY_AUTH_CALLBACK_URL;

  res.redirect(
    `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_PUBLIC_KEY}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${createNonce()}`
  );
};
