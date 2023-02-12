import mongoose from 'mongoose';
import * as config from './config.js';
import { Informations, Routes } from './models/mainModel.js';
export const connection = async () => {
    try {
        await mongoose.connect(config.MONGODB_CONNECTION);
        console.log('connected to MongoDB');
    }
    catch (err) {
        console.log(err.message);
    }
};
export const getMainData = async (req, res) => {
    try {
        const mainData = await Informations.find();
        if (mainData.length > 0) {
            res.send(mainData);
        }
    }
    catch (err) {
        res.send(err.message).status(400);
    }
};
export const getRoutes = async (req, res) => {
    try {
        const routes = await Routes.find();
        if (routes.length > 0) {
            res.send(routes);
            console.log(routes);
        }
    }
    catch (err) {
        res.send(err.message).status(400);
    }
};
export const getRoute = async (req, res) => {
    const id = req.params.id;
    const route = await Routes.findOne({ _id: id });
    console.log(route);
    route ? res.json(route) : res.send('Route not found');
};
export const deleteRoute = async (req, res) => {
    const id = req.params.id;
    const route = await Routes.deleteOne({ _id: id });
    route
        ? res.json(`Route with id ${id} has been deleted`)
        : res.send('Route not found');
};
export const addRoute = async (req, res) => {
    const rowRoute = req.body;
    const route = new Promise(async (resolve, reject) => {
        const docRoute = new Routes(rowRoute);
        const addedDocRoute = await docRoute.save();
        resolve(addedDocRoute.toObject({ versionKey: false }));
    });
    res.send(await route);
};
export const updateRoute = async (req, res) => {
    const _id = req.params.id;
    const route = req.body;
    const oldRoute = await Routes.find({ _id });
    await Routes.updateOne({ _id }, { $set: { ...route } });
    const newRoute = await Routes.find({ _id });
    res.status(200).send({
        oldRoute: oldRoute,
        result: newRoute,
    });
};
export const login = (req, res) => {
    const { password } = req.body;
    if (password === config.ADMIN_PASSWORD) {
        req.session.user = 'admin';
        req.session.cookie.expires = new Date(Date.now() + config.SECONDS_TILL_SESSION_TIMEOUT * 1000);
        req.session.save();
        res.status(200).send('OK');
    }
    else {
        res.status(400).send({});
    }
};
export const getCurrentUser = (req, res) => {
    req.session.user ? res.send(req.session.user) : res.send('anonymousUser');
};
export const logout = (req, res) => {
    req.session.destroy((err) => {
        err ? res.send('ERROR') : res.send('LOGGED OUT');
    });
};
export const authorizeUser = (req, res, next) => {
    if (req.session.user === 'admin') {
        next();
    }
    else {
        res.status(401).send({});
    }
};
export const getApiDocumentation = (req, res) => {
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
//# sourceMappingURL=model.js.map