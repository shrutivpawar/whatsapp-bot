const process = require("process");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

let seenUsers = {}; // track already replied users

app.post("/whatsapp", (req, res) => {
  const from = req.body.From;
  const msg = req.body.Body ? req.body.Body.toLowerCase() : "";

  console.log("📩 Received from", from, ":", msg);

  let twiml = '<?xml version="1.0" encoding="UTF-8"?><Response>';

  if (!seenUsers[from]) {
    twiml += `<Message>Namaskar. Provide me your details. I'll catch you shortly.</Message>`;
    seenUsers[from] = true;
  } else if (msg.includes("banner") || msg.includes("40x30")) {
    twiml += `<Message>Thanks! I’ve noted your requirement. I’ll contact you soon.</Message>`;
  }

  twiml += "</Response>";
  res.type("text/xml").send(twiml);
});

app.get("/", (req, res) => {
  res.send("✅ WhatsApp Bot is Live");
});

app.listen(3000, () => {
  console.log("🚀 Server is running on port 3000");
});
