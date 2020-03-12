const cutString = (string, delimiter) => {
    let arrayStrings = string.split(delimiter);
    return arrayStrings[0];
}

export default cutString;