import react from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom" ;
import Login from "./pages/Auth/Login";
import Home from  "./pages/Dashboard/Home" ;
import Expense from  "./pages/Dashboard/Expense";
import Income from  "./pages/Dashboard/Income";
import SignUp from './pages/Auth/SignUp';
import UserProvider from './context/userContext';



const App = ()=>{
  return (
    <UserProvider>
     <div>
       <Router>
        <Routes>
          <Route path="/" element = {<Root />} />
          <Route path = "/login" exact element={ <Login/>} />
          <Route path = "/signUp" exact element={ <SignUp/>} />
          <Route path = "/dashboard" exact element={ <Home/>} />
          <Route path = "/income" exact element={ <Income/>} />
          <Route path = "/expense" exact element={ <Expense />} />
        </Routes>
       </Router>
     </div>
     </UserProvider>
  )
}

export default App ;

const Root = ()=>{
  // check if token exist in local storage 
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated  otherwise login 

  return isAuthenticated ? (
    <Navigate to="/dashboard" /> 
  ): (<Navigate to="/login" /> );
};
