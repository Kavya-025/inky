const express = require('express');
const {getAllCanvases, createCanvas, loadCanvas, updateCanvas, shareCanvas } = require('../controllers/canvasController');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const router = express.Router();

router.get('/', authenticationMiddleware, getAllCanvases);

router.post('/',authenticationMiddleware, createCanvas);
// router.delete('/', authenticationMiddleware, deleteCanvas);

router.get('/load/:id', authenticationMiddleware, loadCanvas);

//ipdate canvas
router.put('/:id', authenticationMiddleware, updateCanvas);

//share canvas
router.put('/share/:id', authenticationMiddleware, shareCanvas);

module.exports = router;
