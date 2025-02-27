const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//insert a new customer
const createUser = async (req, res) => {
    const { user_id, username, password, email } = req.body;
    try {
        const user = await prisma.users.create({
            data: {
                user_id,
                username,
                password,
                email,
            }
        });
        res.status(200).json({
            status: "ok",
            message: `User with id ${user.user_id} created successfully`,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error creating user",
            error: err.message,
        });
    }
};

// get all customers
const getUsers = async (req, res) => {
    const user = await prisma.users.findMany();
    res.json(user);
}

// // get a customer by customer_id
const getUser = async (req, res) => {
    const id = req.params.id;  // รับ ID จาก URL params
    try {
        const user = await prisma.users.findUnique({
            where: { user_id: Number(id) },  // ใช้ user_id เป็นการค้นหาผู้ใช้งาน
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });  // ถ้าไม่เจอผู้ใช้งาน
        } else {
            res.status(200).json(user);  // ส่งข้อมูลผู้ใช้งานกลับไป
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err });  // ถ้ามีข้อผิดพลาด
    }
}


// // update a customer by customer_id
const updateUser = async (req, res) => {
    const { username, password, email } = req.body;  // อัปเดตเฉพาะฟิลด์ที่เกี่ยวข้องกับ Users
    const { id } = req.params;
    const data = {};

    if (username) data.username = username;
    if (password) data.password = password;
    if (email) data.email = email;

    if (Object.keys(data).length === 0) {
        return res.status(400).json({
            message: "No data provided",
            status: "error"
        });
    }

    try {
        const user = await prisma.users.update({
            data: data,
            where: { user_id: Number(id) },  // ใช้ user_id แทน customer_id
        });

        res.status(200).json({
            status: "OK",
            message: `User with id ${user.user_id} is updated successfully`,
            user: user,
        });
    } catch (err) {
        if (err.code === "P2002") {
            res.status(400).json({
                status: "error",
                message: "Email already exists",  // หากอีเมลซ้ำ
            });
        } else if (err.code === "P2025") {
            res.status(404).json({
                status: "error",
                message: `User with id = ${id} not found`,  // หากไม่พบผู้ใช้งาน
            });
        } else {
            console.error("Update user error:", err);
            res.status(500).json({
                status: "error",
                message: `Error while updating the User`,
            });
        }
    }
}

// // delete a customer by customer_id
const deleteUser = async (req, res) => {
    const id = req.params.id;  // รับ ID ของผู้ใช้งานจาก URL params
    try {
        // ตรวจสอบว่ามี User มั้ย
        const existingUser = await prisma.users.findUnique({
            where: { user_id: Number(id) },  // ค้นหาผู้ใช้งานที่มี user_id
        });
        
        // ถ้าไม่เจอ User
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // ถ้ามี User
        await prisma.users.delete({
            where: { user_id: Number(id) },  // ลบผู้ใช้งานที่มี user_id
        });
        
        res.status(200).json({
            status: "OK",
            message: `User with id ${id} is deleted successfully`,  // แจ้งว่า User ถูกลบ
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error while deleting the User",
            error: err,
        });  // หากเกิดข้อผิดพลาดระหว่างการลบ
    }
}



module.exports = {
    createUser, getUsers, getUser, updateUser, deleteUser
};