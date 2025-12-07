import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Meals from "../Pages/Meals/Meals";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayout,
   children:[
    {
        index:true,
        Component:Home
    },
    {
      path:'/meals',
      Component:Meals
    },
    {
      path:'login',
      Component:Login
    }
   ]
  },
]);