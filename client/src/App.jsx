import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import SignUp from './components/signup'
import Dashboard from './components/dashboard';
function App() {

  return (
    <Router>
    <div className="flex flex-col flex-grow min-h-screen">
      <Navbar />   
      <div className="flex flex-grow">
      <Sidebar/>
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      </div> 
    </div>
   
    
  </Router>
  )
}

export default App
