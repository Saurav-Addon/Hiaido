import React, { useRef, useState } from "react";
import { hiaido } from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const OtpScreen = ({ numberOfDigits = 6 }) => {
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState(null);
  const otpBoxReference = useRef([]);

  const navigate = useNavigate();

  const { state } = useLocation();

  function handleChange(value, index) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);
    setOtpError("");

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }

    if (newArr.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.every((digit) => digit !== "")) {
      setOtpError(""); // Clear any previous error messages

      try {
        const url ="https://api.hiaido.com/public/api/postVerificationCode";
        const bodyFormData = new URLSearchParams();
        bodyFormData.append("email", state); // Replace "state" with the actual email state variable
        bodyFormData.append("verification_code", parseInt(otp.join("")));

        const response = await axios({
          method: "POST",
          url: url,
          data: bodyFormData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if (response?.data?.status) {
          toast.success(response?.data?.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error(response?.data?.message);
        }
      } catch (err) {
        console.error(err);
        toast.error(err);
      }
    } else {
      setOtpError("Please Enter OTP!"); // Display error if any digit is empty
    }
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
            One Time Password (OTP)
          </h1>

          <form method="POST" onSubmit={handleSubmit}>
            <div className="otp mt-6">
              <input type="hidden" name="email" value={state} />
              <div className="flex items-center gap-1">
                {otp.map((digit, index) => (
                  <input
                    type="number"
                    key={index}
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                    ref={(reference) =>
                      (otpBoxReference.current[index] = reference)
                    }
                    className={`border w-15 h-auto text-orange-500 text-center p-3 rounded-md block bg-white focus:border-2
                 focus:outline-none appearance-none`}
                  />
                ))}
              </div>

              <p
                className={`text-sm text-red-500 mt-4 ${
                  otpError ? "error-show" : ""
                }`}
              >
                {otpError}
              </p>

              <button
                type="submit"
                className="w-full block bg-orange-500 hover:bg-yellow-500 text-center
              focus:bg-orange-500 hover:text-black text-white font-semibold rounded-full
            px-4 py-3 mt-6"
              >
                Verify OTP
              </button>
            </div>
          </form>
          <hr className="my-6 border-gray-300 w-full" />
        </div>
      </div>
    </section>
  );
};

export default OtpScreen;
