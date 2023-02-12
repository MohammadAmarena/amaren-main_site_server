import mongoose from 'mongoose'

const mainSchema = new mongoose.Schema({
    id: String,
    myData: [ Object ],
    routes: [ Object ],
    projects: [ Object, Object, Object, Object, Object ]
})

export const Informations = mongoose.model('Informations', mainSchema)

const routesSchema = new mongoose.Schema({
    routes: [ Object ]
})

export const Routes = mongoose.model('Routes', routesSchema)