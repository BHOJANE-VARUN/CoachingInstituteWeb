import { ClipboardList, FileText, DollarSign, HelpCircle } from "lucide-react"
import { useNavigate } from "react-router"

const StudentDashboard =  ()=> {
  const cards = [
    {title:"Attendence",icon:ClipboardList,content:"check you current attendence",path:"studentattendance"},
    { title: "Test Results", icon: FileText, content: "Check your latest academic performance." ,path:"testresults"},
    { title: "Fees", icon: DollarSign, content: "Manage your tuition and other payments." ,path:"viewfees"},
    { title: "Notice", icon: HelpCircle, content: "Get latest Notice about you academic" ,path:"notices"},
  ]
  const navigate = useNavigate();
  return (
    <div className="p-10 w-full min-h-screen pt-10 bg-gray-100">
      <h1 className="text-5xl font-bold mb-16 text-center">Academic Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} onClick={()=> navigate(card.path)} className="hover:shadow-lg transition-shadow border-2 rounded-md p-5 cursor-pointer bg-white">
            <div className="flex flex-row items-center space-y-0 pb-2">
              <div className="text-2xl font-bold">{card.title}</div>
              <card.icon className="w-6 h-6 ml-auto text-gray-500" color="#FF531A" />
            </div>
            <div>
              <p className="text-lg text-gray-600">{card.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default StudentDashboard;