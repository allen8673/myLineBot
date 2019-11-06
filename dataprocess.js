const db = require('./dbconnection');

const self =  module.exports = {
    getAllUsers: async () => {
        const sql = 'SELECT id, auth, broadcast FROM  user_list'
        let data = [];
        await db.query(sql)
        .then( res=>{
            data = res.rows;
        }).catch(err=>{
            console.log(err);
        })
        return data;
    },
    addUser: async (userId) =>{
        const users = await self.getAllUsers();
        if(!users.some(i=> i.id === userId)){
            const sql = 'INSERT INTO user_list (id) VALUES ($1)';
            await db.query(sql, [userId])
            .then( res=>{
                console.log(res.rowCount);
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    deleteUser: async (userId) => {
        const sql = 'DELETE FROM user_list WHERE id = $1';
        await db.query(sql, [userId])
        .then( res=>{
            console.log(res.rowCount);
        }).catch(err=>{
            console.log(err);
        })
    },
    getUser : async(userId) => {
        const sql = 'SELECT id, auth, broadcast FROM  user_list WHERE id = $1'
        let data = {};
        await db.query(sql, [userId]).then( res=>{
            if(res.rows[0]){
                data = res.rows[0];
            }
        }).catch(err=>{
            console.log(err);
        })
        return data;
    },
    updateAuth: async(userId, auth) => {
        const sql = 'UPDATE user_list SET auth = $2, broadcast = $3 WHERE id = $1';
        await db.query(sql, [userId, auth, true])
        .then( res=>{
            console.log(res.rowCount);
        }).catch(err=>{
            console.log(err);
        })
    },
    updateBroadcast: async(userId, broadcast) => {
        const sql = 'UPDATE user_list SET broadcast = $2 WHERE id = $1';
        await db.query(sql, [userId, broadcast])
        .then( res=>{
            console.log(res.rowCount);
        }).catch(err=>{
            console.log(err);
        })
    }

}