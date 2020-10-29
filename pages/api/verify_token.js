import jwt from 'jsonwebtoken';

const verifySessionToken = async (ctx, next) => {
  const token = get(ctx, "request.headers.authorization", "").replace(
    /Bearer /,
    ""
  );

  try {
    const decoded = await jwt.verify(token, process.env.SHOPIFY_API_SECRET_KEY);
    ctx.state.token = decoded;
    return next();
  } catch (err) {
    if (err) {
      Sentry.captureException(err);
      ctx.body = JSON.stringify({ message: err.message });
      ctx.status = 401;
      return;
    }
  }
};


export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
