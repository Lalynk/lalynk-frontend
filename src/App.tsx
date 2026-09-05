import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home></Home>}></Route>
        <Route path="/login" element= {<Login></Login>}></Route>
        <Route path="/dashboard" element= {<Dashboard></Dashboard>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
