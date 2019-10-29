const fs = require('fs');
const config = require('./config');
const path = require('path');
const showdown = require('showdown');
const converter = new showdown.Converter();
const {structureFromDir} = require('./structure');

const dstPath = path.join(__dirname, config.dst);
const srcPath = path.join(__dirname, config.src);

const readFile = (path) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, (err, data) => {
			if(err) reject(err);
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

function parseStructure(item) {
	if(item.type === "dir") {
		if()
	} else {
		fs.readFile(path, (err, data) => {
			if (err) reject(err);
			else fs.writeFile(converter.makeHtml(text));
		})
	}
}

//parseFolder(srcPath);
structureFromDir(srcPath).then(s => {
	
})