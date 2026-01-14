const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const path = require("path");
var cors = require("cors");
const app = express();
const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const authConfig = require("./config/auth.config");

// settings
app.set("port", process.env.PORT || 8000);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieParser(process.env.SECRET));
app.use(cookieParser("ithoangtansecurity"));


app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
  next();
});

const corsOptions = {
  origin: [
    "http://localhost:9000",
    "http://localhost:9999",
    "https://localhost:9000",
    "https://localhost:9999",
  ], // reqexp will match all prefixes
  default: "http://localhost:9999",
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS,PUT",
  credentials: true, // required to pass
  // allowedHeaders:
  // "Content-Type, Authorization, Content-Language, Accept-Language, Last-Event-ID, X-Requested-With"
};

// Thay thế toàn bộ cụm if/else cũ bằng dòng này:
app.use(cors());

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
