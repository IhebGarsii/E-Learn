import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
function Login() {
  const handleCallback = (response) => {
    const user = jwtDecode(response.credential);
    console.log(user);
  };
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "745484482146-nb1euo7dj38rge6cb5c4mre2u3k0vsqc.apps.googleusercontent.com",
      callback: handleCallback,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "marge",
    });
  }, []);
  return (
    <div>
      <div className=" absolute top-[20%]" id="signInDiv"></div>
    </div>
  );
}

export default Login;
