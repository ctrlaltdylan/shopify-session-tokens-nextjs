import jwt from 'jsonwebtoken';
import { get } from 'lodash';

const verifySessionToken = async (req, res, next) => {
  const token = get(ctx, "request.headers.authorization", "").replace(
    /Bearer /,
    ""
  );

  try {
    const decoded = await jwt.verify(token, process.env.SHOPIFY_API_SECRET_KEY);
    req.session_token = decoded;
    next();
  } catch (err) {
    res.status_code = 401;
    res.end(JSON.stringify({ message: err.message }));
  }
};


export default (req, res) => {
  
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
