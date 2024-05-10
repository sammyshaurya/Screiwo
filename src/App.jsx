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
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col items-center justify-start lg:w-1/2 h-full lg:pl-10">
          <img
            src="/main.svg"
            alt="Description"
            className="ml-10 lg:w-full lg:h-auto lg:ml-0 lg:mt-10 hidden lg:block"
            width={800}
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          {usermode ? <Signin togglemode={togglemode} /> : <Signup togglemode={togglemode} />}
        </div>
      </div>
    </>
  );
}

export default App;
