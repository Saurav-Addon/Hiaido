import ButtonGradient from "./assets/svg/ButtonGradient";
import Landing from "./components/Landing";
import Hiring from './components/Hiring';
import  Pricing from "./components/Pricing";

import {Route , Routes} from 'react-router-dom'
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <div className=" overflow-hidden">
        <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/hiring" element={<Hiring/>} />
        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/pricing" element={<Pricing/>} />
        </Routes>
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
