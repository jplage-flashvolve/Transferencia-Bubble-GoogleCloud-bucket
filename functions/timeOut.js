const timeOut = (tempo) =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('*************')
        }, tempo)
    })
}

module.exports = timeOut