module.exports = class Key {
    constructor(value, reverse = false, add = false, subtract = false, multiply = false, divide = false, addDigit = false) {
        this.value = value;
        this.reverse = reverse;
        this.add = add;
        this.subtract = subtract;
        this.multiply = multiply;
        this.divide = divide;
        this.addDigit = addDigit;
    }

}