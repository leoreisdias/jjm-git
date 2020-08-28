module.exports = function parseStringAsArray(string) {
    return string.split(',').map(sub => sub.trim());
}