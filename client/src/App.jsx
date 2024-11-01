import './App.css'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Navigate } from 'react-router-dom'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import Dashboard from './components/dashboard';
import { useAuth0 } from "@auth0/auth0-react"
import Profile from './components/profile';
<<<<<<< Updated upstream
=======
import Property from './components/property';
import Setting from './components/Setting';
import UserCreationForm from './components/usercreateform';
>>>>>>> Stashed changes
function App() {
  const { user, isAuthenticated } = useAuth0()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} >
        <Route path='/profile' index element={<Profile />} />
<<<<<<< Updated upstream
        <Route path='/dashboard' index element={<Dashboard />}  />
=======
        <Route path='/' index element={<Dashboard />}  />
        <Route path='/property' element={<Property />}  />
        <Route path='/setting' element={<Setting />}  />
        <Route path='/user-form' element={<UserCreationForm/>}/>
>>>>>>> Stashed changes
      </Route>
    )
  );
  return (
    <div className="App ">
      <RouterProvider router={router} />
    </div>
  );
}
  const Root = () => {
    return (
      <>
        <Navbar />
        <div className='flex felx-col'>
          <Sidebar />
          <Outlet />
        </div>
      </>
    )
  }
  export default App;
  //   return (
  //     <Router>
  //       <div className="flex flex-col flex-grow min-h-screen">
  //         <Navbar />
  //         <div className="flex flex-grow">
  //           <Sidebar />
  //           <div className="flex flex-col self-center m-auto p-6">
  //             {isAuthenticated && <Dashboard />}
  //           </div>
  //         </div>
  //       </div>
  //     </Router>
  //   )
  // }

 
