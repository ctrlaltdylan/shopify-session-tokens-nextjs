const nonce = require('nonce');
const createNonce = nonce();

export default (req, res) => {
  const { shop, timestamp, hmac } = req.query;
  const scopes = ['read_orders', 'read_customers'].join(',');
  const redirect_uri = 'https://verdict.ngrok.io/api/auth/callback';

  res.redirect(
    `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_PUBLIC_KEY}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${createNonce()}`
  );
};
