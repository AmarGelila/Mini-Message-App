import { Router } from "express";
import { addMessage } from "../app.js";
import { formatTime } from "../utils/utils.js";

const newMessageRouter = Router();

newMessageRouter.get("/", (req, res) => {
  res.render("form");
});
newMessageRouter.post("/", (req, res) => {
  const { username, message } = req.body;
  addMessage({
    text: message,
    user: username,
    added: formatTime(new Date()),
  });
  res.redirect("/");
});

export default newMessageRouter;
