"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
exports.router = express_1.default.Router();
let pool;
dotenv_1.default.config();
initPool();
function initPool() {
    return __awaiter(this, void 0, void 0, function* () {
        pool = yield promise_mysql_1.default.createPool({
            host: process.env.host,
            port: +process.env.port,
            database: process.env.database,
            user: process.env.username,
            password: process.env.password,
            connectionLimit: +process.env.connection_limit
        });
    });
}
function validateUserData(user) {
    if (!user || !user.name || !user.email || !user.address || !user.city || !user.country) {
        return { isValid: false, error: 'Invalid input data' };
    }
    if (!/^[A-Za-z ]+$/.test(user.name)) {
        return { isValid: false, error: 'Invalid name' };
    }
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(user.email)) {
        return { isValid: false, error: 'Invalid email' };
    }
    if (!/^[0-9A-Za-z\s\.,#-]+$/.test(user.address)) {
        return { isValid: false, error: 'Invalid address' };
    }
    if (!/^[A-Za-z ]+$/.test(user.city)) {
        return { isValid: false, error: 'Invalid city' };
    }
    if (!/^[A-Za-z ]+$/.test(user.country)) {
        return { isValid: false, error: 'Invalid country' };
    }
    return { isValid: true };
}
exports.router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersArray = yield pool.query('SELECT * FROM users');
        const users = usersArray.map((row) => ({
            id: row.id,
            name: row.name,
            email: row.email,
            address: row.address,
            city: row.city,
            country: row.country
        }));
        res.json(users);
    }
    catch (error) {
        console.error("Error while fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const usersArray = yield pool.query('SELECT * FROM users WHERE id = ?', [userId]);
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
    }
    catch (error) {
        console.error("Error while fetching a user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const validationResult = validateUserData(userData);
        if (!validationResult.isValid) {
            return res.status(400).json({ error: validationResult.error });
        }
        const result = yield pool.query('INSERT INTO users (name, email, address, city, country) VALUES (?,?,?,?,?)', [userData.name, userData.email, userData.address, userData.city, userData.country]);
        const user = Object.assign({ id: result.insertId }, userData);
        res.status(201).json(user);
    }
    catch (error) {
        console.error("Error while creating a user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const result = yield pool.query('DELETE FROM users WHERE id = ?', [userId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.sendStatus(204);
    }
    catch (error) {
        console.error("Error while deleting a user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const userData = req.body;
        if (!userData) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        const existingUser = yield pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (existingUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const updatedUser = Object.assign(Object.assign({}, existingUser[0]), userData);
        yield pool.query('UPDATE users SET name=?, email=?, address=?, city=?, country=? WHERE id=?', [updatedUser.name, updatedUser.email, updatedUser.address, updatedUser.city, updatedUser.country, userId]);
        res.json(updatedUser);
    }
    catch (error) {
        console.error("Error while updating a user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
