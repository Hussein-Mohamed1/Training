const fs = require('fs');
const path = require('path');


const directoryToWatch = path.join(__dirname, 'watch');

if (!fs.existsSync(directoryToWatch)) {
    fs.mkdirSync(directoryToWatch);
    console.log(`Directory '${directoryToWatch}' created.`);
}


function logChange(type, filename) {
    const date = new Date().toISOString();
    console.log(`[${date}] ${type}: ${filename}`);
}


fs.watch(directoryToWatch, (eventType, filename) => {
    if (filename) {
        if (eventType === 'rename') {
            fs.access(path.join(directoryToWatch, filename), fs.constants.F_OK, (err) => {
                if (err) {
                    logChange('File deleted', filename);
                } else {
                    logChange('File created', filename);
                }
            });
        } else if (eventType === 'change') {
            logChange('File modified', filename);
        }
    }
});

console.log(`Watching for changes in ${directoryToWatch}`);

fs.watch(directoryToWatch , (event , file ) => {
    if(file) {
        if(event === 'rename') {
            fs.access(path.join(directoryToWatch , file) , fs.constants.F_OK, (err) => {
                if (err) {
                    //deleted
                } else {
                    // created
                }
            })
        } else if( event === 'change') {

        }
    }
})
