function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getKey(map, value) {
    return [...map].find(([key, val]) => val == value)[0]
}

export { capitalizeFirstLetter, getKey };