import express from "express";
import todosRouter from "./routes/todos";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
