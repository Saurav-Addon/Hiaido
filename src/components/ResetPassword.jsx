import React, { useState } from "react";
import { hiaido } from "../assets";
import Eye from "../assets/images/Vector.png";
import EyeOff from "../assets/images/Vector-1.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Resetshowpassword = () => {
  const [showpassword, setShowpassword] = React.useState(false);
  const [showcfpassword, setShowCfpassword] = React.useState(false);

  const userId = window.location.href.split("=")[1];


  const navigate = useNavigate();

  const [passErr, setPassErr] = useState("");

  const [password, setPassword] = useState({
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleClick = () => {
    setShowpassword(!showpassword);
  };
  const handleCfClick = () => {
    setShowCfpassword(!showcfpassword);
  };

  const checkPassword = (pass1, pass2) => {
    return pass1.toLowerCase() === pass2.toLowerCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkPassword(password.new_password, password.confirm_password)) {
      setPassErr("");
      const url = "https://apihiaido.addonwebtech.com/public/api/resetPassword";

      const bodyFormData = new URLSearchParams();
      bodyFormData.append("new_password", password.new_password);
      bodyFormData.append("confirm_password", password.confirm_password);
      bodyFormData.append("id", userId);
      axios({
        method: "POST",
        url: url,
        data: bodyFormData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          console.log(response)
          if (response?.data?.status) {
            toast.success(response?.data?.message);
            setPassword({
              new_password: "",
              confirm_password:"",
            });

            setTimeout(() => {
              navigate('/login')
            },2000)
          } else {
            toast.error(response?.data?.message)
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(err);
        });
    } else {
      setPassErr("Password and Confirm Password Mismatched!");
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
            Reset Your Password
          </h1>

          <form
            className="mt-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="email" />
            <div>
              <label className="block text-gray-700">New Password</label>
              <div className="relative">
                <input
                  type={showpassword ? "text" : "password"}
                  name="new_password"
                  value={password.new_password}
                  onChange={handleChange}
                  placeholder="Enter New password"
                  className="w-full relative px-4 py-3 text-orange-500 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  required
                />

                <div
                  onClick={handleClick}
                  class="absolute inset-y-0 right-5   
                    flex items-center"
                >
                  {showpassword ? (
                    <img src={Eye} alt="Eye" width={25} height={25} />
                  ) : (
                    <img src={EyeOff} alt="Eye" width={25} height={25} />
                  )}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showcfpassword ? "text" : "password"}
                  name="confirm_password"
                  value={password.confirm_password}
                  onChange={handleChange}
                  placeholder="Retype confirm password"
                  className="w-full relative px-4 py-3 text-orange-500 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  required
                />

                <div
                  onClick={handleCfClick}
                  class="absolute inset-y-0 right-5   
                    flex items-center"
                >
                  {showcfpassword ? (
                    <img src={Eye} alt="Eye" width={25} height={25} />
                  ) : (
                    <img src={EyeOff} alt="Eye" width={25} height={25} />
                  )}
                </div>
              </div>

              <p
                className={`text-sm text-red-500 mt-4 ${
                  passErr ? "error-show" : ""
                }`}
              >
                {passErr}
              </p>
            </div>
            <button
              type="submit"
              className="w-full block bg-orange-500 hover:bg-yellow-500 focus:bg-orange-500 hover:text-black text-white text-center font-semibold rounded-full
          px-4 py-3 mt-6"
            >
              Submit
            </button>
         
          </form>

          <hr className="my-6 border-gray-300 w-full" />
        </div>
      </div>
    </section>
  );
};

export default Resetshowpassword;
