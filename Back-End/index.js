const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const path = require("path");
var cors = require("cors");
const app = express();
const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const authConfig = require("./config/auth.config");

// Settings
app.set("port", process.env.PORT || 8000);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser("ithoangtansecurity"));

// --- PHẦN SỬA LỖI CORS QUAN TRỌNG NHẤT ---
// origin: true -> Cho phép mọi tên miền (nhưng trả về đúng tên miền đó thay vì *)
// credentials: true -> Cho phép gửi kèm Cookie/Token đăng nhập
app.use(cors({
  origin: true, 
  credentials: true
}));
// ------------------------------------------

// XÓA BỎ HOÀN TOÀN ĐOẠN app.use((req, res, next) => {...}) THỦ CÔNG CŨ
// VÌ NÓ GÂY XUNG ĐỘT HEADER

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
  next();
});

app.use("/", require("./routes/api"));

app.listen(app.get("port"), function () {
  console.log(`Server on port ${app.get("port")}`);
});

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: authConfig.GOOGLE_CLIENT_ID,
      clientSecret: authConfig.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => done(null, profile._json)
  )
);