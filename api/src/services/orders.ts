
import Order, { OrderDocument } from "../models/Order";

export const addNewOrderService = async (
  order: OrderDocument
): Promise<OrderDocument> => {
  return await order.save();
};