const crypto = require('crypto');
const querystring = require('querystring');

function safeCompare(stringA, stringB) {
  const aLen = Buffer.byteLength(stringA);
  const bLen = Buffer.byteLength(stringB);

  if (aLen !== bLen) {
    return false;
  }

  // Turn strings into buffers with equal length
  // to avoid leaking the length
  const buffA = Buffer.alloc(aLen, 0, "utf8");
  buffA.write(stringA);
  const buffB = Buffer.alloc(bLen, 0, "utf8");
  buffB.write(stringB);

  return crypto.timingSafeEqual(buffA, buffB);
}

// https://example.org/some/redirect/uri?code={authorization_code}&hmac=da9d83c171400a41f8db91a950508985&timestamp=1409617544&state={nonce}&shop={hostname}
export default (req, res) => {
  const { hmac, signature: _signature, ...map } = req.query;
  const orderedMap = Object.keys(map)
    .sort((v1, v2) => v1.localeCompare(v2))
    .reduce((sum, k) => {
      sum[k] = req.query[k]
      return sum;
    }, {});
  
  const message = querystring.stringify(orderedMap);
  const compute_hmac = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_PRIVATE_KEY)
    .update(message)
    .digest("hex");

  const valid = safeCompare(hmac, compute_hmac);
  if(!valid) {
    res.status(403).json({message: 'Invalid Signature.'})
  }

  const accessTokenQuery = querystring.stringify({
    code: req.query.code,
    client_id: process.env.SHOPIFY_API_PUBLIC_KEY,
    client_secret: process.env.SHOPIFY_API_PRIVATE_KEY
  })

  fetch(`https://${req.query.shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(accessTokenQuery).toString(),
    },
    body: accessTokenQuery
  }).then(async (data) => {
    const accessTokenData = await data.json();
    const {
      access_token: accessToken,
      associated_user_scope: associatedUserScope,
      associated_user: associatedUser,
    } = accessTokenData;
    res.redirect('/getToken');
  }).catch(err => {
    res.status(401).json({message: 'Unable to retrieve access token.'});
  })
};
