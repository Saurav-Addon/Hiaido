import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { NavLink } from "react-router-dom";

import { hiaido } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex  md:gap-4 items-center mt-4 mb-2 px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
          <NavLink className="block w-[12rem] xl:mr-8" to="/">
            <img src={hiaido} alt="hiaido" />
          </NavLink>

          <nav
            className={`${
              openNavigation ? "flex" : "hidden"
            } fixed top-[7rem] left-0 right-0 bottom-0  lg:static lg:flex  lg:bg-transparent`}
          >
            <div className="relative  z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
              {navigation.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  onClick={handleClick}
                  className={`block relative font-code text-2xl  text-n-1 transition-colors hover:text-color-1 ${
                    item.onlyMobile ? "lg:hidden" : ""
                  } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                    item.to === pathname.hash
                      ? "z-2 lg:text-n-1"
                      : "lg:text-n-1/50"
                  } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                >
                  {item.title}
                </NavLink>
              ))}
            </div>

            <HamburgerMenu />
          </nav>

          <NavLink
            to="/hiring"
            className=" hidden mr-8 fon text-n-1/50 transition-colors hover:text-n-1 lg:block"
          >
            Hiring
          </NavLink>
          <NavLink
            to="/contact-us"
            className=" hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/Pricing"
            className=" hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
          >
            Pricing
          </NavLink>
        </div>
        <div className="px-5 flex items-center justify-center gap-8">
          <Button className="hidden lg:flex" href="/login">
            Sign In
          </Button>

          <Button
            className="ml-auto lg:hidden"
            px="px-3"
            onClick={toggleNavigation}
          >
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
