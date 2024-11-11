import {  Route, Routes, useLocation } from 'react-router-dom';
import "./App.css";
import StudentDashboard from "./components/Student/StudentDashboard";
import Signin from './components/Auth/Signin';
import AdminDashboard from './components/Admin/AdminDashboard';
import CashierDashboard from './components/Casher/CashierDashboard';
import FacultyDashboard from './components/Faculty/FacultyDashboard';
import AttendancePage from './components/Faculty/AttendenceFill';
import AddStudent from './components/Admin/AddStudent';
import StudentNotices from './components/Student/Notices';
import StudentAttendance from './components/Student/StudentAttendance';
import Body from './components/LandingPage/Body';
import Aboutus from './components/LandingPage/Aboutus';
import Heading from './components/LandingPage/Heading';
import LoggedHeading from './components/LandingPage/LoggedHeading';
import Courses from './components/LandingPage/Courses';
import CashierList from './components/Admin/AddCashier';
import Addfaculty from './components/Admin/AddFaculty';
import ViewFees from './components/Student/ViewFees';
import AddNotices from './components/Common/AddNotices';
import PayFees from './components/Common/PayFees';
import TestResults from './components/Student/TestResults';
import SubjectResults from './components/Faculty/ViewAllResult';
import StudentMarksEntry from './components/Faculty/FillResult';
import ViewAttendacne from './components/Faculty/ViewAttendance';
import SubjectCards from './components/Faculty/SubjectResults';



function App() {
  const location = useLocation();
  const noHeadingPaths = ['/','//'];
  return (
    <div>
      {noHeadingPaths.includes(location.pathname.toLowerCase()) && <Heading />}
      {(!noHeadingPaths.includes(location.pathname.toLowerCase()) && location.pathname!="/signin" ) && <LoggedHeading />}
      <Routes>
        <Route path="/" element={<><Body /><Courses /><Aboutus/></>} />
        <Route path="/signin" element={<Signin />} />
        <Route path='/student' element={<StudentDashboard/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/cashier' element={<CashierDashboard/>}/>
        <Route path='/faculty' element ={<FacultyDashboard/>}/>
        <Route path='/attendence' element={<AttendancePage/>}/>
        <Route path='/admin/student' element={<AddStudent/>}/>
        <Route path='/student/notices' element={<StudentNotices/>}/>
        <Route path='/student/studentattendance' element={<StudentAttendance/>}/>  
        <Route path='/admin/addcashier' element={<CashierList/>}/>
        <Route path='/admin/addfaculty' element={<Addfaculty/>}/>
        <Route path='/admin/payfees' element={<PayFees/>}/>
        <Route path='/admin/addnotice' element={<AddNotices/>}/>
        <Route path='/student/viewfees' element={<ViewFees/>}/>
        <Route path='/cashier/addnotice' element={<AddNotices/>}/>
        <Route path='/cashier/payfees' element={<PayFees/>}/>
        <Route path='/faculty/attendancefill' element={<AttendancePage/>}/>
        <Route path='/faculty/addnotice' element={<AddNotices/>}/>
        <Route path='/student/testresults' element={<TestResults/>}/>
        <Route path='/faculty/viewallresult' element={<SubjectResults/>}/>
        <Route path='/faculty/fillresult' element={<StudentMarksEntry/>}/>
        <Route path='/faculty/viewattendance' element={<ViewAttendacne/>}/>
        <Route path='/faculty/subjectresults' element={<SubjectCards/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
