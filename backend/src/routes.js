const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');


const NewsController = require('./controllers/NewsController');
const NewsSearchController = require('./controllers/NewsSearchController');
const NewsDetailController = require('./controllers/NewsDetailController');

const PopNewsController = require('./controllers/PopNewsController')
const PopNewsDetailController = require('./controllers/PopNewsDetailController')
const PopNewsSearchController = require('./controllers/PopNewsSearchController')


const ReportController = require('./controllers/ReportController');
const ReportDetailController = require('./controllers/ReportDetailController');
const UserController = require('./controllers/UserController');
const authController = require('./controllers/authController');

const authMiddleware = require('./middlewares/auth');
const SportsDetailController = require('./controllers/SportsDetailController');
const SportsSearchController = require('./controllers/SportsSearchController');
const SportsController = require('./controllers/SportsController');

const routes = Router();
const upload = multer(uploadConfig);


routes.get('/news', NewsController.show);
routes.get('/detail', NewsDetailController.index);
routes.get('/search', NewsSearchController.index);

routes.get('/sports', SportsController.show);
routes.get('/sportsDetail', SportsDetailController.index);
routes.get('/searchSport', SportsSearchController.index);

routes.get('/popnews', PopNewsController.show)
routes.get('/popnewsdetail', PopNewsDetailController.index)
routes.get('/searchpopnews', PopNewsSearchController.index)

routes.get('/deathreports', ReportController.show);
routes.get('/reportDetail', ReportDetailController.index);

routes.post('/register', UserController.store);
routes.post('/authenticate', authController.store);

routes.use(authMiddleware);
routes.post('/news', upload.single('image'), NewsController.store);
routes.post('/popnews', upload.single('image'), PopNewsController.store)
routes.post('/deathreports', upload.single('reportImage'), ReportController.store);
routes.post('/sports', upload.single('image'), SportsController.store);


module.exports = routes;