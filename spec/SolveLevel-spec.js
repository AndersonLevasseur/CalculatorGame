const SolveLevel = require("../SolveLevel.js");

describe ("solves 1 move level", () => {
    
    it('solves starting number 13, end number 31, reverse, 1 move', () => {
        let level = new SolveLevel(["R"], 13, 1, 31);
        expect(level.solve()).toEqual(["Reverse"]);
    });

    it('solves starting number 13, end number -13, *-1, 1 move', () => {
        let level = new SolveLevel(["*-1"], 13, 1, -13);
        expect(level.solve()).toEqual(["*-1"]);
    });

    it('solves starting number 13, end number 130, *10, 1 move', () => {
        let level = new SolveLevel(["*10"], 13, 1, 130);
        expect(level.solve()).toEqual(["*10"]);
    });

    it('solves starting number 13, end number 1, del, 1 move', () => {
        let level = new SolveLevel(["del"], 13, 1, 1);
        expect(level.solve()).toEqual(["Delete Digit"]);
    });
});


describe("2 or less move level", () => {

    it("solves starting number 0, end number 2, +1, 2 moves", () => {
        let level = new SolveLevel(["+1"], 0, 2, 2);
        expect(level.solve()).toEqual(["+1", "+1"]);
    });

    it("solves starting number 0, end number 2, +1, -1, 2 moves", () => {
        let level = new SolveLevel(["+1", "-1"], 0, 2, 2);
        expect(level.solve()).toEqual(["+1", "+1"]);
    });

    it("solves starting number 0, end number 3, +2, -1, 2 moves", () => {
        let level = new SolveLevel(["+2", "-1"], 0, 3, 3);
        expect(level.solve()).toEqual(["+2", "+2", "-1"]);
    });

    it("solves starting number 0, end number -1, +1, -2, 2 moves", () => {
        let level = new SolveLevel(["+1", "-2"], 0, 2, -1);
        expect(level.solve()).toEqual(["+1", "-2"]);
    });
});

describe ("3 move level", () => {

    it("solves starting number 0, end number 4, +1, *2, 3 moves", () => {
        let level = new SolveLevel(["+1", "*2"], 0, 3, 4);
        expect(level.solve()).toEqual(["+1", "+1", "*2"]);
    });

    it("solves starting number 1, end number 8, *2, -3, +1, 3 moves", () => {
        let level = new SolveLevel(["*2", "-3", "+1"], 1, 3, 8);
        expect(level.solve()).toEqual(["*2", "*2", "*2"]);
    });

    it("solves starting number 0, end number 101, 1, 0, 3 moves", () => {
        let level = new SolveLevel(["0", "1"], 0, 3, 101);
        expect(level.solve()).toEqual(["Add Digit 1", "Add Digit 0", "Add Digit 1"]);
    });
});

describe ("4+ move level", () => {

    it("solves starting number 0, end number 5, +1, *2, 4 moves", () => {
        let level = new SolveLevel(["+1", "*2"], 0, 4, 5);
        expect(level.solve()).toEqual(["+1", "+1", "*2", "+1"]);
    });

    it('returns "no solution" when given an unsolvable level', () => {
        let level = new SolveLevel(["-1", "+10", "-3"], 0, 2,-18);
        expect(level.solve()).toEqual(["no solution"]);
    });

    it("solves starting number 0, end number 102, *4, Add Digit 10, +5, reverse, 4 moves", () => {
        let level = new SolveLevel(["+5", "*4", "10", "rev"], 0, 4, 102);
        expect(level.solve()).toEqual(["+5", "*4", "Add Digit 10", "Reverse"]);
    });
});