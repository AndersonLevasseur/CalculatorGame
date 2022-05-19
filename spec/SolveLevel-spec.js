const SolveLevel = require("../SolveLevel.js");

describe ("solves 1 move level", () => {
    
    it('solves starting number 13, end number 31, reverse, 1 move', () => {
        let level = new SolveLevel(["-1", "+10", "-3"], 0, 2,-18);
        expect(level.solve(["-1", "+10", "-3"], 0, 2, -18, null)).toEqual("no solution");
    });

});


describe("2 or less move level", () => {

    it("solves starting number 0, end number 2, +1, 2 moves", () => {
        let level = new SolveLevel(["+1"], 0, 2, 2);
        expect(level.solve(["+1"], 0, 2, 2, null)).toEqual(["+1", "+1"]);
    });

    it("solves starting number 0, end number 2, +1, -1, 2 moves", () => {
        let level = new SolveLevel(["+1", "-1"], 0, 2, 2);
        expect(level.solve(["+1", "-1"], 0, 2, 2, null)).toEqual(["+1", "+1"]);
    });

    it("solves starting number 0, end number 1, +2, -1, 2 moves", () => {
        let level = new SolveLevel(["+2", "-1"], 0, 3, 3);
        expect(level.solve(["+2", "-1"], 0, 3, null)).toEqual(["+2", "-1"]);
    });


});

describe ("3 move level", () => {

    it("solves starting number 0, end number 4, +1, *2, 3 moves", () => {
        let level = new SolveLevel(["+1", "*2"], 0, 3, 4);
        expect(level.solve(["+1", "*2"], 0, 3, null)).toEqual(["+1", "*2", "*2"]);
    });

    it("solves starting number 0, end number 7, +1, *3, +2, 3 moves", () => {
        let level = new SolveLevel(["+2", "*3", "+1"], 0, 3, 4);
        expect(level.solve(["+1", "+2", "*3"], 0, 3, null)).toEqual(["+1", "*2", "*2"]);
    });

});

describe ("4+ move level", () => {

    it("solves starting number 0, end number 5, +1, *2, 4 moves", () => {
        let level = new SolveLevel(["+1", "*2"], 0, 4, 5);
        expect(level.solve(["+1", "*2"], 0, 4, null)).toEqual(["+1", "*2", "*2", "+1"]);
    });

    it('returns "no solution" when given an unsolvable level', () => {
        let level = new SolveLevel(["-1", "+10", "-3"], 0, 2,-18);
        expect(level.solve(["-1", "+10", "-3"], 0, 2, -18, null)).toEqual("no solution");
    });

});