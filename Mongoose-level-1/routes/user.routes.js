const express = require('express');
const UserModel = require('../schema/user.schema');
const userRouter = express.Router();
userRouter.get('/get-users', async (req, res) => {
    const data = await UserModel.find()
    res.status(200).json({ msg: "user-data", data });
})
userRouter.post('/add-user', async (req, res) => {
    const data = req.body;
    const dataPresentInDB = await UserModel.find();
    let validation = dataPresentInDB.filter((el) => el.name === data.name);
    if (validation.length !== 0) {
        return res.status(400).json({ msg: "User already exists" });
    }
    await UserModel.insertMany(data);
    res.status(201).json({ msg: "user added successfully" });
})

userRouter.patch('/update-user/:id', async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndUpdate(id, req.body);
    res.status(205).json({ msg: "User updated successfully" });
})
userRouter.delete('/delete-user/:id', async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
})
module.exports = userRouter;