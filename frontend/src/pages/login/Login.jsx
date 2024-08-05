import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../../api/userAPI";
function Login() {
  const { mutate: mutateLogin } = useMutation({
    mutationFn: (data) => signin(data),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleGoogleLogin = (credentialResponse) => {
    const user = jwtDecode(credentialResponse.credential);
    const data = { email: user.email, google: true };
    mutateLogin(data);
  };
  return (
    <>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
}

export default Login;
