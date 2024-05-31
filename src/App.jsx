import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Authentication from "./pages/EmployeeMaster";
import Build from "./pages/Build";
import Settings from "./pages/Settings";
import Stroage from "./pages/Notification";
import LoginScreen from "./pages/Login/LoginScreen";
import PrivateRoutes from "./Utils/PrivateRoutes";
import Employee from "./pages/EmployeeMaster";
import Notification from "./pages/Notification";
import Project from "./pages/Project";
import ComponentMaster from "./pages/ComponentMaster";
import CreateNewBug from "./pages/CreateNewBug";
import ViewBug from "./pages/ViewBug";
import Bug from "./pages/Bug";
import RoleMaster from "./pages/RoleMaster";
import BugMaster from "./pages/BugMaster";
import EmployeeMaster from "./pages/EmployeeMaster";
import ViewEmployee from "./pages/ViewEmployee";
function App() {
  const auth = localStorage.getItem("token");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<RootLayout />} path="/Home" index />
            <Route
              element={
                <RootLayout>
                  <Authentication />
                </RootLayout>
              }
              path="/Home"
            />
            <Route
              element={
                <RootLayout>
                  <Dashboard />
                </RootLayout>
              }
              path="/"
            />
            <Route
              element={
                <RootLayout>
                  <ViewEmployee />
                </RootLayout>
              }
              path="/viewemployee/:id"
            />

            <Route
              element={
                <RootLayout>
                  <EmployeeMaster />
                </RootLayout>
              }
              path="/employee"
            />
            <Route
              element={
                <RootLayout>
                  <ComponentMaster />
                </RootLayout>
              }
              path="/component"
            />
            <Route
              element={
                <RootLayout>
                  <RoleMaster />
                </RootLayout>
              }
              path="/rolemaster"
            />
            <Route
              element={
                <RootLayout>
                  <BugMaster />
                </RootLayout>
              }
              path="/bugmaster"
            />

            <Route
              element={
                <RootLayout>
                  <Bug />
                </RootLayout>
              }
              path="/bug"
            />

            <Route
              element={
                <RootLayout>
                  <Project />
                </RootLayout>
              }
              path="/project"
            />
            <Route
              element={
                <RootLayout>
                  <Notification />
                </RootLayout>
              }
              path="/notification"
            />
          </Route>

          <Route
            path="login"
            element={auth ? <Navigate to="/Home" /> : <LoginScreen />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
