require("dotenv").config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const port = 9000;
const app = express();

// Get Telegram Chat ID and Token
const CHAT_ID = process.env.CHAT_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;

app.use(express.static(path.join(__dirname, "public")))

// Convert Express to Json Data
app.use(express.json());
//Form write text support UNICODE UTF8
app.use(express.urlencoded({extended: true}));

// POST endpoint
app.post("/submit", async (req, res) => {
    try {
      // match form inputs correctly
      const { username, email, description } = req.body;
  
      // validation
      if (!username || !description) {
        return res.status(400).send("Fullname and description are required.");
      }
  
      // escape special chars
      const escape = (s = "") =>
        String(s)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;");
  
      // message to telegram
      const text = `<b>New Contact</b>
  <b>Name:</b> ${escape(username)}
  <b>Email:</b> ${escape(email || "N/A")}
  <b>Message:</b> ${escape(description)}`;
  
      // call telegram api
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
      const resp = await axios.post(url, null, {
        params: {
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "HTML",
        },
      });
  
      if (resp.data.ok) {
        return res.redirect("/?sent=1");
      } else {
        console.error("Telegram error:", resp.data);
        return res.status(500).send("Failed to send notification.");
      }
    } catch (err) {
      console.error(err?.response?.data || err.message);
      res.status(500).send("Server error");
    }
  });
  

// Startup Welcome
app.get("/", (req,res)=>{
    res.send("Hello HTML Form")
})


app.listen(port, ()=>{
    console.log(`Server is running with 
        http://localhost:${port}`)
})