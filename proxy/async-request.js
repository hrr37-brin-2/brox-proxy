const request = require('request')

module.exports.get = async (url) =>
    new Promise((resolve, reject) => {
        request(url, (error, response, data) => {
            if(error) reject(error)
            else resolve(data)
        })
    })

module.exports.post = async (options) =>
new Promise((resolve, reject) => {
    request.post(options, (error, response, data) => {
        if(error) reject(error)
        else resolve(data)
    })
})