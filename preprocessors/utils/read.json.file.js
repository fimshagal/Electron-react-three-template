const { readFile} = require("fs/promises");

const readJsonFile = async (filePath) => {
    try {
        const data = await readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch(error) {
        console.error(error);
        console.error("Json reading error");
        return null;
    }
};

module.exports = readJsonFile;