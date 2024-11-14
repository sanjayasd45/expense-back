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
const clientUrl = process.env.CLIENT_URL


const app = express()


mongoose.connect(`mongodb+srv://sanjayasd45:${password}@datacluster.lgoji1f.mongodb.net/expt?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(port, () => {
            console.log('server is running at ', port);
        })
    })
    
const sessionConfig = {
    secret: 'userp-',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    maxAge: 24 * 60 * 60 * 100
};
app.use(session(sessionConfig));
app.use(cors({
    origin: clientUrl,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize())
app.use(passport.session(sessionConfig))
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
app.use("/auth", authRoutes)
app.use("/amount", addAmount)
app.use("/spending", addSpending)
app.use("/filter", filter)
app.get("/", (req, res) => {
    res.send("i am root")
})
