import jwt_decode from "jwt-decode";

export const isAuthenticated = () => {
    let tokenValid = false;
  
    try {
      if (localStorage.getItem("access_token").replace(/[\""]+/g, "")) {
        if (
          jwt_decode(localStorage.getItem("access_token").replace(/[\""]+/g, ""))
            .exp
        ) {
          tokenValid = true;
        } else {
          tokenValid = false;
        }
      }
    } catch (error) {
      tokenValid = false;
    }
    return tokenValid;
  };