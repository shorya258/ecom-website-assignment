import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    userName: "",
    mobileNo: "",
    email: "",
    password: "",
    role: "",
  });
  const [openDropdown, toggleDropdown] = useState(false);
  const handleDropDown = (setRole) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      role: setRole,
    }));
    toggleDropdown(false);
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const validateInputs = (credentials) => {
    let errorsObj = {};
    let errorFound = false;
    if (credentials.name?.length === 0) {
      errorFound = true;
      errorsObj.name = "name can not be empty";
    } else if (credentials.name?.length <= 4) {
      errorFound = true;
      errorsObj.name = "name should contain at least 4 letters";
    }
    if (credentials.userName?.length === 0) {
      errorFound = true;
      errorsObj.userName = "username can not be empty";
    } else if (credentials.userName?.length <= 4) {
      errorFound = true;
      errorsObj.userName = "name should contain at least 4 letters";
    }
    return errorFound;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validateInputs(credentials)
    let url = "https://test-api.achilyon.in/v1/rest-auth/register";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
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
    let json = await response.json();
    console.log(json);
    console.log(json.data);
    console.log(json.data.access_token);
    if (json.message === "User registered successfully.") {
      toast.success("User registered successfully.");
      localStorage.setItem("userName", credentials.userName);
      localStorage.setItem("authToken", json.data.access_token);
      setTimeout(() => props.handleLoginPage(), 4000);
    } else {
      toast.error("enter valid credentials");
    }
  };
  return (
    <div className="flex flex-col ">
      <ToastContainer />
      <div className="align-middle justify-evenly items-center ">
        <div className="text-2xl">Register</div>
      </div>
      <div className="mt-3 sign-in-form-wrapper flex flex-col content-wrapper p-3 z-0">
        <form className="flex flex-col" >
          <div className="flex flex-col gap-x-6 gap-y-3 mb-3">
            {/* row 1 */}
            <div className="flex flex-row">
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
            </div>
            {/* row 2 */}
            <div className="flex flex-row">
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
          </div>
          <div className="flex flex-row">
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
            {/* DROPDOWN */}
            <div className="flex justify-between z-0 relative" >
              <div
                onClick={() => toggleDropdown(!openDropdown)}
                className="z-0 lock text-sm font-medium leading-6 text-gray-900"
              >
                {credentials.role.length ? (
                  <span>{credentials.role.toLocaleLowerCase()}</span>
                ) : (
                  <span>Role</span>
                )}
                {!openDropdown ? (
                  <FontAwesomeIcon icon={faAngleDown} />
                ) : (
                  <FontAwesomeIcon icon={faAngleUp} />
                )}
              </div>
              {openDropdown && (
                <div className="w-22 p-1 m-1 z-10 top-[15px] left-[25px] grid grid-cols-1 divide-y-4 absolute shadow-2xl ">
                  <div
                    value={credentials.role}
                    onClick={() => handleDropDown("CUSTOMER")}
                    className="my-1  "
                  >
                    customer
                  </div>
                  <div
                    value={credentials.role}
                    onClick={() => handleDropDown("RESTAURANT")}
                  >
                    restaurant
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className=" justify-center " >
          <button
            type="submit"
            className="sign-in-btn rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mt-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          </div>
        </form>
      </div>
      <div className="sign-up-link align-middle ">
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
