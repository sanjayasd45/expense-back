const express  = require('express')
require('dotenv').config()
const password = encodeURIComponent(process.env.PASSWORD)
const port = process.env.PORT || 3000
const cors = require("cors")
const { default: mongoose } = require('mongoose')
const passport = require("passport")
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const addAmount = require('./routes/amount.routes.js')
const deleteRoute = require('./routes/delete.routes.js')
const addSpending = require('./routes/spending.routes.js')
const filter = require('./routes/filter.routes.js')
const migration = require("./routes/migration.routes.js")
const helpers = require("./routes/helpers.routes.js")
const passportSetup = require("./passport.js");
const session = require('express-session')
const MongoStore = require('connect-mongo');
const clientUrl = process.env.CLIENT_URL
const url = process.env.HOST_URL
const Redis = require('redis');
const RedisStore = require('connect-redis').default; ''
const secure = process.env.NODE_ENV === 'production'; 
const redisPassword = process.env.REDISPASS
const sessionSecret = process.env.SESSION_SECRET
const cookieParser = require('cookie-parser');
const Add = require('./models/add.model.js')
const axios = require('axios');


const app = express()

let DBType = "test";
if(secure){
    DBType = "expt"
}
const interval = 30000; // 5 minutes in milliseconds
function reloadWebsite() {
  axios
  .get(url)
  .then((response) => {
    console.log("website reloaded");
  })
  .catch((error) => {
    console.error(`Error : ${error.message}`);
  });
}
if(secure) {
  setInterval(reloadWebsite, interval);
}



mongoose.connect(`mongodb+srv://sanjayasd45:${password}@datacluster.lgoji1f.mongodb.net/${DBType}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(port, () => {
            console.log('server is running at ', port);
            // updateRunningBalances().catch(console.error);
        })
    })
    

const store = MongoStore.create({
    mongoUrl: `mongodb+srv://sanjayasd45:${password}@datacluster.lgoji1f.mongodb.net/${DBType}?retryWrites=true&w=majority`,
    crypto: {
      secret: "mysupersecretcode",
    },
    touchAfter: 24 * 3600,
  });

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
    });

    const sessionConfig = {
        store,
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false, // Changed from true
        cookie: { 
            secure: secure,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: secure // Recommended for security
        }
    };

        
// app.use(session(sessionConfig));      
app.use(cors({
    origin: clientUrl,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials : true,
}));



// Run the script




app.use(cookieParser(sessionSecret));
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize())
app.use(passport.session(sessionConfig))
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/amount", addAmount)
app.use("/spending", addSpending)
app.use("/migration", migration)
app.use("/filter", filter)
app.use("/delete", deleteRoute)
app.use("/helpers", helpers)
app.get("/", (req, res) => {
    res.send("i am root")
})
