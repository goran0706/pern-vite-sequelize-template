/* -------------------------------------------------------------------------- */
/*                                Externals                                   */
/* -------------------------------------------------------------------------- */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

/* -------------------------------------------------------------------------- */
/*                                Modules                                     */
/* -------------------------------------------------------------------------- */
import config from '../config/config.js';

/* -------------------------------------------------------------------------- */
/*                                Middlewares                                 */
/* -------------------------------------------------------------------------- */
import limiter from "../middlewares/limiter.middleware";
import morganMiddleware from '../middlewares/morgan.middleware.js';
import redirectMiddleware from '../middlewares/redirect.middleware.js';
import errorMiddleware from '../middlewares/error.middleware.js';

/* -------------------------------------------------------------------------- */
/*                                Routes                                      */
/* -------------------------------------------------------------------------- */
import authRoutes from '../routes/auth.routes.js';
import postRoutes from '../routes/post.routes.js';
import userRoutes from '../routes/user.routes.js';

export const appInit = () => {
    const app = express();

    /* ---------------------------- Http-to-Https ----------------------------- */
    app.use(redirectMiddleware);

    /* ---------------------------- Middlewares ------------------------------- */
    app.use(helmet());
    app.use(limiter);
    app.use(morganMiddleware);
    app.use(compression());
    app.use(cors({origin: config.httpsServer.origin, credentials: true}));
    app.use(express.urlencoded({limit: '5MB', extended: true}));
    app.use(express.json());
    app.use(express.text());
    app.use(express.raw());
    app.use(cookieParser());

    /* ---------------------------- Routes ------------------------------------ */
    app.use('/', authRoutes);
    app.use('/', userRoutes);
    app.use('/', postRoutes);

    /* ---------------------------- Error Middleware -------------------------- */
    app.use(errorMiddleware);

    return app;
};

export default appInit();
