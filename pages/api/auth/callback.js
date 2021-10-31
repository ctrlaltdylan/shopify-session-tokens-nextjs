import { handleAuthCallback } from "shopify-nextjs-toolbox";

const afterAuth = async (req, res, accessToken) => {
  // save accessToken with the shop in your local database

  // redirect is handled by handleAuthCallback

  // (optional) return a relative path where the customer should be redirected to after login/install
  // defaults to process.env.HOME_PATH
  return "/home";
};

export default handleAuthCallback(afterAuth);
