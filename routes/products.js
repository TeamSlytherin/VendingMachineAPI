const { Router } = require('express');

const { getProduct,confirmProduct,cancelTransaction  } = require('../controllers/productController')
const router = Router();

router.get('/', getProduct)

router.get('/cancelProduct',cancelTransaction)

router.get('/confirmProduct/',confirmProduct)



module.exports = router;

