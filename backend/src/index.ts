import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './database'
import router from './routes/index'

import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
/**
 * Configuramos i18n
 */
 i18next
 .use(Backend)
 .use(i18nextMiddleware.LanguageDetector)
 .init({
     backend: {
         loadPath: __dirname + '/resources/locales/{{lng}}/{{ns}}.json'
     },
     fallbackLng: 'en',
     preload: ['en', 'es', 'fr']
 });

const app = express();
app.use(i18nextMiddleware.handle(i18next));
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const baseUrl = process.env.BASE_URL || '/api';

const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: `${host}:${port}`,
        basePath: baseUrl,
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.ts', './model/**/*.ts', './controller/**/*.ts', './routes/**/*.js', './model/**/*.js', './controller/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

app.use(cors());
app.use(express.json());

app.use(baseUrl, router);



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
