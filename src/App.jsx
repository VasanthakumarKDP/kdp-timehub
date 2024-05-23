import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Authentication from "./pages/Employee";
import Build from "./pages/Build";
import Settings from "./pages/Settings";
import Stroage from "./pages/Notification";
import LoginScreen from "./pages/Login/LoginScreen";
import PrivateRoutes from "./Utils/PrivateRoutes";
import Employee from "./pages/Employee";
import Notification from "./pages/Notification";
import Project from "./pages/Project";

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
                  <Employee />
                </RootLayout>
              }
              path="/employee"
            />

            <Route
              element={
                <RootLayout>
                  <Build />
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
