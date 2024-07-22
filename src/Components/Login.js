
import React, { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login(props) {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  let navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit");
    let url = "https://test-api.achilyon.in/v1/rest-auth/login";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "access_token":localStorage.getItem("authToken")
      },
      body: JSON.stringify({
        username: credentials.userName,
        password: credentials.password,
      }),
    };
    const response = await fetch(url, options);
    let json = await response.json();
    console.log(json);
    if (json.message === "User login successful.") {
      toast.success("logged in successfully!!")
      localStorage.setItem("userName", credentials.userName);
      localStorage.setItem("authToken", json.data.access_token);
      setTimeout(()=>(navigate("/dashboard")),4000);
    } else {
      toast.error("enter valid credentials!")
    }
  };
  // {
  //   "username": "testres",
  //   "password": "Test@5432"
  // }

  return (
    <div className="sign-in-wrapper">
      <ToastContainer/>
      <div className="sign-in-header ">
        <h1 className="text-3xl ">Log In </h1>
        <p>Login in to your existing account</p>
      </div>
      <div className="sign-in-content-wrapper">
        <div className="sign-in-form-wrapper flex flex-col content-wrapper p-7">
          <form>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="userName"
                  className="sign-in-label block text-sm leading-6"
                >
                  Username
                </label>
                <div className="sign-in-input mt-2">
                  <input
                    type="text"
                    name="userName"
                    onChange={onChange}
                    value={credentials.userName}
                    className="block flex-1 border-0 py-1.5 pl-1 text-black-900 placeholder-gray focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="name@email.com"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="password"
                  className="sign-in-label block text-sm leading-6"
                >
                  Password
                </label>
                <div className="sign-in-input mt-2">
                  <input
                    type="password"
                    name="password"
                    onChange={onChange}
                    value={credentials.password}
                    autoComplete="password"
                    className="block flex-1 border-0 py-1.5 pl-1 text-black-900 placeholder-gray focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="password"
                  />
                </div>
              </div>
            </div>
            <div className="forgot-password">
              <Link to="/">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              className="sign-in-btn rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mt-2"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <div className="sign-up-link">
        <p>Don't have an account?</p>
        <button onClick={props.handleLoginPage} style={{ cursor: "pointer" }}>
          {" "}
          Register here
        </button>
      </div>
    </div>
  );
}

export default Login;
