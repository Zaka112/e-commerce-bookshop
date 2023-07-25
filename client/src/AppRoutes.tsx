import { Routes, Route } from "react-router-dom";

import SignUp from "./components/userForms/SignUp";
import SignIn from "./components/userForms/SignIn";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import UserInformation from "./components/userForms/UserInformation";
import Cart from "./pages/Cart";
import UserOrders from "./pages/users/UserOrders";
import UserOrderDetails from "./components/userForms/UserOrderDetails";
import Favorite from "./pages/Favorite";



function AppRoutes() {
  return (
    <Routes>
    {/* <Route path="/" element={<HomePage />} /> */} 
     <Route path="users/register" element={<SignUp />} /> 
     <Route path="users/signin" element={<SignIn />} />
    <Route path="/books" element={<Books />} />
       <Route path="/books/:bookId" element={<BookDetail />} />
       <Route path="/cart" element={<Cart />} />
       <Route path="/users" element={<UserInformation />} />
       <Route path="/users/:userId" element={<UserInformation />} />
       <Route path="/orders/:userId" element={<UserOrders />} />
       <Route path="/orders/orderdetails/:orderId" element={<UserOrderDetails />} />
       <Route path="/" element={<Favorite  />} />
     </Routes>
  );
}

export default AppRoutes;