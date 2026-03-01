import express from "express";
import newMessageRouter from "./routes/newMessage.js";
import path from "path";
import { formatTime } from "./utils/utils.js";

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: formatTime(new Date()),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: formatTime(new Date()),
  },
];
export function addMessage(message) {
  message.id = messages[messages.length - 1].id + 1;
  messages.push(message);
}

const app = express();
const port = process.env.PORT;

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use("/new", newMessageRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Mini Message App", messages: messages });
});
app.get("/:messageId", (req, res) => {
  const { messageId } = req.params;
  const message = messages.find((message) => message.id === Number(messageId));
  if (!message) throw Error("Not Found");
  res.render("message", { message: message });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send("Message not found");
});

app.listen(port || 3000, (error) => {
  if (error) console.error(error);
  console.log(`Server running at port ${port}`);
});
