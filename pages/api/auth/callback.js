import querystring  from 'querystring';
import verifyHmac from '../../../middleware/verifyHmac';

export default async (req, res) => {
  const valid = verifyHmac(req.query);
  if(!valid) {
    res.statusCode = 403;
    res.end(JSON.stringify({message: 'Invalid Signature.'}))
  }

  const accessTokenQuery = querystring.stringify({
    code: req.query.code,
    client_id: process.env.SHOPIFY_API_PUBLIC_KEY,
    client_secret: process.env.SHOPIFY_API_PRIVATE_KEY
  })

  try {
    const data = await fetch(`https://${req.query.shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(accessTokenQuery).toString(),
      },
      body: accessTokenQuery
    })
    const accessTokenData = await data.json();
    const {
      access_token: accessToken,
      associated_user_scope: associatedUserScope,
      associated_user: associatedUser,
    } = accessTokenData;
    res.redirect('https://pierces-pretzels.myshopify.com/admin/apps/real-id-dev/getToken');
  } catch(err) {
    res.status(401).json({message: 'Unable to retrieve access token.'});
  }
};
