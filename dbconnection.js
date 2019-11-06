
const pg = require('pg');

const dbconfig = {
    host: 'ec2-54-235-92-244.compute-1.amazonaws.com',
    user: 'jomqgxxptntuwr',     
    password: 'e26169ed79d03cb4e7552970976b506cbeb544b36fdbaa0e625f718150420788',
    database: 'd32o0bdj3odvt9',
    port: 5432,
    ssl: true
};

const client = new pg.Client(dbconfig);

client.connect(err => {
    if (err) throw err;
    else {
        // queryDatabase();
    }
});

module.exports = client;