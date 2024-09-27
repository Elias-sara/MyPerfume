// // const { Telegraf } = require("telegraf");
// // const TOKEN =
// //   process.env.TELEGRAM_BOT_TOKEN ||
// //   "7333406976:AAHKHvTiztsPRGj9lXIVKDMoIk_F41FLa5U";
// // const bot = new Telegraf(TOKEN);

// // const web_link = "https://busy-beans-kiss.loca.lt/";

// // // Start command
// // bot.start((ctx) => {
// //   ctx.reply("Welcome to My Perfume", {
// //     reply_markup: {
// //       keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
// //       resize_keyboard: true,
// //       one_time_keyboard: true,
// //     },
// //   });
// // });

// // // Handle web app data
// // bot.on("web_app_data", async (ctx) => {
// //   try {
// //     // Parse the incoming JSON data
// //     const orderData = JSON.parse(ctx.webAppData.data);

// //     // Log the parsed data
// //     console.log("Order Data:", orderData);

// //     // Construct the response message
// //     const message = `
// //       New Order Received:
// //       - Name: ${orderData.name}
// //       - Phone: ${orderData.phone}
// //       - Total: $${orderData.total.toFixed(2)}

// //       Items:
// //       ${orderData.items
// //         .map((item) => `${item.title} (Qty: ${item.quantity}) - $${item.price}`)
// //         .join("\n")}

// //       Comments: ${orderData.comments || "None"}
// //     `;

// //     // Reply to the user
// //     await ctx.reply(message);

// //     // Optionally, send the order data to your server
// //     const response = await fetch("http://localhost:3000/webhook", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(orderData),
// //     });

// //     if (!response.ok) {
// //       throw new Error("Failed to send data to the server");
// //     }

// //     ctx.reply("Your order has been processed successfully!");
// //   } catch (error) {
// //     console.error("Error parsing the order data:", error.message);
// //     ctx.reply("There was an issue processing the order data.");
// //   }
// // });

// // // Start the bot
// // bot.launch();
// // const { Telegraf } = require("telegraf");
// // const db = require("./db/db");
// // require("dotenv").config();

// // const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// // const bot = new Telegraf(TOKEN);
// // const web_link = "https://slimy-impalas-occur.loca.lt/";

// // bot.start((ctx) => {
// //   ctx.reply("Welcome to My Perfume", {
// //     reply_markup: {
// //       keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
// //     },
// //   });
// // });

// // bot.on("web_app_data", (ctx) => {
// //   try {
// //     const orderData = JSON.parse(ctx.webAppData.data);
// //     console.log("Order Data:", orderData);

// //     const message = `
// //       New Order Received:
// //       - Name: ${orderData.name}
// //       - Phone: ${orderData.phone}
// //       - Total: $${orderData.total.toFixed(2)}

// //       Items:
// //       ${orderData.items
// //         .map((item) => `${item.title} (Qty: ${item.quantity}) - $${item.price}`)
// //         .join("\n")}

// //       Comments: ${orderData.comments || "None"}
// //     `;

// //     ctx.reply(message);
// //   } catch (error) {
// //     console.error("Error parsing the order data:", error.message);
// //     ctx.reply("There was an issue processing the order data.");
// //   }
// // });

// // bot.launch();
// const { Telegraf } = require("telegraf");

// const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "YOUR_BOT_TOKEN";
// const bot = new Telegraf(TOKEN);

// // Remove webhook setup, using polling instead
// bot.startPolling(); // Starts polling for updates

// bot.start((ctx) => {
//   ctx.reply("Welcome to My Perfume", {
//     reply_markup: {
//       keyboard: [
//         [{ text: "web app", web_app: { url: "https://your-web-app-url.com" } }],
//       ],
//       resize_keyboard: true,
//       one_time_keyboard: true,
//     },
//   });
// });

// bot.on("web_app_data", async (ctx) => {
//   try {
//     const orderData = JSON.parse(ctx.webAppData.data);

//     const message = `
//       New Order Received:
//       - Name: ${orderData.name}
//       - Phone: ${orderData.phone}
//       - Total: $${orderData.total.toFixed(2)}
//       Items: ${orderData.items
//         .map((item) => `${item.title} (Qty: ${item.quantity}) - $${item.price}`)
//         .join("\n")}
//       Comments: ${orderData.comments || "None"}
//     `;

//     await ctx.reply(message);

//     // Send order to server
//     const response = await fetch("http://localhost:5000/webhook", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(orderData),
//     });

//     if (!response.ok) throw new Error("Failed to send data to the server");

//     ctx.reply("Your order has been processed successfully!");
//   } catch (error) {
//     console.error("Error parsing the order data:", error.message);
//     ctx.reply("There was an issue processing the order data.");
//   }
// });

// // Start polling for updates
// bot.launch();
