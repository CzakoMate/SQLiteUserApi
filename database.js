import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
  // await dbRun("DROP TABLE IF EXISTS users")
    await dbRun("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT UNIQUE NOT NULL, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, DateOfBirth DATE )")
 //  await dbRun("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT UNIQUE NOT NULL, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, DateOfBirth DATE )");

    
   const users = [
  {
    "firstName": "Alice",
    "lastName": "Smith",
    "email": "alice.smith@example.com",
    "username": "alice123",
    "password": "password123",
    "DateOfBirth": "1990-01-01"
  },
  {
    "firstName": "Bob",
    "lastName": "Johnson",
    "email": "bob.johnson@example.com",
    "username": "bobbyJ",
    "password": "securepassword",
    "DateOfBirth": "1985-02-20"
  },
  {
    "firstName": "Carol",
    "lastName": "Williams",
    "email": "carol.williams@example.com",
    "username": "carolw",
    "password": "mypassword",
    "DateOfBirth": "1992-05-15"
  },
  {
    "firstName": "Dave",
    "lastName": "Brown",
    "email": "dave.brown@example.com",
    "username": "dave_b",
    "password": "passw0rd",
    "DateOfBirth": "1988-08-30"
  },
  {
    "firstName": "Eve",
    "lastName": "Davis",
    "email": "eve.davis@example.com",
    "username": "eveD",
    "password": "d@v1spassword",
    "DateOfBirth": "1995-11-10"
  }
]


 for (const user of users) {
      await dbRun("INSERT INTO users (firstName, lastName, email, username, password, DateOfBirth) VALUES (?, ?);", [user.firstName,user.lastName, user.email, user.username, user.password, user.DateOfBirth]);
   }
};

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };
