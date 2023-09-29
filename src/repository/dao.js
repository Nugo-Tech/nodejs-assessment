import {datasource} from "./dbConnection.js";

let errorMessage={};
export async function saveUser(entity){
    let connection=await datasource.getConnection();
    try{
        const existById=await connection.query("select * from user where id=?", entity.id);
        const existByEmail=await connection.query("select * from user where email=?", entity.email);
        if (existById.length){
            errorMessage.method="ID: "+entity.id+" already exist";
            throw errorMessage;
        }
        if (existByEmail.length){
            errorMessage.method="Email: "+entity.email+" already exist";
            throw errorMessage;
        }
        await connection.query("START TRANSACTION");
        await connection.query("insert into user(id,name,address,email,city,country) values (?,?,?,?,?,?)",
            [entity.id,entity.name,entity.address,entity.email,entity.city,entity.country]);
        await connection.query("COMMIT");
    }catch (error){
        await connection.query("ROLLBACK");
        console.log(error);
        throw error;
    } finally{
        await connection.release();
    }
}
