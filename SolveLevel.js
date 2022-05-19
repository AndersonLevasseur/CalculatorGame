
const Key = require("./Key.js");

module.exports = class SolveLevel {
    /*fill out*/
    /* If it's adding a number just put the number directly, otherwise make it a string*/
    /* If +/- is a key replace it with *-1 */
    constructor(userKeyArr, startingNum, numberOfMoves, targetNum) {
        this.userKeyArr = userKeyArr;
        this.startingNum = startingNum;
        this.targetNum = targetNum;
        this.numberOfMoves = numberOfMoves;
        this.done = false;
        this.first = 0;
        this.solution = [];
        this.keyArr = [];
    }

    solve(keyArr, startingNum, numberOfMoves, lastKeyNum) {
        //   converts userKeyArr to an array with Key objects
        this.userKeyArr.forEach(element => {
            this.convertToKey(element);
        });
        if (this.done) {
            return
        }
        if (startingNum === this.targetNum) {
            this.done = true;
        } else if (numberOfMoves === 0 || this.done) {
            return this.solution;
        } else {
            for (let i = 0; i < keyArr.length; i++) {
                startingNum = this.identify(this.keyArr[i], startingNum);
                this.solve(keyArr, startingNum, numberOfMoves - 1, i);
                if (this.done) {
                    if (this.keyArr[i] === "reverse") {
                        this.solution.unshift("reverse");
                    } else if (this.keyArr[i].add === true) {
                        this.solution.unshift(`+${this.keyArr[i].value}`);
                    } else if (this.keyArr[i].subtract === true) {
                        this.solution.unshift(`-${this.keyArr[i].value}`);
                    } else if (this.keyArr[i].multiply === true) {
                        this.solution.unshift(`*${this.keyArr[i].value}`);
                    } else if (this.keyArr[i].divide === true) {
                        this.solution.unshift(`/${this.keyArr[i].value}`);
                    } else if (this.keyArr[i].addDigit === true) {
                        this.solution.unshift(this.keyArr[i].value);
                    }
                    return this.solution;
                }
            }
        }
        if (this.done === false) {
            return "no solution"
        }
    };

    identify(key, startingNum) {
        if (key === "reverse") {
            this.reverse(startingNum);
            return startingNum;
        } else if (key.add === true) {
            startingNum += key.value;
            return startingNum;
        } else if (key.subtract === true) {
            startingNum -= key.value;
            return startingNum;
        } else if (key.multiply === true) {
            startingNum *= key.value;
            return startingNum;
        } else if (key.divide === true) {
            startingNum /= key.value;
            return startingNum;
        } else if (key.addDigit === true) {
            startingNum = (startingNum * 10) + key.value;
            return startingNum;
        }
    };

    reverse(num) {
        numString = num.toString();
        let reversedNum

        if (numString.slice(0, 1) === "-") {

        }

        while (numString.length !== 0) {
            reversedNum += numString.slice(numString.length - 1);
            numString = numString.slice(0, numString.length - 1);
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
                    key = new Key(null);
                    key.reverse = true;
                    this.keyArr.push(key);
                } else if (keyAsString.slice(0, 1) === "+") {
                    keyNum = keyAsString.replace(" ", "");
                    keyNum = keyNum.slice(keyAsString.length - 1);
                    keyNum = Number(keyNum);
                    key = new Key(keyNum);
                    key.add = true;
                    this.keyArr.push(key);
                } else if (keyAsString.slice(0, 1) === "-") {
                    keyNum = keyAsString.replace(" ", "");
                    keyNum = keyNum.slice(keyAsString.length - 1);
                    keyNum = Number(keyNum);
                    key = new Key(keyNum);
                    key.subtract = true;
                    this.keyArr.push(key);
                } else if (keyAsString.slice(0, 1) === "*") {
                    keyNum = keyAsString.replace(" ", "");
                    keyNum = keyNum.slice(keyAsString.length - 1);
                    keyNum = Number(keyNum);
                    key = new Key(keyNum);
                    key.multiply = true;
                    this.keyArr.push(key);
                } else if (keyAsString.slice(0, 1) === "/") {
                    keyNum = keyAsString.replace(" ", "");
                    keyNum = keyNum.slice(keyAsString.length - 1);
                    keyNum = Number(keyNum);
                    key = new Key(keyNum);
                    key.divide = true;
                    this.keyArr.push(key);
                } else if (typeof keyAsString.replace(" ", "") === "number") {
                    keyAsString = keyAsString.replace(" ", "");
                    key = new Key(keyNum);
                    key.addDigit = true;
                    this.keyArr.push(key);
                } else {
                    throw "Error : Can't Identify Key passed"
                }
            } else if (typeof keyAsString === "number") {
                key = new Key(keyNum);
                key.addDigit = true;
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



