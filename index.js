const express = require("express");
const axios = require("axios");

const app = express();

const CLIENT_ID = "1449415004276133959";
const CLIENT_SECRET = "SeAz23yeMcJuwrlifLsgNniomsrbDt8Z";
const REDIRECT_URI = "https://discord-oauth-a8h1.onrender.com/callback";

// الصفحة الرئيسية
app.get("/", (req, res) => {
  const url =
    "https://discord.com/oauth2/authorize" +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    "&response_type=code" +
    "&scope=identify+email+connections+guilds+guilds.join+rpc+rpc.notifications.read+bot";

  res.send(`
    <html>
      <body style="background:#2c2f33;color:white;text-align:center;padding-top:100px">
        <h1>Authorize My Discord App</h1>
        <a href="${url}" style="
          padding:15px 30px;
          background:#5865F2;
          color:white;
          text-decoration:none;
          border-radius:8px;
          font-size:20px;">Authorize</a>
      </body>
    </html>
  `);
});

// callback لاستبدال الكود بـ access_token
app.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send("❌ No code provided");

  try {
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

    res.send(`
      <h1>✅ Authorization Successful</h1>
      <p>App added to Authorized Apps</p>
      <pre>${JSON.stringify(token.data, null, 2)}</pre>
    `);
  } catch (err) {
    res.send("❌ OAuth Error<br><pre>" + err.response?.data + "</pre>");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
