const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController.js');
// const imageController = require('../controllers/imageController.js');
const upload = require("../lib/multer");
const jwt = require('../config/JWT.js');

console.log("clients route")

router.post('/register', upload.single("pro_pic"),clientController.register);
// router.put('/img/:clientId',upload.single('imgFile'), imageController.imgUpload);
router.get('/', upload.none(), clientController.getAll);
router.get('/byId/:clientId',  upload.none(),clientController.getClientById);
router.put('/editclient/:clientId', upload.single("pro_pic"), clientController.editClient);
// router.delete('/deleteclient/:clientId',jwt.validateToken, clientController.deleteClient);

module.exports = router;

