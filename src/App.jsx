import React from "react";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Navbar from "./components/Navbar";

const App = () => {
  const [usermode, setusermode] = React.useState(true);

  function togglemode() {
    setusermode(!usermode);
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="flex flex-col items-center justify-center w-1/2 h-full">
          <img
            src="/main.svg"
            alt="Description"
            width={800}
            className="ml-10 mt-10"
          />
        </div>
        <div className="flex flex-col w-1/2">
          {usermode ? <Signin togglemode={togglemode} /> : <Signup togglemode={togglemode} />}
        </div>
      </div>
    </>
  );
};

export default App;
