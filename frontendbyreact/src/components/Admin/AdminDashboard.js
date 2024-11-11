import { CreditCard, Bell, Users, GraduationCap, Coins, ShieldCheck } from "lucide-react"
import { useNavigate } from "react-router"


export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-14 m-10 mt-3 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-10">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div onClick={() => navigate('payfees')} className="bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-2xl font-bold">Fees</h2>
            <CreditCard className="h-7 w-7 text-muted-foreground" color="#FF531A"/>
          </div>
          <p className="text-base text-muted-foreground">
            Manage student fees and payments
          </p>
        </div>
        <div onClick={() => navigate('addnotice')} className="bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-2xl font-bold">Notice</h2>
            <Bell className="h-7 w-7 text-muted-foreground" color="#FF531A"/>
          </div>
          <p className="text-base cursor-pointer text-muted-foreground">
            Manage and post important notices
          </p>
        </div>
        <div onClick={()=>{navigate("addfaculty")}} className="bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-2xl font-bold">Faculty</h2>
            <Users className="h-7 w-7 text-muted-foreground" color="#FF531A"/>
          </div>
          <p className="text-base  text-muted-foreground">
            Manage faculty members and staff
          </p>
        </div>
        <div onClick={()=>{navigate("student")}} className="bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-2xl font-bold">Students</h2>
            <GraduationCap className="h-7 w-7 text-muted-foreground" color="#FF531A"/>
          </div>
          <p className="text-base  text-muted-foreground">
            Manage student records and enrollments
          </p>
        </div>
        <div onClick={()=>{navigate("addcashier")}} className="bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-2xl font-bold">Cashier</h2>
            <Coins className="h-7 w-7 text-muted-foreground" color="#FF531A"/>
          </div>
          <p className="text-base  text-muted-foreground">
            Manage Cashiers member and staff
          </p>
        </div>
      </div>
    </div>
  )
}
