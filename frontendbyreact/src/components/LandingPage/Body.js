
import { Link } from "react-router-dom";
import { MAIN_NAME } from "../../contants/Names";

const handleScroll = (x) => {
  // Scroll to 500 pixels down from the top of the page
  window.scrollTo({
    top: x, // Change this value to scroll to a different position
    behavior: 'smooth' // This makes the scroll smooth
  });
};
const Header = () => (
  <header className="text-blue-600 font-bold mb-10">
    <div className="flex items-center">
      <span className="mr-2 text-2xl">WELCOME TO {MAIN_NAME}</span>
    </div>
  </header>
);

const MainContent = () => (
  
  <div>
    <Header />
    <div className="mb-8">
      <h1 className="text-4xl md:text-7xl font-bold text-navy-900 mb-10">
        Get Class From <br /> Top Instructor
        <img className="w-80 h-6 ml-36" src="https://saicoachingcentre.com/assets/images/banner-line.png" alt="orange line"/>
      </h1>
      <p className="text-gray-600 mb-10 max-w-md ">
        We strive hard to add value to student's learning constantly and are
        dedicated to the academic growth of each individual student. The
        commitment of the teacher to draw best out of weak students has been an
        important factor contributing to the trust of our classes.
      </p>
      <div className="flex space-x-4">
        <button onClick={()=> handleScroll(900)} className="color text-white orangebutton font-bold">
          EXPLORE COURSES
        </button>
        <Link to={"/signin"}>
        <button
          variant="outline"
          className="border-navy-900 text-navy-900 blackbutton bg-black text-white"
        >
          APPLY NOW
        </button>
        </Link>
      </div>
    </div>
  </div>
);

const ImageSection = () => (
  <div className="relative mt-10">
    <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-orange-500 rounded-full opacity-20 z-0"></div>
    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500 rounded-full opacity-20 z-0"></div>
    <img
      src="https://saicoachingcentre.com/assets/images/banner-img.png"
      alt="Student with books"
      className="relative z-10 rounded-lg shadow-xl max-w-full h-auto"
    />
  </div>
);

const Body = () => {
  return (
  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 p-8 m-10 mt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <MainContent />
          </div>
          <div className="w-full md:w-1/2 h-full">
            <ImageSection />
          </div>
        </div>
      </div>
    </div>
  
  );
};
export default Body;
