const db = require('./dbconnection');

module.exports = {
    getAllUsers: async () => {
        const sql = 'SELECT id, auth, broadcast FROM  user_list'
        let data = [];
        await db.query(sql, [], (err,res) => {
            if(res){
                data =  res.rows;
            }else{
                console.log(err);
            }
        });
        return data;
    },
    addUser: async (userId) =>{
        const users = await getAllUsers();
        if(!users.some(i=> i.id === userId)){
            const sql = 'INSERT INTO user_list (id) VALUES ($1)';
            db.query(sql, [userId], (err, res) => {
                if(res){
                    console.log(res.rowCount);
                }else{
                    console.log(err);
                }
            })
        }
    },
    deleteUser: async (userId) => {
        const sql = 'DELETE FROM user_list WHERE id = $1';
        db.query(sql, [userId], (err, res) => {
            if (res) {
                console.log(res.rowCount);
            } else {
                console.log(err);
            }
        })
    },
    getUser : async (userId) => {
        const sql = 'SELECT id, auth, broadcast FROM  user_list WHERE id = $1'
        let data = null;
        await db.query(sql, [userId], (err,res) => {
            if(res && res.rows[0]){
                data = res.rows[0];
            }else{
                console.log(err);
            }
        });
        return data;
    }

}