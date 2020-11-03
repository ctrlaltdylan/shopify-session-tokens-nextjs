import React, { useEffect } from "react";
import qs from "querystring";
import axios from 'axios';


export default function Home() {
  // page context params
  useEffect(() => {
    if (typeof window !== "undefined" && window.location) {
      const query = qs.parse(window.location.search);
      axios
        .post("/api/auth", {
          query: query,
        })
        .then((response) => {
          if (response.data.redirectTo) {
            if (window.parent) {
              window.parent.location.href = response.data.redirectTo;
            } else {
              window.location.href = response.data.redirectTo;
            }
          }
        })
        .catch(function (error) {
          // handle error
          console.error(error);
        });
    }
  }, []);

  return (<>Loading...</>);
}
