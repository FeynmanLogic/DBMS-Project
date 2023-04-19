// const mysql = require("mysql");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "param1903",
//   database: "dbms",
// });

// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   db.query(
//     "SELECT * FROM dummy WHERE email = ?",
//     [email],
//     async (error, results) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send({
//           message: "Internal server error",
//         });
//       } else if (results.length === 0) {
//         res.status(401).send({
//           message: "Invalid email or password",
//         });
//       } else {
//         const isPasswordMatch = await bcrypt.compare(
//           password,
//           results[0].password
//         );

//         if (!isPasswordMatch) {
//           res.status(401).send({
//             message: "Invalid email or password",
//           });
//         } else {
//           res.status(200).json({
//             message: "Logged in successfully",
//           });
//         }
//       }
//     }
//   );
// };

// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   db.query(
//     "SELECT * FROM dummy WHERE email = ?",
//     [email],
//     async (error, results) => {
//       if (error) {
//         console.log(error);
//         res.status(500).render("login", {
//           message: "Internal server error",
//         });
//       } else if (results.length === 0) {
//         res.status(401).render("login", {
//           message: "Invalid email or password",
//         });
//       } else {
//         const isPasswordMatch = await bcrypt.compare(
//           password,
//           results[0].password
//         );

//         if (!isPasswordMatch) {
//           res.status(401).render("login", {
//             message: "Invalid email or password",
//           });
//         } else {
//           res.status(200).render("login", {
//             message: "Logged in successfully",
//           });
//         }
//       }
//     }
//   );
// };

const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "param1903",
  database: "dbms",
});

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM dummy WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).render("login", {
          message: "Internal server error",
        });
      } else if (results.length === 0) {
        res.status(401).render("login", {
          message: "Invalid email or password",
        });
      } else {
        const user = results[0];

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
          res.status(401).render("login", {
            message: "Invalid email or password",
          });
        } else {
          db.query(
            "SELECT name, email FROM dummy WHERE id = ?",
            [user.id],
            (error, results) => {
              if (error) {
                console.log(error);
                res.status(500).render("login", {
                  message: "Internal server error",
                });
              } else {
                const userDetails = results[0];

                res.status(200).render("login", {
                  message: "Logged in successfully",
                  name: userDetails.name,
                  email: userDetails.email,
                });
              }
            }
          );
        }
      }
    }
  );
};
