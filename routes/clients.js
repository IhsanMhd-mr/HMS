const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController.js');
// const imageController = require('../controllers/imageController.js');
const upload = require("../lib/multer");
const jwt = require('../config/JWT.js');

console.log("clients route")

router.post('/register',jwt.validateToken, clientController.register);
// router.put('/img/:clientId',upload.single('imgFile'), imageController.imgUpload);
// router.get('/list', clientController.getAll);
// router.get('/byName',clientController.getClientByName)
// router.get('/byId/:clientId', clientController.getClientById);
// router.put('/editclient/:clientId',jwt.validateToken, clientController.editClient);
// router.delete('/deleteclient/:clientId',jwt.validateToken, clientController.deleteClient);

module.exports = router;