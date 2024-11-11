import { useEffect, useState } from "react"
import { Search, User, UserPlus } from "lucide-react"
import {BASE_URL} from "./../../contants/Links"



export default function ViewStudents() {
  const [students,setstudents] = useState([]);
  useEffect(()=>{
    const fetchdata = async ()=>{
      const responce = await fetch((BASE_URL+"/allStudents"));
      const data = await responce.json();
      setstudents(data);
    }
    fetchdata();
  },[])
  const [searchTerm, setSearchTerm] = useState("")
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.includes(searchTerm)
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewStudent(prev => ({ ...prev, [name]: value }))
  }

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
        await fetch((BASE_URL+"/addStudent"),{
          method:"POST",
          body:JSON.stringify({ "name": newStudent.name, "email": newStudent.email, "password":newStudent.password}),
          headers:{
            'Content-Type': 'application/json', 
          }
        });

    } catch (e) {
      console.log(e);
    }
    setNewStudent({ name: "", email: "", password: ""})
    setIsDialogOpen(false)
    window.location.reload();
  }
 
  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <div className="flex flex-row items-center justify-between mb-4">
        <div className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6" />
          Student List
        </div>
        <button 
          onClick={() => setIsDialogOpen(true)} 
          className="flex items-center gap-2 color text-white px-4 py-2 rounded"
        >
          <UserPlus className="h-4 w-4" />
          Add Student
        </button>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={newStudent.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={newStudent.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block font-medium">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={newStudent.password}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <button type="submit" className="w-full color text-white p-2 rounded">Add Student</button>
            </form>
            <button onClick={() => setIsDialogOpen(false)} className="mt-4 w-full text-center text-red-600">Cancel</button>
          </div>
        </div>
      )}

      <div className="mb-4 relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, roll number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div className="rounded-md border border-gray-300">
        <div className="grid grid-cols-2 font-semibold p-2 bg-gray-100">
          <div>Name</div>
          <div>Roll No</div>
        </div>
        <div>
          {filteredStudents.map((student) => (
            <div key={student.id} className="grid grid-cols-2 p-2 border-t border-gray-300">
              <div className="font-medium">{student.name}</div>
              <div>{student.id}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}