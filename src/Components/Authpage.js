import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Authpage() {
  const [showLogin, toggleShowLogin] = useState(true);
  const handleLoginPage = () => toggleShowLogin(!showLogin);

  return (
    <div className="flex items-center justify-center rounded-md border-2 border-black border-solid relative bg-green-400 align-middle cursor-default h-screen w-screen ">
      <div className=" align-middle absolute items-center border-2 flex flex-col w-1/2 bg-sky-100 ">
        <div className="w-full flex flex-row justify-evenly text-3xl text-center bg-white ">
          <div
            className={`${showLogin ? "bg-inherit" : "bg-sky-700 text-white"} border-gray-700 border-r-4 border-solid w-full p-2`}
            onClick={handleLoginPage}
          >
            Log in
          </div>
          <div
            className={`${!showLogin ? "bg-inherit" : "bg-sky-700 text-white"} w-full p-2`}
            onClick={handleLoginPage}
          >
            Sign up
          </div>
        </div>
        <div className="border-2 border-red-500 border-solid m-4 p-5 rounded-2xl bg-white ">
          {showLogin ? (
            <Login handleLoginPage={handleLoginPage} />
          ) : (
            <Signup handleLoginPage={handleLoginPage} />
          )}
        </div>
      </div>
     
    </div>
  );
}

export default Authpage;
