const generateAfiaId = length => {
    let result = '';
    let timestamp = Date.parse(new Date());
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + timestamp; 
};

export default generateAfiaId;