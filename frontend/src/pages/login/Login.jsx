import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../../api/userAPI";
import { useNavigate, Link } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationFn: (data) => signin(data),
    onSuccess: (data) => {
      console.log("google2");

      localStorage.setItem("token", data.token);
      localStorage.setItem("image", data.user.image);
      localStorage.setItem("idUser", data.user._id);
      localStorage.setItem("roles", data.user.roles);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleGoogleLogin = (credentialResponse) => {
    const user = jwtDecode(credentialResponse.credential);
    const data = { email: user.email, google: true };
    console.log("google1");
    mutateLogin(data);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    mutateLogin({ email, password, google: false });
  };

  return (
    <div className="mt-8 h-screen w-full flex items-center justify-center bg-[url('././assets/auth.jpg')] bg-cover bg-no-repeat">
      <form
        onSubmit={onSubmit}
        className="w-[25%] h-[50%] bg-white flex flex-col gap-2  p-5  "
      >
        <p className="title">Login</p>
        <div className="flex flex-col gap-3">
          <div class="relative h-11 w-full  min-w-[200px]">
            <input
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Email
            </label>
          </div>

          <div class="relative h-11 w-full min-w-[200px]">
            <input
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Password
            </label>
          </div>
        </div>
        <Link to="/forgotPassword">Forgot your password?</Link>

        <button
          disabled={isPending}
          className="block w-full select-none rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit"
        >
          Submit
        </button>
        <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
          Don't have an account?
          <Link
            className="ml-1 block font-sans text-sm font-bold leading-normal text-cyan-500 antialiased"
            href="#signup"
          >
            Sign up
          </Link>
        </p>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </form>
    </div>
  );
}

export default Login;
