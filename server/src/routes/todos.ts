import { Router, Request, Response } from "express";
import db from "../db";

const router = Router();

// GET all todos
router.get("/", (_req: Request, res: Response) => {
  const todos = db
    .prepare("SELECT * FROM todos ORDER BY created_at DESC")
    .all() as any[];
  res.json(todos.map((t) => ({ ...t, completed: !!t.completed })));
});

// POST create todo
router.post("/", (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }
  const result = db.prepare("INSERT INTO todos (title) VALUES (?)").run(title);
  const todo = db
    .prepare("SELECT * FROM todos WHERE id = ?")
    .get(result.lastInsertRowid) as any;
  res.status(201).json({ ...todo, completed: !!todo.completed });
});

// PATCH update todo
router.patch("/:id", (req: Request, res: Response) => {
  const { title, completed } = req.body;
  const todo = db
    .prepare("SELECT * FROM todos WHERE id = ?")
    .get(req.params.id) as any;
  if (!todo) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  const newTitle = title !== undefined ? title : todo.title;
  const newCompleted =
    completed !== undefined ? (completed ? 1 : 0) : todo.completed;
  db.prepare("UPDATE todos SET title = ?, completed = ? WHERE id = ?").run(
    newTitle,
    newCompleted,
    req.params.id,
  );

  const updated = db
    .prepare("SELECT * FROM todos WHERE id = ?")
    .get(req.params.id) as any;
  res.json({ ...updated, completed: !!updated.completed });
});

// DELETE todo
router.delete("/:id", (req: Request, res: Response) => {
  const result = db
    .prepare("DELETE FROM todos WHERE id = ?")
    .run(req.params.id);
  if (result.changes === 0) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ message: "Deleted" });
});

export default router;
