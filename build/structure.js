const path = require('path');
const fs = require('fs');

function searchDir() {
	return 
}
//builds structure downward
function structureFromDir(dirPath) {
	return new Promise((resolve, reject) => {

		fs.readdir(dirPath, { withFileTypes: true }, async (err, files) => {
			const parsePromises =  files.map(f => {
				const p = path.join(dirPath, f.name);
				if (f.isDirectory())
					return structureFromDir(p);
				else
					return { type: "file", path: p };

			});
			Promise.all(parsePromises)
				.then(children => resolve({type: "dir", path:dirPath, children}));
		});
	});
}

//builds structure upward
function structureFromFile() {

}


module.exports = {structureFromDir, structureFromFile};