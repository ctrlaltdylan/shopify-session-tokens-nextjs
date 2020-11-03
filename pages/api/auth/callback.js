import handleAuthCallback from '../../../middleware/handleAuthCallback';

const afterAuth = async(req, res, accessToken) => {
  // save accessToken with the shop
  
  // redirect is handled by handleAuthCallback
};

export default handleAuthCallback(afterAuth);
