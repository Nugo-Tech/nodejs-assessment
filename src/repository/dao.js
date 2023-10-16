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
export async function deleteUser(id) {
    let connection = await datasource.getConnection();
    try {
        const exist =await connection.query("select * from user where id=? ",id);
        if(!exist.length){
            errorMessage.message ="ID: "+id+" not exist";
            throw errorMessage;

        }
        await connection.query("START TRANSACTION");
        await connection.query("delete from user where id=?",id);
        await connection.query("COMMIT");
    } catch (error) {
        await connection.query("ROLLBACK");
        console.log(error);
        throw error;
    } finally {
        await connection.release();

    }
}
export async function updateUser(entity) {
    let connection = await datasource.getConnection();
    try {
        const exist =await connection.query("select * from user where id=? ",entity.id);
        const existByEmail=await connection.query("select * from user where email=?", entity.email);
        if(!exist.length){
            errorMessage.message ="ID: "+entity.id+" not exist";
            throw  errorMessage;
        }
        if (existByEmail.length){
            errorMessage.method="Email: "+entity.email+" already exist";
            throw errorMessage;
        }
        await connection.query("START TRANSACTION");
        await connection.query("update user set name=?,address=?,email=?,city=?,country=? where id =?",
            [entity.name,entity.address,entity.email,entity.city,entity.country,entity.id]);
        await connection.query("COMMIT");

    } catch (error) {
        await connection.query("ROLLBACK");
        console.log(error);
        throw error;
    } finally {
        await connection.release();

    }
}
export async function readUser(id) {
    let connection = await datasource.getConnection();
    try {
        let exist =await connection.query("select * from user where id=? ",id);
        if(!exist.length){
            errorMessage.message ="ID: "+id+" not exist";
            throw errorMessage;
        }
        exist = JSON.parse(JSON.stringify(exist));
        return exist;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await connection.release();

    }
}
