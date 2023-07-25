import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
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

import { AppDispatch, RootState } from "../../redux/store";
import { getUserOrderList } from "../../redux/thunk/orders";
import UserOrderItems from "./UserOrderItems";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

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
        <h1>OrderList </h1>
        <Paper> {userDetails?.userName+` - your order history`} </Paper>
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
                <UserOrderItems
                  order={order}
                  page={page}
                  rowsPerPage={rowsPerPage}
                />
                {/* <div>
              {item.bookList.map((book) => (
                <UserOrderItems book={book} orderList={orderList}  />
              ))}
            </div> */}
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
