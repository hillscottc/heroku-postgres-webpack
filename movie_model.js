// const Pool = require("pg").Pool;
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// client.connect();
// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

const getMovies = () => {
  return new Promise(function (resolve, reject) {
    client.connect();
    client.query("SELECT * FROM movies ORDER BY id ASC;", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
      client.end();
    });
  });
};

// const pool = new Pool({
//   user: "vinyl",
//   host: "localhost",
//   database: "vinyl",
//   password: "vinyl",
//   port: 5432,
// });

// const getMovies = () => {
//   return new Promise(function (resolve, reject) {
//     pool.query("SELECT * FROM movies ORDER BY id ASC", (error, results) => {
//       if (error) {
//         reject(error);
//       }
//       resolve(results.rows);
//     });
//   });
// };

// const createMerchant = (body) => {
//   return new Promise(function(resolve, reject) {
//     const { name, email } = body

//     pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(`A new merchant has been added added: ${JSON.stringify(results.rows[0])}`)
//     })
//   })
// }

// const deleteMerchant = (merchantId) => {
//   return new Promise(function(resolve, reject) {
//     const id = parseInt(merchantId)

//     pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(`Merchant deleted with ID: ${id}`)
//     })
//   })
// }

module.exports = {
  getMovies,
  // createMerchant,
  // deleteMerchant,
};
