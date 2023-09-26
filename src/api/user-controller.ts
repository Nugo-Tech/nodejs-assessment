import express from "express";
import mysql, {Pool} from "promise-mysql";
import dotenv from 'dotenv';

export const router = express.Router();

let pool: Pool;
dotenv.config();
initPool();

async function initPool() {
    pool = await mysql.createPool({
        host: process.env.host,
        port: +process.env.port!,
        database: process.env.database,
        user: process.env.username,
        password: process.env.password,
        connectionLimit: +process.env.connection_limit!
    });
}

type  user = {
    id: number,
    name : string,
    email:string,
    address:string,
    city :string,
    country :string
}

function validateUserData(user:user) {
    if (!user || !user.name || !user.email || !user.address || !user.city || !user.country) {
        return { isValid: false, error: 'Invalid input data' };
    }
    if (!/^[A-Za-z ]+$/.test( user.name)){
        return { isValid: false, error: 'Invalid name' };
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test( user.email)){
        return { isValid: false, error: 'Invalid email' };
    }

    if (!/^[0-9A-Za-z\s\.,#-]+$/.test(user.address)){
        return { isValid: false, error: 'Invalid address' };
    }
    if (!/^[A-Za-z ]+$/.test(user.city)){
        return { isValid: false, error: 'Invalid city' };
    }
    if (!/^[A-Za-z ]+$/.test(user.country)){
        return { isValid: false, error: 'Invalid country' };
    }

    return { isValid: true };
}


router.get("/", async (req, res) => {
    try {
        const usersArray = await pool.query('SELECT * FROM users');
        const users = usersArray.map((row:any) => ({
            id: row.id,
            name: row.name,
            email: row.email,
            address: row.address,
            city: row.city,
            country: row.country
        }));

        res.json(users);
    } catch (error) {
        console.error("Error while fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const usersArray = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (usersArray.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = {
            id: usersArray[0].id,
            name: usersArray[0].name,
            email: usersArray[0].email,
            address: usersArray[0].address,
            city: usersArray[0].city,
            country: usersArray[0].country
        };

        res.json(user);
    } catch (error) {
        console.error("Error while fetching a user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/", async (req, res) => {
    try {
        const userData = req.body;

        const validationResult = validateUserData(userData);
        if (!validationResult.isValid) {
            return res.status(400).json({ error: validationResult.error });
        }

        const result = await pool.query(
            'INSERT INTO users (name, email, address, city, country) VALUES (?,?,?,?,?)',
            [userData.name, userData.email, userData.address, userData.city, userData.country]
        );

        const user = {
            id: result.insertId,
            ...userData
        };

        res.status(201).json(user);
    } catch (error) {
        console.error("Error while creating a user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await pool.query('DELETE FROM users WHERE id = ?', [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error("Error while deleting a user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.patch("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        if (!userData) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const existingUser = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (existingUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = {
            ...existingUser[0],
            ...userData
        };

        await pool.query(
            'UPDATE users SET name=?, email=?, address=?, city=?, country=? WHERE id=?',
            [updatedUser.name, updatedUser.email, updatedUser.address, updatedUser.city, updatedUser.country, userId]
        );

        res.json(updatedUser);
    } catch (error) {
        console.error("Error while updating a user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
