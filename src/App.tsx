import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PublicSecret from "./pages/PublicSecret";
import { useEffect } from "react";
import { initializeAuth } from "./services/authService";
import About from "./pages/About";

function App() {
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/s/:publicToken" element={<PublicSecret />} />
          <Route path="/about" element={<About></About>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
