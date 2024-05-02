import ButtonGradient from "./assets/svg/ButtonGradient";
import Landing from "./components/Landing";
import Hiring from './components/Hiring';
import  Pricing from "./components/Pricing";

import {Route , Routes} from 'react-router-dom'
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import OtpScreen from "./components/OtpScreen";
import ResetPassword from "./components/ResetPassword";
import ComingSoon from "./components/ComingSoon";
import CreatePassword from "./components/CreatePassword";

const App = () => {
  return (
    <>
      <div className=" overflow-hidden">
        <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/hiring" element={<Hiring/>} />
        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/pricing" element={<ComingSoon/>} />
        <Route path="/beta-pricing" element={<Pricing/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/otp" element={<OtpScreen numberOfDigits={6}/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/create-password"  element={<CreatePassword/>}/>
        </Routes>
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
