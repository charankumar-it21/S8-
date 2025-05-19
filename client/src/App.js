import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Layout } from "./components/layout/layout";
import StudentHomepage from "./pages/student/studenthome";
import Studentprofiles from "./pages/faculty/facultystudentprofile";
import PSDetails from "./pages/student/pslevel";
import FullStack from "./pages/student/fullstack";
import Facultyfullstackdetails from "./pages/faculty/facultyfullstackdetails";
import Facultytechnical from "./pages/faculty/facultytechnical";
import Home from "./pages/admin/home";
import Adddetails from "./pages/admin/adddetails";
import Login from "./pages/login";
import ApproveAchievements from "./pages/approveachievements";
import AddAchievements from "./components/achievements/addnewachievements";

function AppLayout() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="approve-achievements"
              element={<ApproveAchievements />}
            />
            <Route path="/student-home" element={<StudentHomepage />} />
            <Route path="/academic-details" element={<PSDetails />} />
            <Route path="/achievements-details" element={<FullStack />} />
            <Route path="/student-profiles" element={<Studentprofiles />} />
            <Route
              path="/students-achievements-details"
              element={<Facultyfullstackdetails />}
            />
            <Route
              path="/academic-performance"
              element={<Facultytechnical />}
            />
            <Route path="/admin-home" element={<Home />} />
            <Route path="/add-details" element={<Adddetails />} />
            <Route path="/add-new-achievements" element={<AddAchievements />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
