import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import './StudentAttendance.css'; // Ensure this CSS file exists or remove if not needed
import {BASE_URL} from './../../contants/Links'

// Register required chart.js components
Chart.register(ArcElement, Tooltip, Legend);
const attendanceDat = {
    Mathematics: 85,
    Phyics: 90,
    Chemistry: 75,
    Biology: 80
  };
const StudentAttendance = () => {
    const [attendanceData,setattendancedata] = useState(attendanceDat);
    const student_id = parseInt(localStorage.getItem("id"));
    useEffect(()=>{
        console.log("hdls")
        const fetchdata = async ()=>{
            try {
                const res = await fetch((BASE_URL+"/attendance/specificStudent"),{
                  method:"POST",
                  body:JSON.stringify({ "student_id": student_id}),
                  headers:{
                    'Content-Type': 'application/json', 
                  }
                });
                const data = await res.json();
                setattendancedata(data);
            } catch (e) {
              console.log(e);
            }
        }
            fetchdata();
        
    },[])
    const subjects = Object.keys(attendanceData);
    const percentages = Object.values(attendanceData);
    const hasData = subjects.length > 0;

    const data = {
        labels: subjects,
        datasets: [
            {
                data: percentages,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Corrected template literal syntax
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false, 
    };

    return (
        <div className="attendance-chart">
            <h3>Attendance Percentage by Subject</h3>
            {hasData ? (
                <Pie data={data} options={options} />
            ) : (
                <p>No attendance data available</p>
            )}
        </div>
    );
};

export default StudentAttendance;
