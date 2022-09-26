import { RouterContext } from "oak";
import { ObjectId } from "mongo";
import db from "./mongodb.ts";

export interface INote {
  title: string;
  body: string;
  date?: Date;
  _id?: ObjectId;
}

const notesCollection = db.collection("notes");

const getNotes = async (ctx: RouterContext) => {
  // Get Notes from MongoDB
  const notes = await notesCollection.find().toArray();
  // Return output
  ctx.response.body = notes;
};

const getSingleNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  // Get single note
  const note = await notesCollection.findOne({
    _id: new ObjectId(id),
  });
  // Return output
  ctx.response.body = note;
};

const createNote = async (ctx: RouterContext) => {
  // Get title and body from request
  const { title, body } = await ctx.request.body().value;
  // Create Note object
  const note: INote = {
    title,
    body,
    date: new Date(),
  };
  // Insert Note in MongoDB
  const id = await notesCollection.insertOne(note);

  note._id = id;
  // Return with success response
  ctx.response.status = 201;
  ctx.response.body = note;
};

const updateNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  // Get title and body from request
  const { title, body } = await ctx.request.body().value;

  const { modifiedCount } = await notesCollection.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        title,
        body,
      },
    },
  );

  if (!modifiedCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Note does not exist" };
    return;
  }

  ctx.response.body = await notesCollection.findOne({
    _id: new ObjectId(id),
  });
};

const deleteNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const count = await notesCollection.deleteOne({
    _id: new ObjectId(id),
  });
  if (!count) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Note does not exist" };
    return;
  }

  ctx.response.status = 204;
};

const deleteNotes = async (ctx: RouterContext) => {
  const count = await notesCollection.deleteMany({});
  if (!count) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Notes already empty" };
    return;
  }
  ctx.response.status = 204;
};

export {
  createNote,
  deleteNote,
  deleteNotes,
  getNotes,
  getSingleNote,
  updateNote,
};
