import aws from '../assets/images/aws.png'
import Heading from "./Heading";
import Section from "./Section";
import azure from '../assets/images/azure.png';
import gcp from '../assets/images/gcp.png'
import '../index.css'
import email from '../assets/images/email.png';
import phone from '../assets/images/phone.png';
import admin from '../assets/images/admin.png';
import place from '../assets/images/place.png'
import { toast } from "react-toastify";
import { useState } from 'react';
import axios from 'axios';
import Loader from './utils/Loader';
import Button from './Button';
const Benefits = () => {

  const [isLoader,setIsLoader] = useState(false);

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
      [name]: value.replace(/\s/g, ""),
    });
  };

  const checkEmail = () => {
    var isValid = true;

    if(!formData.email || !formData.email.trim()){
      isValid = false;
      toast.error('Please enter Email!')
    }

    if (typeof formData.email !== "undefined") {
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
        toast.error("Email is not valid");
      }
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(checkEmail()) {
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
    }).then((response) => {
        if (response?.data.status === true) {
          setIsLoader(false);
          toast.success(response?.data.message);
          refreshPage();
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
    <Section id="features">

      
       <div className="container relative z-2">
       <div className="flex font-bold  flex-col  flex-wrap justify-center items-center mb-8">
        <p className='text-white font-Bungee lg:text-5xl'> Build Faster, Build Better, Build With AI</p>
        <p className='text-white type2 mt-2 lg:text-3xl '> automate everything, almost, literally...</p>
        </div>
        <Heading
          className="md:max-w-md p-8 lg:max-w-2xl"
          title="Our Cloud Partners"
        /> 
         

        <div className="flex flex-wrap justify-center gap-10 mb-10">
        
            <img src={aws} height={30} width={85}  alt="aws"/>
            <img src={azure} alt="azure"/>
            <img src={gcp} alt="gcp"/>
        </div>
        <div className="relative h-auto isolate bg-n-8">
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative bg-n-8 px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-32">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden  lg:w-1/2">
                <svg
                  class="absolute inset-0 h-full w-full  "
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
                    stroke-width="0"
                    fill="white"
                  ></rect>
                  <svg x="100%" y="-1" class="overflow-visible ">
                    <path d="M-470.5 0h201v201h-201Z" stroke-width="0"></path>
                  </svg>
                  <rect
                    width="100%"
                    height="100%"
                    stroke-width="0"
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  ></rect>
                </svg>
              </div>
              <h2 class="text-3xl font-semibold tracking-tight  text-white">
                Contact Us
              </h2>
              <p class="mt-6 font-thin text-lg leading-8 text-white">
                Need to get in touch with us ? Either fill out the form with
                your inquiry or find the contact details below.{" "}
              </p>
              <dl class="mt-10 space-y-4 text-base leading-7 text-white">
                <div class="flex gap-x-4">
                  <dt class="flex-none">
                    <span class="font-thin sr-only ">Email</span>
                  </dt>
                  <dd>
                    <a
                      class=" text-2xl gap-2 items-start justify-start flex flex-col "
                    >
                      <span  className="flex gap-3  items-center"> <span> <img src={admin} height={25} width={25} /></span>  <h1 className=" text-sm  font-sans">Karthik Thandapani</h1></span>
                      <a  href='mailto:ceo@hiaido.com' className="flex gap-3  items-center"> <span> <img src={email} height={25} width={25} /></span>  <h1 className=" text-sm font-sans">ceo@hiaido.com</h1></a>
                      <span  className="flex gap-3 items-center"> <span> <img src={phone}  height={25} width={25} /></span> <h1 className="text-sm  font-sans" >+91 8939979393</h1></span>
                      <span className="flex gap-3 items-center"><span><img height={25} width={25} src={place}/></span><h1 className=" text-sm  font-sans">Chennai, India</h1></span>
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
                    className="block text-sm font-semibold leading-6 text-white"
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
                      required= {true}
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-semibold leading-6 text-white"
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
                      required= {true}
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-white"
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
                      required= {true}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 text-white"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      rows="4"
                      className="block bg-white w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="messages"
                      required= {true}
                      value={formData.messages}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
              <Button type="submit" className=" mt-8 text-n-1 lg:flex">
              {isLoader ? <Loader/> : "Send Message"}
            </Button>
              </div>
            </div>
       
          </form>
        </div>
      </div>
      </div>
    </Section>
  );
};

export default Benefits;
