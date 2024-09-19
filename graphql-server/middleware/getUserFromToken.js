const jwt = require('jsonwebtoken');


const getUserFromToken = async(token) => {
    try {
        return jwt.verify(token, 'secret') 
    } catch (error) {
        return null
    }
}

module.exports = getUserFromToken;