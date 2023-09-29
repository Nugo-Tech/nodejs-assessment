import mysql from 'promise-mysql';
import env from 'dotenv';

env.config();
export let datasource;

const  dbConfig={
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    connectionLimit: +process.env.DB_CONNECTIONS,
    por:+process.env.DB_PORT
}
async function createDataSource(){
    try{
        datasource=await mysql.createPool(dbConfig);
        console.log("connected to database");
    } catch (exception){
        throw exception;
    }
}
createDataSource();
