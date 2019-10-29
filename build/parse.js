const fs = require('fs');
const config = require('./config');
const path = require('path');
const showdown = require('showdown');
const converter = new showdown.Converter();

const dstPath = path.join(__dirname, config.dst);
const srcPath = path.join(__dirname, config.src);

function parse() {
	const directories = [];
	const files = [];
	function parseDir(dirPath) {
		directories.push(dirPath);
		return new Promise((resolve, reject) => {
			fs.readdir(dirPath, { withFileTypes: true }, async (err, results) => {
				const dirPromises
				resuts.forEach(f => {
					const p = path.join(dirPath, f.name);
					if (f.isDirectory()) 
						dirPromises.push(parseDir(p));
					else
						files.push(p);

				});
				Promise.all(dirPromises)
					.then(arr => resolve(arr));
			});
		});
	}

	

}
const parseFolder = (dirPath) => {
	return new Promise((resolve, reject) => {

		fs.readdir(dirPath, { withFileTypes: true }, async (err, files) => {
			const parsePromises = files.map(f => {
				const p = path.join(dirPath, f.name);
				if (f.isDirectory())
					return parseFolder(p);
				else
					return parseFile(p);

			});
			Promise.all(parsePromises)
				.then(arr => resolve(arr));
		});
	});
}
const readFile = (path) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		})
	});
}
const parseFile = (filePath) => {
	return new Promise((resolve, reject) => {
		readFile(filePath).then(text => {
			resolve(converter.makeHtml(text));
		});
	});


}

const parseFiles = (paths) => {
	return paths.map(parseFile);
}



parseFolder(srcPath);