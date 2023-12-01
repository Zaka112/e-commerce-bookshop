import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

import { AppDispatch, RootState } from "../../../redux/store";
import { getUserOrderList } from "../../../redux/thunk/orders";
import UserOrderItems from "./UserOrderItems";
import NotFound from "../../Error";
import { orderActions } from "../../../redux/slices/orders";

export default function UserOrdersList() {
  const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [sortAction, setSortAction] = useState("");  
    const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const navigate = useNavigate();
  const orderList = useSelector((state: RootState) => state.orders.userOrders);
  const userDetails = useSelector(
    (state: RootState) => state.user.userInformation
  );

  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userId && userDetails) {
      dispatch(getUserOrderList(userId));
    }
  }, [dispatch, userId, userDetails]);
  
    function sortHandel() {
     
      dispatch(orderActions.orderListById("asc"));
    }
  if (userDetails) {
    if (orderList.length > 0) {
      return (
        <Paper>
          <Typography variant="h4" component="div">
            OrderList{" "}
          </Typography>
          <Paper>
            {" "}
            <Button onClick={() => navigate(-1)}>Back</Button>{" "}
            {userDetails.firstName + ` - your order history`}{" "}
          </Paper>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800 }}
                      component="h1"
                    >
                      No.
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800 }}
                      component="h1"
                    >
                      Order no.
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800 }}
                      component="h1"
                    >
                      Order Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800 }}
                      component="h1"
                    >
                      Number of items
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800 }}
                      component="h1"
                    >
                     <Button onClick={sortHandel}> Total amount</Button>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              
              {orderList

                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                .map((order) => (
                  <TableBody key={order._id}>
                    <UserOrderItems
                      order={order}
                      orderNumber={orderList.indexOf(order, 0)}
                    />
                  </TableBody>
                ))}
            </Table>
          </TableContainer>
          {orderList.length > 10 ? (
            <TablePagination
              ActionsComponent={TablePaginationActions}
              rowsPerPage={rowsPerPage}
              page={page}
              count={orderList.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              component="div"
            />
          ) : null}
        </Paper>
      );
    } else
      return (
        <Typography variant="h4">You have not made any order yet</Typography>
      );
  } else {
    return <NotFound />;
  }
}
