const fs = require('fs');

const PF_SRT = (function() {
	//SRT format
	const pattern = /(\d+)\n([\d:,]+)\s+-{2}\>\s+([\d:,]+)\n([\s\S]*?(?=\n{2}|$))/gm;
	let _regExp;

	const init = function() {
		_regExp = new RegExp(pattern);
	};
	const parse = function(f) {
		if (typeof f != 'string') throw 'Parser accepts strings only.';

		let result = [];
		if (f == null) return _subtitles;

		f = f.replace(/\r\n|\r|\n/g, '\n');

		while ((matches = pattern.exec(f)) != null) {
			result.push(toLineObj(matches));
		}
		return result;
	};
	const toLineObj = function(group) {
		return {
			line: group[1],
			startTime: group[2],
			endTime: group[3],
			text: group[4],
		};
	};
	init();
	return {
		parse: parse,
	};
})();

module.exports = {
	cleanFile: filePath => {
		const data = fs.readFileSync(filePath, 'utf8');
		const processedFile = PF_SRT.parse(data);

		const justText = processedFile
			.map(function(item) {
				return item.text;
			})
			.join(' ');

		// const sanitizedText = justText.replace(/\s\s+/g, ' ');
		const sanitizedText = justText
			.replace(/[^\w\s]|_/g, '')
      .replace(/\s+/g, ' ');
      
		fs.writeFileSync('result.txt', sanitizedText);
		return true;
	},
};
