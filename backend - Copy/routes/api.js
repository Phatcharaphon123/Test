const express = require('express');
const rateLimit = require('express-rate-limit');

const apilimiter = rateLimit({
    windowMs: 1000 * 60 * 3, // 15 minutes
    max: 100,
    message: "You have exceeded the 100 requests in 3 minutes limit!",
});

const router = express.Router();
const userController = require('../controllers/users');
const productController = require('../controllers/products');

router.post('/users', apilimiter, userController.createUser);
router.get('/users', apilimiter, userController.getUsers);
router.get('/users/:id', apilimiter, userController.getUser);
router.put('/users/:id', apilimiter, userController.updateUser);
router.delete('/users/:id', apilimiter, userController.deleteUser);

router.post('/products', apilimiter, productController.createProduct);  // สร้างสินค้าใหม่
router.get('/products', apilimiter, productController.getProducts);  // ดึงข้อมูลสินค้าทั้งหมด
router.get('/products/:id', apilimiter, productController.getProduct);  // ดึงข้อมูลสินค้าตาม product_id
router.put('/products/:id', apilimiter, productController.updateProduct);  // อัปเดตสินค้าตาม product_id
router.delete('/products/:id', apilimiter, productController.deleteProduct);  // ลบสินค้าตาม product_id

module.exports = router;