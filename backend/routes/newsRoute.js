// userRoutes.js
const express = require('express');
const router = express.Router();
const news = require('../controllers/newsControllers')

router.get('/',news.getNews);
module.exports = router;
