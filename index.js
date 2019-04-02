#!/usr/bin/env node

const program = require('commander');
const srtProcess = require('./srtProcess');
program
	.version('0.1.0')
	.option(
		'-f, --filepath [path]',
		'Specify the path for the srt file you wish to process',
	)
	.parse(process.argv);

console.log(program.filepath, 'will be cleaned up and saved to result.txt');
if (program.filepath) {
	srtProcess.cleanFile(program.filepath);
}

program.on('--help', function() {
	console.log('');
	console.log('Examples:');
	console.log('  $ custom-help --help');
	console.log('  $ custom-help -h');
});

program.parse(process.argv);
