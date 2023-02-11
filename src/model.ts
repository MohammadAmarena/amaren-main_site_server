import express from 'express'
import mongoose from 'mongoose'
import * as config from './config.js'
import { Informations } from './models/mainModel.js'

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
        console.log(mainData);
        
    } catch (err: any) {
        res.send(err.message).status(400)
    }
}

export const getApiDocumentation = (
    req: express.Request,
    res: express.Response
) => {
    const apiDocumentation = `
        <style>
            body { background-color: #333;
                font-family: courier; }
            ul { background-color: #111;
                padding: 1rem; }
            li { font-size: 1.3rem;
                color: gray; }
            a { color: indianred; }
        </style>
        <h1>Api Docs.</h1>
        <ul>
            <li>
                <a href='/data'>/Data</a> Get Main Data
            </li>
        </ul>
    `;
    res.send(apiDocumentation);
};