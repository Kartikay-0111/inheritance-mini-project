import './App.css'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Navigate } from 'react-router-dom'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import Dashboard from './components/dashboard';
import Profile from './components/profile';
import CreateProperty from "./components/Createproperty.jsx";
import Property from './components/property';
import Setting from './components/Setting';
import UserCreationForm from './components/usercreateform';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={<Root />}  >
        <Route path='/profile' index element={<Profile />} />

        <Route path='/' index element={<Dashboard />}  />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/property' element={<Property />}  />
        <Route path='/property-form' element={<CreateProperty/>}/>
        <Route path='/user-form' element={<UserCreationForm/>}/>
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
        <div className='flex flex-row'>
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


