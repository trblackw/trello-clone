const Organization = require("../Organization");
//TODO: test for unique Organizationname
describe("Organization model", () => {
  test("name is required", async () => {
    expect.assertions(1);
    try {
      await Organization.create({
        boards: [{ board1: "board1", board2: "board2" }]
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
