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
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";

import PaymentSuccess from "../Pages/Dashboard/PaymentPage/PaymentSuccess";
import MyReview from "../Pages/Dashboard/MyReview/MyReview";
import FavoritesMeals from "../Pages/Dashboard/FavoriteMeals/FavoritesMeals";
import CreateMeal from "../Pages/Dashboard/CreateMeal/CreateMeal";
import MyMeals from "../Pages/Dashboard/MyMeals/MyMeals";
import UpdateMeal from "../Pages/Dashboard/UpdateMeal/UpdateMeal";

import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentCancel from "../Pages/Dashboard/paymentCancel/PaymentCancel";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ErrorPage from "../ErrorPage/ErrorPage";
import ManageUsers from "../Pages/Dashboard/admin/ManageUser/ManageUser";
import ManageRequests from "../Pages/Dashboard/admin/ManageRequest/ManageRequests";
import PlatformStatistics from "../Pages/Dashboard/admin/PlatformStatistics/PlatformStatistics";

import ChefOrderRequests from "../Pages/Dashboard/OrderRequest/ChefOrderRequest";
import About from "../Pages/About/About";
import Profile from "../Pages/Profile/Profile";
import Contact from "../Pages/Contact/Contact";


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
      },
      {
        path:"about",
        Component:About
      },
      {
        path:"profile",
        Component:Profile
      },
      {
        path:"contact",
        Component:Contact
      },
      {
        path:"*",
        Component:ErrorPage
      }

    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'my-profile',
        Component: MyProfile
      },
      {
        path: 'my-orders',
        Component: MyOrders
      },
      
      {
        path: 'payment/:id',
        Component:Payment
      },
      {
        path:'payment-success',
        Component:PaymentSuccess
      },
      {
        path:'payment-cancelled',
        Component:PaymentCancel
      },
      {
        path:"payment-history",
        Component:PaymentHistory
      },
      {
        path:'my-review',
        Component:MyReview
      },
      {
        path:'my-favorites',
        Component:FavoritesMeals
      },
      // chef
      {
        path:'create-meal',
        Component:CreateMeal
      },
      {
        path:"chef-order-request",
        Component:ChefOrderRequests
      },
      {
        path:'my-meals',
        Component:MyMeals
      },
      {
        path:'update-meal/:id',
        Component:UpdateMeal
      },
      // admin
      {
        path:"manage-users",
        Component:ManageUsers
      },
      {
        path:"manage-request",
        Component:ManageRequests
      },
      {
        path:"platform-statistics",
        Component:PlatformStatistics
      }
    


    ]
  }
]);