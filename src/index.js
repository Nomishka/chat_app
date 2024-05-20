import io from "socket.io-client";
const socket = io("http://localhost:3000");

const button = document.getElementById("send");
const input = document.getElementById("input");
let userId;

button.addEventListener("click", () => {
  if (input.value === "") return;

  socket.emit("message", input.value);
  input.value = "";
});

socket.on("welcome", (id) => {
  userId = id;
});

socket.on("receiveMessage", response => {
  const isOur = response.userId === userId;

  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  if (!isOur) messageContainer.classList.add("left");

  const innerMessage = document.createElement("div");
  innerMessage.classList.add("message");
  if (!isOur) innerMessage.classList.add("foreign");

  const messageInfo = document.createElement("div");
  messageInfo.classList.add("messageInfo");

  const username = document.createElement("p");
  username.innerText = "Nomishka";
  username.classList.add("username");

  const date = document.createElement("p");
  date.innerText = new Date().toLocaleString();
  date.classList.add("date");

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  const textParagraph = document.createElement("p");
  textParagraph.innerText = response.message;

  messageContainer.appendChild(innerMessage);
  innerMessage.appendChild(messageInfo);
  innerMessage.appendChild(textContainer);
  messageInfo.appendChild(username);
  messageInfo.appendChild(date);
  textContainer.appendChild(textParagraph);

  const mainMessageContainer = document.getElementsByClassName("messages")[0];
  mainMessageContainer.appendChild(messageContainer);
});
