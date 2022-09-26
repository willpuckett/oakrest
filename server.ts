import { Application, Router } from "oak";
import * as routes from "./routes.ts";
const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "Welcome to notes API";
  })
  .get("/notes", routes.getNotes)
  .post("/note", routes.createNote)
  .get("/note/:id", routes.getSingleNote)
  .put("/note/:id", routes.updateNote)
  .delete("/note/:id", routes.deleteNote)
  .delete("/notes", routes.deleteNotes);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 7500 });
console.log("it's working now");
