

const RoleMutation = {
    createRole: async (_, { name, status, right }, context) => {

        // if (!password && email) {
        //     throw new Error('You must enter the value of password');
        // }

        // if (password && !email) {
        //     throw new Error('You must enter the value of email');
        // }

        // if (!password && !email && !username) {
        //     throw new Error('You must enter the value of password and email');
        // }

        // const hashedPassword = await bcrypt.hash(password, 10)

        // return new Promise((resolve, reject) => {
        //     db.query('INSERT INTO users (username, email, password, createdAt, updatedAt) VALUES (?, ?, ?, now(), now())', [username, email, hashedPassword], (err, result) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             console.log("45", result.insertId);
        //             // const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
        //             // delete user.password;
        //             // 
        //             const insertedId = result.insertId;
        //             db.query('SELECT * FROM roles WHERE id = ?', [insertedId], (err, results) => {
        //                 if (err) {
        //                     reject(err);
        //                 } else {
        //                     const user = results[0]
        //                     const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
        //                     delete results[0].password;
        //                     resolve({ token, user });
        //                 }
        //             });
        //         }
        //     });
        // });
        return true;
    },
}

module.exports = RoleMutation;