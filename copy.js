const fs = require("fs-extra");
const path = require("path");
try {
fs.removeSync(path.resolve(__dirname, process.argv[3]));
console.log('rmed');
} catch(e){console.log('rmer', e)}
try {
fs.rmdirSync(path.resolve(__dirname, process.argv[3]));
console.log('rmdired');
} catch(e){console.log('rmdirer', e)}
try {
fs.copySync(path.resolve(__dirname, process.argv[2]), path.resolve(__dirname, process.argv[3]), {
  overwrite: true,
  errorOnExist: false,
});
console.log('cped');
} catch(e){console.log('cper', e)}