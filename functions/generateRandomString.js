function generateRandomString(){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result= '';   
    const charactersLength = characters.length
    for ( let i = 0; i < 3; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

module.exports = generateRandomString;