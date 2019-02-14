const Board = require("../Board");
//TODO: test for unique Boardname
describe("Board model", () => {
  test("title is required", async () => {
    expect.assertions(1);
    try {
      await Board.create({
        color: "#262626",
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test("color must be valid hexidemical format (6 chars)", async () => {
    expect.assertions(1);
    try {
      await Board.create({
        color: "V4##21@",
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
