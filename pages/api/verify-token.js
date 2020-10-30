import withSessionToken from '../../middleware/withSessionToken';

const handler = async (req, res) => {
  res.statusCode = 200
  res.json(req.session_token)
}

export default withSessionToken(handler);
