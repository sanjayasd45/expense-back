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
const addSpending = require('./routes/spending.routes.js')
const filter = require('./routes/filter.routes.js')
const passportSetup = require("./passport.js");
const session = require('express-session')
const MongoStore = require('connect-mongo');
const clientUrl = process.env.CLIENT_URL
const Redis = require('redis');
const RedisStore = require('connect-redis').default; 
const secure = process.env.NODE_ENV === 'production'; 
const redisPassword = process.env.REDISPASS
const sessionSecret = process.env.SESSION_SECRET
const cookieParser = require('cookie-parser');


const app = express()


mongoose.connect(`mongodb+srv://sanjayasd45:${password}@datacluster.lgoji1f.mongodb.net/expt?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(port, () => {
            console.log('server is running at ', port);
        })
    })
    
// const sessionConfig = {
//     secret: 'userp-',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: secure },
//     maxAge: 24 * 60 * 60 * 100
// };
// const redisClient = Redis.createClient({
//         password: redisPassword,
//         socket: {
//               host: 'redis-10188.c323.us-east-1-2.ec2.redns.redis-cloud.com',
//               port: 10188
//             }
//           });
        
//         redisClient.connect()
//           .then(() => console.log('Connected to Redis'))
//           .catch((error) => console.error('Error connecting to Redis:', error));

const store = MongoStore.create({
    mongoUrl: `mongodb+srv://sanjayasd45:${password}@datacluster.lgoji1f.mongodb.net/expt?retryWrites=true&w=majority`,
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



app.use(cookieParser(sessionSecret));
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize())
app.use(passport.session(sessionConfig))
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes)
app.use("/amount", addAmount)
app.use("/spending", addSpending)
app.use("/filter", filter)
app.get("/", (req, res) => {
    res.send("i am root")
})
