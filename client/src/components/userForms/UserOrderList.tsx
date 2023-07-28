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

import { AppDispatch, RootState } from "../../redux/store";
import { getUserOrderList } from "../../redux/thunk/orders";
import UserOrderItems from "./UserOrderItems";
import NotFound from "../Error";

export default function UserOrdersList() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
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
    (state: RootState) => state.users.userInformation
  );

  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userId) {
      dispatch(getUserOrderList(userId));
    }
  }, [dispatch, userId]);
  if (userDetails) {
    return (
      <Paper>
        <Typography variant="h2" component="div">
          OrderList{" "}
        </Typography>
        <Paper>
          {" "}
          <Button onClick={() => navigate(-1)}>Back</Button>{" "}
          {userDetails?.userName + ` - your order history`}{" "}
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
                    Order No.
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
              </TableRow>
            </TableHead>

            {orderList.map((order) => (
              <TableBody key={order._id}>
                <UserOrderItems order={order} />
              </TableBody>
            ))}
          </Table>
        </TableContainer>
        <TablePagination
          ActionsComponent={TablePaginationActions}
          rowsPerPage={rowsPerPage}
          page={page}
          count={orderList.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          component="div"
        />
      </Paper>
    );
  } else {
    return <NotFound />;
  }
}
