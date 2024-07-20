import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Authpage() {
  const [showLogin, toggleShowLogin] = useState(true);
  const handleLoginPage = () => toggleShowLogin(!showLogin);

  return (
    <div className="rounded-md border-2 border-black border-solid flex  justify-center relative bg-green-400 align-middle cursor-default h-full w-full ">
      <div className=" align-middle absolute items-center border-2 border-red-500 border-solid flex flex-col w-1/2 bg-sky-100 ">
        <div className="flex flex-row m-2 text-3xl bg-white ">
          <div
            className={`${showLogin ? "bg-inherit" : "bg-sky-700 text-white"}`}
            onClick={handleLoginPage}
          >
            Log in
          </div>
          <div
            className={`${!showLogin ? "bg-inherit" : "bg-sky-700 text-white"}`}
            onClick={handleLoginPage}
          >
            Sign up
          </div>
        </div>
        <div className="border-2 border-red-500 border-solid m-4 p-5 rounded-2xl bg-white">
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
