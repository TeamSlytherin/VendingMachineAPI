const { Router } = require('express');
const verifyToken = require('../middleware/auth')
const { getProduct,confirmProduct,cancelTransaction  } = require('../controllers/productController')
const router = Router();

router.get('/', getProduct)

router.get('/cancelProduct', verifyToken ,cancelTransaction)

router.get('/confirmProduct', verifyToken  ,confirmProduct)



module.exports = router;

