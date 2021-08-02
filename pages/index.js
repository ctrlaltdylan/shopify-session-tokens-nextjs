import React, { useEffect } from "react";
import { useOAuth } from "shopify-nextjs-toolbox";

export default function Index() {
  useOAuth();

  // replace this with your jazzy loading icon animation
  return <>Loading...</>;
}
