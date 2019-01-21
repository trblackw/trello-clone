const Label = require("../Label");
//TODO: test for unique Labelname
describe("Label model", () => {
  test("title is required", async () => {
    expect.assertions(1);
    try {
      await Label.create({
        color: "#262626",
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test("color must be valid hexidemical format (6 chars)", async () => {
    expect.assertions(1);
    try {
      await Label.create({
        color: "V4##21@",
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
