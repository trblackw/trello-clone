const Column = require("../Column");
//TODO: test for unique Columnname
describe("Column model", () => {
  test("title is required", async () => {
    expect.assertions(1);
    try {
      await Column.create({
        color: "#262626",
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test("color must be valid hexidemical format (6 chars)", async () => {
    expect.assertions(1);
    try {
      await Column.create({
        color: "V4##21@",
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
