import Header from "../components/Header";
import email from "../assets/images/email.png";
import phone from "../assets/images/phone.png";
import admin from "../assets/images/admin.png";
import place from "../assets/images/place.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./utils/Loader";
import Button from "./Button";

const ContactUs = () => {
  const navigate = useNavigate();

  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    last_name: "",
    first_name: "",
    messages: "",
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const checkEmail = () => {
    var isValid = true;
    let err = {};
    if (!formData.first_name || !formData?.first_name?.trim()) {
      isValid = false;
      err["first_name_err"] = "Please enter first name!";
    }

    if (!formData.last_name || !formData?.last_name?.trim()) {
      isValid = false;
     
      err["last_name_err"] = "Please enter last name!";
    }

    if (!formData.email || !formData?.email?.trim()) {
      isValid = false;
      err["email_err"] = "Please enter email!";
    } else if (typeof formData.email !== "undefined") {
      let lastAtPos = formData.email.lastIndexOf("@");
      let lastDotPos = formData.email.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          formData.email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          formData.email?.length - lastDotPos > 2
        )
      ) {
        isValid = false;
        err["email_err"] = "Email is not valid!";
      }
    }
    setError(err);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkEmail()) {
      setIsLoader(true);
      const bodyFormData = new FormData();
      bodyFormData.append("email", formData.email);
      bodyFormData.append("first_name", formData.first_name);
      bodyFormData.append("last_name", formData.last_name);
      bodyFormData.append("messages", formData.messages);

      axios({
        method: "POST",
        url: "https://apihiaido.addonwebtech.com/public/api/contactUsData",
        data: bodyFormData,
      })
        .then((response) => {
          if (response?.data.status === true) {
            setIsLoader(false);
            toast.success(response?.data.message);
            refreshPage();
            setTimeout(() => {
              navigate("/");
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
          refreshPage();
          return;
        });
    }
  };

  const refreshPage = () => {
    setFormData({
      email: "",
      last_name: "",
      first_name: "",
      messages: "",
    });
  };
  return (
    <>
      <Header />
      <div className="relative h-auto isolate bg-white">
        <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-32">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                <svg
                  className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                      width="200"
                      height="200"
                      x="100%"
                      y="-1"
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M130 200V.5M.5 .5H200" fill="none"></path>
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    strokeWidth="0"
                    fill="white"
                  ></rect>
                  <svg
                    x="100%"
                    y="-1"
                    className="overflow-visible fill-gray-50"
                  >
                    <path d="M-470.5 0h201v201h-201Z" strokeWidth="0"></path>
                  </svg>
                  <rect
                    width="100%"
                    height="100%"
                    strokeWidth="0"
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  ></rect>
                </svg>
              </div>
              <h2 className="text-3xl font-thin tracking-tight  text-gray-900">
                Contact Us
              </h2>
              <p className="mt-6 font-thin text-lg leading-8 text-gray-600">
                Need to get in touch with us ? Either fill out the form with
                your inquiry or find the contact details below.{" "}
              </p>
              <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="font-thin sr-only">Email</span>
                  </dt>
                  <dd>
                    <a class=" text-2xl gap-2 items-start justify-start flex flex-col">
                      <span className="flex gap-3  items-center">
                        {" "}
                        <span>
                          {" "}
                          <img src={admin} height={25} width={25} />
                        </span>{" "}
                        <h1 className=" text-sm  font-sans">
                          Karthik Thandapani
                        </h1>
                      </span>
                      <a
                        href="mailto:ceo@hiaido.com"
                        className="flex gap-3  items-center"
                      >
                        {" "}
                        <span>
                          {" "}
                          <img src={email} height={25} width={25} />
                        </span>{" "}
                        <h1 className=" text-sm font-sans">ceo@hiaido.com</h1>
                      </a>
                      <span className="flex gap-3 items-center">
                        {" "}
                        <span>
                          {" "}
                          <img src={phone} height={25} width={25} />
                        </span>{" "}
                        <h1 className="text-sm  font-sans">+91 8939979393</h1>
                      </span>
                      <span className="flex gap-3 items-center">
                        <span>
                          <img height={25} width={25} src={place} />
                        </span>
                        <h1 className=" text-sm  font-sans">Chennai, India</h1>
                      </span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <form
            className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-32"
            onSubmit={handleSubmit}
          >
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full bg-white rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                     <div className='text-red-400'>{error.first_name_err}</div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      id="last-name"
                      autoComplete="family-name"
                      className="block bg-white w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
                       <div className='text-red-400'>{error.last_name_err}</div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      id="email"
                      autoComplete="email"
                      className="block bg-white w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                       <div className='text-red-400'>{error.email_err}</div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      rows="4"
                      className="block bg-white w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="messages"
                      value={formData.messages}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button type="submit" className=" mt-8 text-n-8 lg:flex">
                  {isLoader ? <Loader /> : "Send Message"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ContactUs;
