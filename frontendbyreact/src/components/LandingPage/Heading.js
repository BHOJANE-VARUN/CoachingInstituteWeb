import React, { useState } from "react";
import { COMPANY_LOGO_URL } from "../../contants/Links";
import { MAIN_LOCATION, MAIN_NAME } from "../../contants/Names";
import { Link } from "react-router-dom";

function Heading() {
  const [Menu, setMenu] = useState(false);
  const handleScroll = (x) => {
    // Scroll to 500 pixels down from the top of the page
    window.scrollTo({
      top: x, // Change this value to scroll to a different position
      behavior: 'smooth' // This makes the scroll smooth
    });
  };
  const togglemenu = () => {
    setMenu(!Menu);
  };

  return (
    <div className="mx-5 h-24 fixed w-[97%] bg-white top-0 left-0 z-30 shadow-md">
      <nav className="w-[100%] 2xl:w-[100%] h-24 2xl:h-24 flex 2xl:flex  justify-evenly 2xl:justify-evenly items-center 2xl:items-center">
        <div className="flex 2xl:flex w-[38%] 2xl:w-[20%] h-20 2xl:h-20 justify-center 2xl:justify-center items-center 2xl:items-center">
          <img
            className="w-32 2xl:w-32 h-20 2xl:h-20"
            src={COMPANY_LOGO_URL}
            alt="logo"
          />
          <span className="text-3xl w-fit 2xl:text-3xl  2xl:w-[30%] font-serif 2xl:font-serif text-blue-900 mt-3">
            {MAIN_NAME}
          </span>
        </div>

        {/* Menu Items */}
        <ul
          className={`${
            Menu ? "flex" : "hidden"
          } flex-col xl:flex-row xl:flex justify-evenly  items-center font-bold ml-0 xl:ml-0 absolute xl:static top-24 left-0 w-full xl:w-[40%] bg-white xl:bg-transparent   `}
        >
          <li onClick={()=> handleScroll(0)} className="p-4 2xl:p-0 text-xl cursor-pointer">Home</li>
          <li onClick={()=> handleScroll(900)} className="p-4 2xl:p-0 text-xl cursor-pointer">Courses</li>
          <li onClick={()=> handleScroll(2000)} className="p-4 2xl:p-0 text-xl cursor-pointer">About us</li>
          <li onClick={()=>handleScroll(2400)} className="p-4 2xl:p-0 text-xl cursor-pointer">Contact us</li>
          <Link to={"/signin"}><li className="p-4 2xl:p-0 text-xl cursor-pointer">Sign In</li></Link>
        </ul>
        <div className="hidden w-[20%] xl:w-[20%] xl:flex justify-center xl:justify-center">
          <Link to={"/signin"}>
          <button className="text-center 2xl:text-center h-14 2xl:h-14 w-40 2xl:w-40 rounded-md 2xl:rounded-md color text-white 2xl:text-white text-lg 2xl:text-lg font-bold 2xl:font-bold orangebutton">
            Apply Now
          </button>
          </Link>
        </div>

        {/* Toggle Menu Button */}
        <button
          onClick={togglemenu}
          className="xl:hidden flex flex-col justify-center items-center w-[40px] h-[40px] color text-white rounded-md"
        >
          {Menu ? (
            // Display "X" when the menu is open
            <div className="text-2xl font-bold">X</div>
          ) : (
            // Display three horizontal lines when the menu is closed
            <>
              <div className="w-6 h-[3px] bg-white mb-[5px]"></div>
              <div className="w-6 h-[3px] bg-white mb-[5px]"></div>
              <div className="w-6 h-[3px] bg-white"></div>
            </>
          )}
        </button>
      </nav>
    </div>
  );
}

export default Heading;
