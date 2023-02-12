import express from 'express'
import mongoose from 'mongoose'
import * as config from './config.js'
import { Informations, Routes } from './models/mainModel.js'

declare module 'express-session' {
    export interface SessionData {
    user: { [key: string]: any };
    }
}

export const connection = async () => {
    try {
        await mongoose.connect(config.MONGODB_CONNECTION)
        console.log('connected to MongoDB');
    } catch (err: any) {
        console.log(err.message);
    }
}

export const getMainData = async (req: express.Request, res: express.Response) => {
    try {
        const mainData = await Informations.find()
        if (mainData.length > 0) {
            res.send(mainData)
        }
    } catch (err: any) {
        res.send(err.message).status(400)
    }
}

export const getRoutes = async (req: express.Request, res: express.Response) => {
    try {
        const routes = await Routes.find()
        if (routes.length > 0) {
            res.send(routes)
        }
    } catch (err: any) {
        res.send(err.message).status(400)
    }
}

export const login = (req: express.Request, res: express.Response) => {
    const { password } = req.body;
    if (password === config.ADMIN_PASSWORD) {
    req.session.user = 'admin' as any;
    req.session.cookie.expires = new Date(
      Date.now() + config.SECONDS_TILL_SESSION_TIMEOUT * 1000
    );
    req.session.save();
    res.status(200).send('OK');
    } else {
    res.status(400).send({});
    }
};

export const getCurrentUser = (req: express.Request, res: express.Response) => {
    req.session.user ? res.send(req.session.user) : res.send('anonymousUser');
};

export const logout = (req: express.Request, res: express.Response) => {
    req.session.destroy((err) => {
    err ? res.send('ERROR') : res.send('LOGGED OUT');
    });
};

export const authorizeUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.session.user === 'admin' as any) {
        next()
    } else {
        res.status(401).send({});
    }
}

export const getApiDocumentation = (
    req: express.Request,
    res: express.Response
) => {
    const apiDocumentation = `
        <style>
            body { background-color: #333; font-family: courier; }
            li { font-size: 1.3rem; padding: .5rem;
                color: gray; margin: .5rem; background-color: #111;}
            a { color: indianred; }
        </style>
        <h1>Api Docs.</h1>
        <ul>
            <li>
                <a href='/data'>/Data</a> Get Main Data
            </li>
            <li>
            <a href='/routes'>/Routes</a> Get Routes
            </li>
        </ul>
    `;
    res.send(apiDocumentation);
};