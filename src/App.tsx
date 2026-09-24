import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PublicSecret from "./pages/PublicSecret";
import { useEffect, useState } from "react";
import { initializeAuth } from "./services/authService";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    initializeAuth()
      .catch((error) => {
        console.error("Auth initialization failed", error);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, []);

  if (authLoading) {
    return <Loading />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard></Dashboard>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/s/:publicToken" element={<PublicSecret />} />
          <Route path="/about" element={<About></About>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
