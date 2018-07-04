const { promisify } = require('util');
const { readdir, readFile, writeFile } = require('fs');
const { join } = require('path');
const readdirPromise =  promisify(readdir);
const readFilePromise =  promisify(readFile);
const writeFilePromise = promisify(writeFile);


const SRC_FOLDER = join(__dirname);
const DEST_FOLDER = join(__dirname, '..', 'app', 'src');
const STAGE_GAMES = 48;


const getFileNames = async () => {
	console.log('getting names');
	const files = await readdirPromise(SRC_FOLDER);
	const names = files.filter(f => f.endsWith('.txt'))
		.map(file => file.replace('.txt', ''));
	console.log('got names:\n', JSON.stringify(names));
	return names;
};

const getResults =  async (name) => {
	console.log(`getting results for ${name}`);
	const buffer = await readFilePromise(join(SRC_FOLDER, `${name}.txt`));
	const file = await buffer.toString('utf8');
	const results = file.split(`\n`)
		.map(res => res.split('\t\t'))
		.map((res, gameId) => {
		  const home = parseInt(res[0], 10);
		  const away = parseInt(res[1], 10);
		  const getWinner = (h, a) => {
		    if (h > a) return 1;
		    if (h < a) return 2;
		    return 3;
          };
		  const value = getWinner(home, away);
		  return {
            gameId,
            result: { home, away, value }
          };
        });
	console.log('got results', results.length);
	return results;
};

const getAllResults = async (names) => {
	console.log('getting all results');
	const results = names.map(name => getResults(name));
	return Promise.all(results);
};

const toJSON = (names, results) => {
	const data = results.reduce((acc, next, index) => {
		const key = names[index];
		if (next.length !== STAGE_GAMES) {
			throw new Error(`${key} data is incorrect!!! rows: ${JSON.stringify(next)}`);
		}
		return { ...acc, [key]: next };
	}, {});
	return JSON.stringify(data, null, '  ');
};

const writeResults = async () => {
	try {
		const names = await getFileNames();
		const results = await getAllResults(names);
		const json = toJSON(names, results);
		writeFilePromise(join(DEST_FOLDER, 'players.json'), json);
	} catch (e) {
		console.error(e);
	}
};

writeResults();
