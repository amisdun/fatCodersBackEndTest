const { express, bodyParser, cors, config } = require("./packages/index");

const app = express();
const { routers } = require("./routes/index");

require("./database/dbConnection");

config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: "*/*" }));
app.use(bodyParser.text({ type: "*/*" }));
app.use(cors());
app.use("/v1", routers);
app.use("/", (request, response) => {
	response.json({ message: "hey!!! Fat Cat Coder" });
});

module.exports = app;
