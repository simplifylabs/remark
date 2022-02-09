import { consume } from "@queue";

consume("test", () => {
  console.log("Test");
});
