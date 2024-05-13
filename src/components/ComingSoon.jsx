import React, { useEffect } from "react";
import Header from "./Header";
import Typewriter from "./TypeWriter";


const ComingSoon = () => {
  useEffect(() => {
		document.title = "Hiaido | Subscription";
	  }, [])

  return (
    <>
      {/* <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden"> */}
      <Header />
      <div className="container flex  items-center justify-center h-screen text-center">
       <div className="z-1 max-w-[55rem] mx-auto text-center">
       <h1 className="mb-3 text-6xl text-orange-500">Coming Soon...</h1>
       <Typewriter
          text="We are working hard to bring you something amazing. Stay tuned!"
          className="body-1 font-mono max-w-2xl mx-auto mb-6 font-bold text-xs lg:text-2xl font text-n-2 lg:mb-8"
        />
       </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ComingSoon;
