import express from 'express'
import * as model from '../model.js'
import cors from 'cors'
import session from 'express-session'
import * as config from '../config.js'

const router = express.Router()
router.use(express.json())

router.use(cors({
	origin: config.FRONTEND_URL,
	methods: ['POST', 'GET', 'DELETE', 'PUT'],
	credentials: true
}))

router.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: config.SESSION_SECRET as any,
		cookie: {
			httpOnly: true,
			sameSite: 'lax',
			secure: false
		}
	})
);

router.get('/', model.getApiDocumentation);

router.get('/data', model.getMainData);

router.get('/routes', model.getRoutes);

router.post('/login', model.login);

router.get('/get-current-user', model.getCurrentUser);

router.get('/logout', model.logout);

export default router