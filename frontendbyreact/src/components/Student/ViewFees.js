import { useEffect, useState } from "react"
import { BASE_URL } from "../../contants/Links";

  
  const ViewFees = ()=> {
    const id = parseInt(localStorage.getItem("id"));
    const [data,setdata] = useState(null);
    useEffect(()=>{
        const fetchdata = async ()=>{
            const response = await fetch(BASE_URL+"/fees/checkFees",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({ "student_id": id }),
            });
            const rawdata = await response.json();
            
            setdata(rawdata);
        }
        fetchdata();
    },[])
    if(!data)
    {
        return <div>Loading....</div>
    }
    const remainingFees = data.totalFees - data.paidFees
    const paymentPercentage = (data.paidFees / data.totalFees) * 100
    
    console.log(data);
    return (
    
      <div className="w-full mt-20 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Fee Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Total Fees:</span>
              <span className="text-lg font-bold text-gray-800">₹{data?.totalFees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Fees Paid:</span>
              <span className="text-lg font-bold text-green-600">₹{data.paidFees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Remaining Fees:</span>
              <span className="text-lg font-bold text-red-600">₹{remainingFees.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Payment Progress:</span>
                <span className="text-sm font-medium text-gray-600">{paymentPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${paymentPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  export default ViewFees;