import { handleAuthStart } from "shopify-nextjs-toolbox";

// optional: save the nonce generated within handleAuthStart
//   handleAuthStart generates a unique nonce for you, no need to break out a crypto library
//   after OAuth is complete, you can compare the nonce generated at this step vs the end for extra security
async function saveNonce({ req, shopName, nonce }) {
  // within this function, associate the nonce with the shopName of the merchant logging in you data store of choice
  //   then within pages/api/auth/callback.js we'll verify the nonce is the same
  //   not sure how to do this? Just don't pass saveNonce to handleAuthStart
}

export default handleAuthStart({ saveNonce });
