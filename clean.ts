// Remove All Notes from Database
import { INote } from "./routes.ts";

const notes = await fetch("http://localhost:7500/notes");
const json = await notes.json();

json.forEach((element: INote) => {
  const id = element._id;
  fetch(`http://localhost:7500/note/${id}`, { method: "DELETE" })
    .then(() => console.log(`Deleted id: ${id}`));
});
