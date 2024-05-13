import React, { useEffect, useState } from "react";
import { hiaido } from "../assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
		document.title = "Hiaido | Forgot-Password";
	  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const url =  "https://api.hiaido.com/public/api/sendVerificationCode";

    const bodyFormData = new URLSearchParams();
    bodyFormData.append("email", email);

    axios({
      method: "POST",
      url: url,
      data: bodyFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        if (response?.data?.status) {
          toast(response?.data?.message);
          // setTimeout(() => {
          navigate("/otp", { state: response?.data?.data.email });
          // }, 2000);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
      });
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className=" flex justify-center items-center lg:flex w-full md:w-1/2 xl:w-2/3 h-screen">
        <div>
          <img src={hiaido} alt="logo" className="logo" />
        </div>
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold text-orange-500">
            Verify Your Account
          </h1>

          <form className="mt-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border 
                focus:border-blue-500 focus:bg-white focus:outline-none text-orange-500"
                autoFocus
                required
              />
            </div>
            <button
              type="submit"
              className="w-full block bg-orange-500 hover:bg-yellow-500 focus:bg-orange-500 hover:text-black text-white
              text-center  font-semibold rounded-full
            px-4 py-3 mt-6"
            >
              Verify Email
            </button>
          </form>
          <hr className="my-6 border-gray-300 w-full" />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
