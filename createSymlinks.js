const fs = require('node:fs');
const path = require('node:path');

const pathDirConfig = path.resolve('./configs');

// TODO: Если будет расширение конфигов, то брать из папки
const configTypes = ['frontend', 'backend'];

// const dirsConfigs = fs.readdirSync(pathDirConfig, {withFileTypes: true})
// 	.filter(dir => dir.isDirectory())
// 	.map(dir => dir.name)

// INFO: Специальные файлы, зависящие от типа сервиса
const specFiles = Object.fromEntries(
	configTypes.map((name) => {
		const folderFile = path.resolve(pathDirConfig, name);
		const items = fs.readdirSync(folderFile, {withFileTypes: true}).map((file) => ({
			type: 'file',
			name: file.name,
			source: path.resolve(file.parentPath, file.name)
		}));
		return [name, items];
	})
);

// INFO: Общая для всех сервисов папка
const pathDirShared = path.resolve('./shared');

// INFO: Общие для всех сервисов файлы
const pathSharedFiles = fs
	.readdirSync(pathDirConfig, {withFileTypes: true})
	.filter((dir) => dir.isFile())
	.map((file) => ({
		type: 'file',
		name: file.name,
		source: path.resolve(file.parentPath, file.name)
	}));

const pathDirServices = path.resolve('./services');

const services = fs.readdirSync(pathDirServices, {withFileTypes: true}).flatMap((e) => {
	const configType = e.name === 'frontend' ? 'frontend' : 'backend';

	const files = specFiles[configType].map((specFile) => ({
		...specFile,
		target: path.resolve(e.parentPath, e.name, specFile.name)
	}));

	pathSharedFiles.forEach((sharedFile) => {
		files.push({
			...sharedFile,
			target: path.resolve(e.parentPath, e.name, sharedFile.name)
		});
	});

	files.push({
		type: 'dir',
		source: pathDirShared,
		target: path.resolve(e.parentPath, e.name, 'shared')
	});

	return files;
});

services.forEach((file) => {
	const {type, source, target} = file;

	const isFileExist = fs.existsSync(target);

	if (isFileExist) {
		fs.unlinkSync(target);
	}

	console.log(`A symbolic link has been created - ${target} on file - ${source}`);
	fs.symlinkSync(source, target, type);
});
