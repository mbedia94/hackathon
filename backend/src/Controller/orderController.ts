import { OrderEntity } from "../entities/order";
import { chatBot } from "..";
import { PopulatedOrder } from "@hackathon/types";

const changeStatusCompleted = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await OrderEntity.findById<PopulatedOrder>(orderId).populate(
      "chatUser"
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.completed = !order.completed;

    await order.save();
    chatBot.telegram.sendMessage(
      order.chatUser.chatId,
      `Order ${order._id} changed status to ${
        order.completed ? "completed" : "pending"
      }`
    );

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { changeStatusCompleted };
