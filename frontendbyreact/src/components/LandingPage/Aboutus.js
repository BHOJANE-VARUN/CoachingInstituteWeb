import { CheckCircle, GraduationCap } from "lucide-react"
import { MAIN_LOCATION, MAIN_NAME, OWNER } from "../../contants/Names";
import { Link } from "react-router-dom";


const Aboutus = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 w-[95%] m-9 mt-28">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 relative mb-8 md:mb-0">
          <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-orange-500 rounded-full opacity-20 z-0"></div>
          <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-blue-500 rounded-full opacity-20 z-0"></div>
          <img
            src="https://saicoachingcentre.com/assets/images/about-img.png"
            alt="Student with laptop"
            className="relative z-10 max-w-full h-auto"
          />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <h2 className="text-blue-600 font-bold mb-2 text-2xl">ABOUT US</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            We Have Best Quality Education
          </h1>
          <p className="text-gray-600 mb-6">
            '{MAIN_NAME} Coaching Centre' had been established in {MAIN_LOCATION} town 20 years ago. {OWNER},
            is the man , who piloted this organisation. At present, by the effort and hardwork of
            the man, with his team , the centre has crossed a figure of 1000 students. Here, highly
            qualified and experienced facilities ensure that each and every student is actively
            involved, by quoting real life case studies and examples.
          </p>
          <p className="text-gray-600 mb-6">
            We pay gratitude for your blessings and expect your visit.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center space-x-2">
              <CheckCircle className="text-orange-500" />
              <span>Hurry UP! Your bright future is calling you.</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="text-orange-500" />
              <span>Complete Projects and 100% placement assistance</span>
            </li>
          </ul>
          <Link to={"/signin"}>
          <button className="bg-orange-500 hover:bg-orange-600 text-white orangebutton">
            APPLY NOW
          </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Aboutus;