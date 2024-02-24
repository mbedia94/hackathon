import { Context, Telegraf } from "telegraf";
import { ChatUser, Menu, Order, Plate, PopulatedOrder } from "@hackathon/types";
import { MenuEntity } from "../entities/menu";
import { ChatUserEntity } from "../entities/chatUser";
import { OrderEntity } from "../entities/order";

export interface MyContext extends Context {
  chatUser?: ChatUser;
}

const findChatUser = (chatId) => {
  return ChatUserEntity.findOne<ChatUser>({ chatId });
};

const createChatUser = (chatId, name) => {
  const user = new ChatUserEntity({ chatId, name });
  return user.save();
};

const createOrder = (chatUserId, menuId) => {
  const order = new OrderEntity({ chatUser: chatUserId, menu: menuId });
  return order.save();
};

const configureBot = () => {
  const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN);

  bot.use(async (ctx, next) => {
    const chat = await ctx.getChat();
    let chatUser = await findChatUser(chat.id);
    if (!chatUser) {
      chatUser = await createChatUser(
        chat.id,
        [chat.first_name, chat.last_name].join(" ")
      );
    }
    ctx.chatUser = chatUser;
    return next();
  });

  bot.start(async (ctx) => {
    await ctx.replyWithMarkdown(`Welcome to CalvoBot ${ctx.chatUser.name}!`);
    await ctx.replyWithMarkdown(
      "Here are some commands you can use: \n /menu Shows the available menus, and lets you pick one to make an order. \n /order Shows you the current status of your order."
    );
  });

  bot.command("menu", async (ctx) => {
    const menus = await MenuEntity.find();

    const plateToString = (plate: Plate) => {
      return `- ${plate.name}: ${plate.description}`;
    };

    const menuToString = (menu: Menu) => {
      return `${menu.name}:${menu.price}€ ${menu.plates
        .map(plateToString)
        .join("\n")}`;
    };
    await ctx.replyWithMarkdown(
      `Here are the available menus:\n${menus.map(menuToString).join("\n")} `,
      {
        reply_markup: {
          inline_keyboard: [
            menus.map((menu) => ({ text: menu.name, callback_data: menu._id })),
          ],
        },
      }
    );
  });

  bot.on("callback_query", async (ctx) => {
    const order = await createOrder(ctx.chatUser._id, ctx.callbackQuery.data);
    await ctx.replyWithMarkdown(
      `Your order is on the way! OrderId: ${order._id}`
    );
  });

  bot.command("order", async (ctx) => {
    const orders = await OrderEntity.find<PopulatedOrder>({
      chatUser: ctx.chatUser._id,
    }).populate(["menu", "chatUser"]);

    const orderToString = (order: PopulatedOrder) => {
      return `- ${order._id}: ${order.menu.name} ${
        order.completed !== false ? "Completed! 🎉" : "⏲️ Pending..."
      }`;
    };

    await ctx.replyWithMarkdown(
      `This is the status of your orders:\n${orders
        .map(orderToString)
        .join("\n")}`
    );
  });

  return bot;
};

export default configureBot;
