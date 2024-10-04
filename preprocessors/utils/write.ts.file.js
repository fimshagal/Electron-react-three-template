const { writeFile } = require("fs/promises");

const writeTsFile = async (filePath, data) => {
    try {
        await writeFile(filePath, data, 'utf-8');
        console.log(`File "${filePath}" was written`);
    } catch(error) {
        console.error(error);
        console.error("File writing error");
        return null;
    }
};

module.exports = writeTsFile;