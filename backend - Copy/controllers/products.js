const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Insert a new product
const createProduct = async (req, res) => {
    const { name, description, price, category, image_url } = req.body;
    try {
        const product = await prisma.products.create({
            data: {
                name,
                description,
                price,
                category,
                image_url,
            }
        });
        res.status(200).json({
            status: "ok",
            message: `Product with id ${product.product_id} created successfully`,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error creating product",
            error: err.message,
        });
    }
};

// Get all products
const getProducts = async (req, res) => {
    const products = await prisma.products.findMany();
    res.json(products);
}

// Get a product by product_id
const getProduct = async (req, res) => {
    const id = req.params.id;  // รับ ID จาก URL params
    try {
        const product = await prisma.products.findUnique({
            where: { product_id: Number(id) },  // ใช้ product_id เป็นการค้นหาสินค้า
        });
        if (!product) {
            res.status(404).json({ message: "Product not found" });  // ถ้าไม่เจอสินค้า
        } else {
            res.status(200).json(product);  // ส่งข้อมูลสินค้ากลับไป
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err });  // ถ้ามีข้อผิดพลาด
    }
}

// Update a product by product_id
const updateProduct = async (req, res) => {
    const { name, description, price, category, image_url } = req.body;
    const { id } = req.params;
    const data = {};

    if (name) data.name = name;
    if (description) data.description = description;
    if (price) data.price = price;
    if (category) data.category = category;
    if (image_url) data.image_url = image_url;

    if (Object.keys(data).length === 0) {
        return res.status(400).json({
            message: "No data provided",
            status: "error"
        });
    }

    try {
        const product = await prisma.products.update({
            data: data,
            where: { product_id: Number(id) },  // ใช้ product_id แทน customer_id
        });

        res.status(200).json({
            status: "OK",
            message: `Product with id ${product.product_id} is updated successfully`,
            product: product,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: `Error while updating the Product`,
            error: err,
        });
    }
}

// Delete a product by product_id
const deleteProduct = async (req, res) => {
    const id = req.params.id;  // รับ ID ของสินค้า
    try {
        // ตรวจสอบว่ามี Product มั้ย
        const existingProduct = await prisma.products.findUnique({
            where: { product_id: Number(id) },  // ค้นหาสินค้าที่มี product_id
        });

        // ถ้าไม่เจอ Product
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // ถ้ามี Product
        await prisma.products.delete({
            where: { product_id: Number(id) },  // ลบสินค้าที่มี product_id
        });

        res.status(200).json({
            status: "OK",
            message: `Product with id ${id} is deleted successfully`,  // แจ้งว่า Product ถูกลบ
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Error while deleting the Product",
            error: err,
        });  // หากเกิดข้อผิดพลาดระหว่างการลบ
    }
}

module.exports = {
    createProduct, getProducts, getProduct, updateProduct, deleteProduct
};