import { handleAuthCallback } from "shopify-nextjs-toolbox";

const afterAuth = async (req, res, accessToken) => {
  // save accessToken with the shop in your local database

  // redirect is handled by handleAuthCallback

  // (optional) return a relative path where the customer should be redirected to after login/install
  // defaults to process.env.HOME_PATH
  return "/home";
};

const validateNonce = async ({ nonce, req, shopName }) => {
  // optional: validate the stored nonce from /pages/api/handleAuthStart against the nonce passed at this step
  //   the nonce should equal the nonce you stored in saveNonce at handleAuthStart()
  //   look up your shopName in your data store, and makes sure the nonce matches

  return true;
};

export default handleAuthCallback(afterAuth, validateNonce);
