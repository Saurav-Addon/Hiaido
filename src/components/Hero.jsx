import { curve, heroBackground, robot } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import axios from "axios";
import Loader from "./utils/Loader";

const Hero = () => {
  const [data, setData] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkEmail()) {
      setIsLoader(true);
      const bodyFormData = new FormData();
      bodyFormData.append("email", data);

      axios({
        method: "POST",
        url: "https://api.hiaido.com/public/api/demo",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          if (response?.data.status === true) {
            setIsLoader(false);
            toast.success(response?.data.message);
            setTimeout(() => {
              setData("");
            }, 2000);
          } else {
            setIsLoader(false);
            toast.error("Something went wrong!");
          }
        })
        .catch((err) => {
          setIsLoader(false);
          console.error("Error while saving data" + err);
          toast.error("Internal Server Error!");
        });
    }
  };

  const checkEmail = () => {
    var isValid = true;

    if (typeof data !== "undefined") {
      let lastAtPos = data.lastIndexOf("@");
      let lastDotPos = data.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          data.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          data?.length - lastDotPos > 2
        )
      ) {
        isValid = false;
        toast.error("Email is not valid");
      }
    }

    return isValid;
  };

  return (
    <Section
      className="pt-[5rem] -mt-[5.27rem]"
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative">
        <div className="relative z-1 max-w-[55rem] mx-auto text-center">
          <h1 className="h1 mt-[4rem] mb-6">
            The Next Generation &nbsp;&nbsp;
            <span className="inline-block relative">
              AI Powered{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
            <span className="mt-2 text-orange-500 inline-block relative">
              Cloud Automation Platform
            </span>
          </h1>
          <p className="body-1 max-w-6xl font-mono mx-auto font text-n-2 ">
            HIAIDO is a powerful AI platform designed to revolutionize your
            cloud operations, seamlessly automating tasks and amplifying
            efficiency. To make cloud management intuitive, we offer tailored
            solutions and ongoing innovation, redefining seamless cloud
            experiences. Experience efficiency like never before.
          </p>
          <p className="body-1 type1 font-mono max-w-2xl mx-auto mb-6 font-bold text-xs lg:text-2xl font text-n-2 lg:mb-8">
            {" "}
            "Welcome to the future of automation with HIAIDO"
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <input
              onChange={(e) => setData(e.target.value.replace(/\s/g, ""))}
              className="bg-white text-black mr-6 placeholder:p-2 h-8 rounded decoration-
               font-code placeholder:text-black p-2 w-64 "
              type="text"
              name="email"
              value={data}
              placeholder="email"
              required={true}
            />
            <Button type="submit">
              {isLoader ? <Loader /> : "Request Demo"}
            </Button>
          </div>
        </form>
      </div>
    </Section>
  );
};

export default Hero;
