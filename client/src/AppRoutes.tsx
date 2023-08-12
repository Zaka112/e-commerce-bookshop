import { Routes, Route } from "react-router-dom";

import SignUp from "./components/users/SignUp";
import SignIn from "./components/users/SignIn";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import UserInformation from "./components/users/UserInformation";
import Cart from "./pages/Cart";
import UserOrders from "./pages/users/UserOrders";
import UserOrderDetails from "./components/pages/orders/UserOrderDetails";
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage";
import UserListPage from "./pages/users/userRoleList/UserListPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="users/register" element={<SignUp />} />
      <Route path="users/signin" element={<SignIn />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:bookId" element={<BookDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/users/:userId" element={<UserInformation />} />
      <Route path="/orders/:userId" element={<UserOrders />} />
      <Route
        path="/orders/orderdetails/:orderId"
        element={<UserOrderDetails />}
      />
      <Route path="*" element={<NotFound />} />

      <Route path="/users" element={<UserListPage />} />
    </Routes>
  );
}

export default AppRoutes;
