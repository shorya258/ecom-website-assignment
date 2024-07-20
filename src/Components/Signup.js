import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom";

function Signup(props) {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    userName: "",
    mobileNo: "",
    email: "",
    password: "",
    role: "",
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "https://test-api.achilyon.in/v1/rest-auth/register";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.userName,
        password: credentials.password,
        email: credentials.email,
        name: credentials.name,
        phone_number: credentials.mobileNo,
        role: credentials.role,
      }),
    };
    const response = await fetch(url, options);
    let json= await response.json();
    console.log(json)
    console.log(json.data)
    console.log(json.data.access_token)
    if (json.message==="User registered successfully.") {
      toast.success("User registered successfully.");
      localStorage.setItem("userEmail", credentials.userName);
      localStorage.setItem("authToken", json.data.access_token);
      setTimeout(()=>(navigate("/login")),4000);
    }
    else{
      toast.error("enter valid credentials");
    }
    
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWJmNGQ3NmYyNTJmYWY3NzhiZWMwMCIsImlhdCI6MTcyMTQ5Njc5MSwiZXhwIjoxNzI0MDg4NzkxfQ.WCvbb2YCXPk_-ddoJstQhz6wN8XaA3G2enNO7PZt9ZI"
    // {
    //   "username": "testcus",
    //   "password": "Test@1234",
    //   "email": "cust@gmail.com",
    //   "name": "Test Customer",
    //   "phone_number": "+911112223335",
    //   "role": "CUSTOMER"
    // }
    // console.log(response.json());
    // navigate("/dashboard");
  };
  return (
    <div className="sign-in-wrapper">
      <ToastContainer/>
      <div className="sign-in-header">
        <h1 className="text-2xl">Register</h1>
      </div>
      <div className="mt-3 sign-in-form-wrapper flex flex-col content-wrapper p-3">
        <form>
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6 mb-3">
            {/* USER NAME */}
            <div className="sm:col-span-6">
              <label
                htmlFor="userName"
                className="sign-in-label block text-sm font-medium leading-6 text-gray-900"
              >
                User Name
              </label>
              <div className="sign-in-input mt-2">
                <input
                  type="text"
                  name="userName"
                  onChange={onChange}
                  value={credentials.userName}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="User Name"
                />
              </div>
            </div>
            {/* FULL NAME */}
            <div className="sm:col-span-6">
              <label
                htmlFor="name"
                className="sign-in-label block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="sign-in-input mt-2">
                <input
                  type="text"
                  name="name"
                  onChange={onChange}
                  value={credentials.name}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="sm:col-span-6">
              <label
                htmlFor="email"
                className="sign-in-label block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="sign-in-input mt-2">
                <input
                  type="text"
                  name="email"
                  onChange={onChange}
                  value={credentials.email}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            {/* PHONE NUMBER */}
            <div className="sm:col-span-6">
              <label
                htmlFor="mobileNo"
                className="sign-in-label block text-sm font-medium leading-6 text-gray-900"
              >
                Mobile Number
              </label>
              <div className="sign-in-input mt-2">
                <input
                  type="text"
                  name="mobileNo"
                  onChange={onChange}
                  value={credentials.mobileNo}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="+(91)9998887776"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="sm:col-span-6">
              <label
                htmlFor="password"
                className="sign-in-label block text-sm font-medium leading-6"
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
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="password"
                />
              </div>
            </div>
          </div>
          {/* DROPDOWN */}
          <div>
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              name="role"
              onChange={onChange}
              value={credentials.role}
            />
            <Dropdown />
          </div>
          <button
            type="submit"
            className="sign-in-btn rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mt-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {/* {showAccountCreated && (
            <div>
              <p>Account Created!</p>
            </div>
          )} */}
        </form>
      </div>
      <div className="sign-up-link">
        <p>Already have an account?</p>
        <button onClick={props.handleLoginPage} style={{ cursor: "pointer" }}>
          {" "}
          Sign In here
        </button>
      </div>
    </div>
  );
}

export default Signup;
