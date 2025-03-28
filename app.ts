import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// GET all users
app.get("/hi", (req: Request, res: Response) => {
  res.json("Hi");
});

// GET all users
app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

// GET a single user by ID
app.get("/users/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

// POST a new user
app.post("/users", (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const newUser: User = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE a user
app.delete("/users/:id", (req: Request, res: Response) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users.splice(index, 1);
  res.status(204).send();
});

export default app;
