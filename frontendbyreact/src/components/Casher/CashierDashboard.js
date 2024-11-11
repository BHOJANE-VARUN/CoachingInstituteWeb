import { CreditCard, Bell } from "lucide-react"
import { useNavigate } from "react-router"

export default function CashierDashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl mt-4 font-bold text-center mb-10">Cashier Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div onClick={() => navigate('payfees')}  className="bg-white shadow rounded-lg p-5 cursor-pointer hover:shadow-lg">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-3xl font-bold">Fees</h2>
            <CreditCard className="h-10 w-10 text-muted-foreground" color="#FF531A"/>
          </div>
          <div>
            <p className="text-base font-semibold  text-muted-foreground">
              Process student fees and handle transactions
            </p>
          </div>
        </div>
        <div onClick={() => navigate('addnotice')}  className="bg-white shadow rounded-lg p-5 cursor-pointer hover:shadow-lg">
          <div className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-3xl font-bold">Notice</h2>
            <Bell className="h-10 w-10 text-muted-foreground" color="#FF531A"/>
          </div>
          <div>
            <p className="text-base font-semibold  text-muted-foreground">
              View and post important financial notices
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
