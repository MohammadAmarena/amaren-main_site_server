import express from 'express'
import * as model from '../model.js'
import cors from 'cors'

const router = express.Router()
router.use(cors())

router.get('/', model.getApiDocumentation);
router.get('/data', model.getMainData);

export default router