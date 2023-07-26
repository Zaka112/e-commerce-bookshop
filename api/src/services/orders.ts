import Order, { OrderDocument } from "../models/Order";

export const createNewOrderService = async (
  order: OrderDocument
): Promise<OrderDocument> => {
  return await order.save();
};

export const findOrderByUserIdService = async (
  userId: string
): Promise<OrderDocument[]> => {
  return await Order.find({ userId: userId });
};

export const findOrderByOrderIdService = async (
  orderId: string
): Promise<OrderDocument| null > => {
  return await Order.findById(orderId);
};
