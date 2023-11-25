const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    swaggerJsdoc = require('swagger-jsdoc'),
    swaggerUi = require('swagger-ui-express'),
    fileupload = require('express-fileupload'),
    cookieParser = require('cookie-parser');

const physicsRoutes = require('./src/restapi/routes')

const app = express();
const port = 8000;

app.use(cors());
app.use(fileupload())
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send("Hello world!");
});

app.use('/api', physicsRoutes);

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a Physics Lab application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
app.listen(port, () => console.log(`app listening on port ${port}`));