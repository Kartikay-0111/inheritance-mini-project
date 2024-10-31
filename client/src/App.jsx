import './App.css'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Navigate } from 'react-router-dom'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import Dashboard from './components/dashboard';
import Profile from './components/profile';
import Property from './components/property';
import { Error } from './components/Error';
import Setting from './components/Setting';
import CreateProperty from './components/CreateProperty';
import AuthProvider from './context/authContext';
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}  >
        <Route path='/profile' index element={<Profile />} />
        <Route path='/' index element={<Dashboard />} />
        <Route path='/property' index element={<Property />} />
        <Route path='/property/create' index element={<CreateProperty />} />
        <Route path='/setting' index element={<Setting />} />
      </Route>
    )
  )
  return (
    <div className="App ">
      <RouterProvider router={router} />
    </div>
  );
}
const Root = () => {
  return (
    <AuthProvider>
      <>
        <Navbar />
        <div className='flex flex-row'>
          <Sidebar />
          <Outlet />
        </div>
      </>
    </AuthProvider>
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


