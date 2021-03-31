import { withSessionToken } from "shopify-nextjs-toolbox";

const handler = async (req, res) => {
  res.statusCode = 200
  res.json(req.sessionToken)
}

export default withSessionToken(handler);
