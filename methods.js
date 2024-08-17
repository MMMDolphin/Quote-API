const randomArray = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
        console.error("Error, The input must be an array");
        return undefined;
    }
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex];
};


module.exports = randomArray;
