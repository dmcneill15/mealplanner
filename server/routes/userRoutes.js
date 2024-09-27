import express from "express";
import { userController } from "../controllers/index.js"; // Adjust the path as necessary

const router = express.Router();

// Adds a GET route to return all users
router.get('/', (req, res) => {
    userController.getUsers(res);
});

// Adds a POST route to create a new user
router.post('/create', (req, res) => {
    userController.createUser(req.body, res);
});

// Route to UPDATE a user
router.put('/update/:email_id', (req, res) => {
    userController.updateUser(req, res);
});

// Route to DELETE a user
router.delete('/delete/:email_id', (req, res) => {
    userController.deleteUser(req, res);
});

export default router;

