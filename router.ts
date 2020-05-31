import { Router } from "https://deno.land/x/oak/mod.ts";
import { getAllTodos, getOneTodo, createTodo, deleteTodo, updateTodo} from "./controllers/TodoController.ts";
import { todoIsDone, getTodosDone } from './controllers/DoneTodoController.ts';

const router = new Router();

router.get("/", context => {
  context.response.type = "application/json";
  context.response.body = { message: "Todo API is running 🚀"};
})
  .get("/todos", getAllTodos)
  .get("/todos/:id", getOneTodo)
  .post("/todos", createTodo)
  .delete("/todos/:id", deleteTodo)
  .put("/todos/:id", updateTodo)
  .put("/todo-done/:id", todoIsDone)
  .get("/todo-done", getTodosDone)

export default router;