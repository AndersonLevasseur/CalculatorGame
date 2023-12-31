
const Key = require("./Key.js");

module.exports = class SolveLevel {
    constructor(userKeyArr, startingNum, numberOfMoves, targetNum) {
        this.userKeyArr = userKeyArr;
        this.startingNum = startingNum;
        this.targetNum = targetNum;
        this.numberOfMoves = numberOfMoves;
        this.done = false;
        this.first = 0;
        this.keyArr = [];
    }

    //   converts userKeyArr to an array with Key objects
    solve() {
        this.userKeyArr.forEach(element => {
            this.convertToKey(element);
        });

        const solution = this.solved(this.numberOfMoves, this.targetNum, this.startingNum, [])

        if (solution[solution.length - 1] === "done") {
            return solution.slice(0, solution.length - 1);
        }
        return ["no solution"];

    }

    //solves the puzzle recursively
    solved(turnNum, tarNum, currNum, ans) {
        if (tarNum === currNum) {
            ans.push("done");
            return ans;
        }

        if (turnNum < 1) {
            return ans.slice(0, ans.length - 1);
        }

        for (const key of this.keyArr) {
            switch (key.mode) {
                case "rev":
                    ans.push("Reverse");
                    ans = this.solved(turnNum - 1, tarNum, this.reverse(currNum), ans);
                    break;
                case "+":
                    ans.push(`+${key.value}`);
                    ans = this.solved(turnNum - 1, tarNum, currNum + key.value, ans);
                    break;
                case "-":
                    ans.push(`-${key.value}`);
                    ans = this.solved(turnNum - 1, tarNum, currNum - key.value, ans);
                    break;
                case "*":
                    ans.push(`*${key.value}`);
                    ans = this.solved(turnNum - 1, tarNum, currNum * key.value, ans);
                    break;
                case "/":
                    ans.push(`/${key.value}`);
                    ans = this.solved(turnNum - 1, tarNum, currNum / key.value, ans);
                    break;
                case "addDig":
                    ans.push(`Add Digit ${key.value}`);
                    let numTens = 1;
                    if (key.value > 0) { numTens = Math.floor(1 + Math.log10(key.value)); }
                    ans = this.solved(turnNum - 1, tarNum, (currNum * Math.pow(10, numTens)) + key.value, ans);
                    break;
                case "del":
                    ans.push(`Delete Digit`);
                    ans = this.solved(turnNum - 1, tarNum, parseInt(currNum / 10), ans);
                    break;
                default:
                    throw "Could not find key";
            }

            if (ans[ans.length - 1] === "done") {
                return ans;
            }
        }
        return ans.slice(0, ans.length - 1);

    };

    reverse(num) {
        let numString = num.toString();
        let neg = false;
        let reversedNum = "";

        if (numString.slice(0, 1) === "-") {
            neg = true;
            numString = numString.slice(1);
        }

        while (numString.length !== 0) {
            reversedNum += numString.slice(numString.length - 1);
            numString = numString.slice(0, numString.length - 1);
        }
        reversedNum = parseInt(reversedNum);
        if (neg) {
            reversedNum *= -1;
        }
        return reversedNum;
    };

    convertToKey(keyAsString) {
        if (this.first !== this.userKeyArr.length) {
            this.first += 1;
            let key;
            let keyNum;
            if (typeof keyAsString === "string") {
                if (keyAsString.slice(0, 1) === "R" || keyAsString.slice(0, 1) === "r") {
                    key = new Key(null, "rev");
                    this.keyArr.push(key);
                } else if (keyAsString.slice(0, 1) === "+") {
                    keyNum = keyAsString.replace(" ", "");
                    keyNum = keyNum.slice(1, keyAsString.length);
                    keyNum = Number(keyNum);
                    key = new Key(keyNum, "+");
                    this.keyArr.push(key);
                } else if (keyAsString.slice(0, 1) === "-") {
                    keyNum = keyAsString.replace(" ", "");
                    keyNum = keyNum.slice(1, keyAsString.length);
                    keyNum = Number(keyNum);
                    key = new Key(keyNum, "-");
                    this.keyArr.push(key);
                } else if (keyAsString.slice(0, 1) === "*") {
                    keyNum = keyAsString.replace(" ", "");
                    keyNum = keyNum.slice(1, keyAsString.length);
                    keyNum = Number(keyNum);
                    key = new Key(keyNum, "*");
                    this.keyArr.push(key);
                } else if (keyAsString.slice(0, 1) === "/") {
                    keyNum = keyAsString.replace(" ", "");
                    keyNum = keyNum.slice(1, keyAsString.length);
                    keyNum = Number(keyNum);
                    key = new Key(keyNum, "/");
                    this.keyArr.push(key);
                } else if (keyAsString === "del") {
                    keyNum = 0;
                    key = new Key(keyNum, "del");
                    this.keyArr.push(key);
                } else if (Number(keyAsString.replace(" ", "")) != NaN) {
                    keyAsString = keyAsString.replace(" ", "");
                    keyNum = Number(keyAsString);
                    key = new Key(keyNum, "addDig");
                    this.keyArr.push(key);
                } else {
                    throw "Error : Can't Identify Key passed"
                }
            } else if (typeof keyAsString === "number") {
                key = new Key(keyNum, "addDig");
                this.keyArr.push(key);
            } else {
                throw "Error : Can't Identify Key passed"
            }
        }
    }
}

// addKey = function (startingNum, addNum) {

// };

// multiplyKey = function (startingNum, multNum) {

// };

// divisionKey = function (startingNum, divNum) {

// };



