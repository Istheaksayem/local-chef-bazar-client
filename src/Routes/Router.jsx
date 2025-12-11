import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Meals from "../Pages/Meals/Meals";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import MealDetails from "../Pages/MealDetails/MealDetails";
import CustomerReviews from "../Component/CustomerReviews/CustomarReviews";
import OrderPage from "../Pages/Order/OrderPage";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/meals',
        Component: Meals
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: '/meals/:id',
        element: <PrivateRoute><MealDetails></MealDetails>
        </PrivateRoute>
      },
      {
        path: '/order/:id',
        element: <PrivateRoute><OrderPage></OrderPage></PrivateRoute>
      },
      {
        path: '/reviews/home',
        Component: CustomerReviews
      }

    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path:'my-profile',
        Component:MyProfile
      },
      {
         path:'my-orders',
        Component:MyProfile
      }
    ]
  }
]);