const express = require("express");  
const axios = require("axios");  
  
const app = express();  
  
const CLIENT_ID = "1449415004276133959";  
const CLIENT_SECRET = "SeAz23yeMcJuwrlifLsgNniomsrbDt8Z";  
const REDIRECT_URI = "https://discord-oauth-a8h1.onrender.com/callback";  
  
app.get("/", (req, res) => {  
  const url =  
    "https://discord.com/oauth2/authorize" +  
    `?client_id=${CLIENT_ID}` +  
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +  
    "&response_type=code" +  
    "&scope=identify email guilds";  
  
  res.send(`<a href="${url}">Authorize</a>`);  
});  
  
app.get("/callback", async (req, res) => {  
  const code = req.query.code;  
  
  const token = await axios.post(  
    "https://discord.com/api/oauth2/token",  
    new URLSearchParams({  
      client_id: CLIENT_ID,  
      client_secret: CLIENT_SECRET,  
      grant_type: "authorization_code",  
      code,  
      redirect_uri: REDIRECT_URI  
    }),  
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }  
  );  
  
  res.send("✅ تم التفويض بنجاح");  
});  
  
app.listen(3000);  
