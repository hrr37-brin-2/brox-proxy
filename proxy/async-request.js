const request = require('request')

module.exports = async (url) =>
    new Promise((resolve, reject) => {
        request(url, (error, response, data) => {
            if(error) reject(error)
            else resolve(data)
        })
    })