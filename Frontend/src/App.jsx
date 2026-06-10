import './App.css'
import Home from './Pages/Home'
import {useRoutes, Navigate} from 'react-router';
import Routes from './Pages/Routes';
import Queries from './Pages/Queries';
import Login from './Pages/Login';
import SignIn from './Pages/SignIn';
import About from './Pages/About';
function App() {
  function CustomRoute(){
      const elements = useRoutes([
        {
          path:"/",
          element:<Navigate to="/Home" replace />
        },
        {
          path:"/Home",
          element:<Home/>
        },{
          path:"/Routes",
          element:<Routes/>
        },{
          path:"/queries",
          element:<Queries/>
        },{
          path:"/about",
          element:<About/>
        },{
          path:"/login",
          element:<Login/>
        },{
          path:"/signup",
          element:<SignIn/>
        }
    ])
    return elements;
  }
  return (
    <>
      <CustomRoute/>
    </>
  )
}

export default App
