import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getOrderDetails } from '../../redux/thunk/orders';
import { Paper } from '@mui/material';
import NotFound from '../NotFound';
import { useParams } from 'react-router-dom';

export default function UserOrderDetails() {
    const { orderId } = useParams<{ orderId: string }>();
    const orderDetails = useSelector((state: RootState) => state.orders.userOrderDetails);
    const dispatch = useDispatch<AppDispatch>();
    console.log(orderDetails)
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);
  if (orderDetails) { return (
    <div>UserOrderDetails
        {orderDetails.bookList.map(book => 
            {return <Paper>
                {book.title} -- {book.counter}
            </Paper>})}
    </div>
  )} else {
    return <NotFound />;
  }
 
}
