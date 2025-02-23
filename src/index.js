import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

console.log("PORT", process.env.PORT);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
