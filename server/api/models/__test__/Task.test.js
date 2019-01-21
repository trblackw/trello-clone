const Task = require("../Task");
//TODO: test for unique Taskname
describe("Task model", () => {
  test("author is required", async () => {
    expect.assertions(1);
    try {
      await Task.create({
        title: "go to store",
        description: "lorem ipsum doloris",
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test("title is required", async () => {
    expect.assertions(1);
    try {
      await Task.create({
        author: "jimJamboJangles",
        description: "lorem ipsum doloris",
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
  test("description is required", async () => {
    expect.assertions(1);
    try {
      await Task.create({
         author: "jimJamboJangles",
         title: "go to store",
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
