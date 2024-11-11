import { PencilRuler } from "lucide-react"
import { useNavigate } from "react-router"

const Course = ({ className, instructor, icon }) =>{
  const navigate = useNavigate();
  return  (
  <div onClick={()=> navigate("/signin")} className="hover:shadow-lg transition-shadow rounded-lg course border-2 border-black">
    <div className="p-1">
      <div className="flex items-center space-x-4">
        {icon || <PencilRuler className="w-9 h-9 text-orange-500" />}
        <div>
          <h3 className="font-bold text-xl text-navy-900">{className}</h3>
          <p className="text-base text-gray-500 font-semibold">Classes by {instructor}</p>
        </div>
      </div>
    </div>
  </div>
)
}

const courses = [
  { className: "Engineering Math I", instructor: "Deepraj Autade & His Team" },
  { className: "Fundamental Data Structure", instructor: "Varun Bhojane & His Team" },
  { className: "Japanese Language I", instructor: "Rohit Bargal & His Team" },
  { className: "English Proficiency", instructor: "Deepraj Autade & His Team" },
  { className: "German Proficiency I", instructor: "Harsh Badhe & His Team" },
  { className: "Advance Data Structure", instructor: "Varun Bhojane & His Team" },
  { className: "Cloud Computing", instructor: "Jagruti Bangar & His Team" },
  { className: "UI/UX", instructor: "Tanmay Achare & His team" },
  { className: "Web Development", instructor: "Vishal Autade & His Team" },
]

const Courses = ()=> {
  return (
    <div className="py-12 px-4 bg-white mt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-blue-600 font-bold mb-3 text-2xl">COURSE CATEGORY</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-center text-navy-900 mb-10">Explore Popular Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Course key={index} className={course.className} instructor={course.instructor} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Courses;