let calcKeys = process.argv[2];
const keys = calcKeys.split(',');
let calcMoves = process.argv[3];
const moves = parseInt(calcMoves);
let calcStartingNum = process.argv[4];
const startNum = parseInt(calcStartingNum);
let calcTargetNum = process.argv[5];
const tarNum = parseInt(calcTargetNum);

const SolveLevel = require('./SolveLevel');
const level = new SolveLevel(keys, moves, startNum, tarNum);

console.log(level.solve());