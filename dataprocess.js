const db = require('./dbconnection');

module.exports = {
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
        await getAllUsers().then( users =>{
            if(!users.some(i=> i.id === userId)){
                const sql = 'INSERT INTO user_list (id) VALUES ($1)';
                await db.query(sql, [userId])
                .then( res=>{
                    console.log(res.rowCount);
                }).catch(err=>{
                    console.log(err);
                })
            }
        } );
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
    getUser : async (userId) => {
        const sql = 'SELECT id, auth, broadcast FROM  user_list WHERE id = $1'
        let data = {};
        await db.query(sql, [userId]).then( res=>{
            data = res.rows;
        }).catch(err=>{
            console.log(err);
        })
        return data;
    }

}