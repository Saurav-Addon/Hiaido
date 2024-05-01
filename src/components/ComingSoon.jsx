import React from "react";
import Header from "./Header";


const ComingSoon = () => {
  return (
    <>
      {/* <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden"> */}
      <Header />
      <div className="container flex items-center justify-center h-screen text-center">
       <div>
       <h1 className="mb-3 text-6xl text-orange-500">Coming Soon...</h1>
       <p className=" body-1 type1 font-mono max-w-2xl mx-auto mb-6 font-bold text-xs lg:text-2xl font text-n-2 lg:mb-8">We are working hard to bring you something amazing. Stay tuned!</p>
        
       </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ComingSoon;
