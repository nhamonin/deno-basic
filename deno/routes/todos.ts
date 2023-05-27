import { Router } from 'https://deno.land/x/oak@v12.5.0/mod.ts';
import { ObjectId } from 'https://deno.land/x/mongo@v0.31.2/mod.ts';

import { getDb } from '../helpers/db_client.ts';

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

interface TodoDbFormat {
  _id: ObjectId;
  text: string;
}

router.get('/todos', async (ctx) => {
  const todos = (await getDb()
    .collection('todos')
    .find({})
    .toArray()) as TodoDbFormat[];
  const transformedTodos = todos.map((todo: TodoDbFormat) => {
    return { id: todo._id.toString(), text: todo.text };
  });

  ctx.response.body = { todos: transformedTodos };
});

router.post('/todos', async (ctx) => {
  const data = await ctx.request.body().value;
  const newTodo: Todo = {
    text: data.text,
  };
  const id = await getDb().collection('todos').insertOne(newTodo);
  newTodo.id = id.$oid;

  ctx.response.body = { message: 'Created todo!', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId;
  const data = await ctx.request.body().value;

  await getDb()
    .collection('todos')
    .updateOne({ _id: new ObjectId(tid) }, { $set: { text: data.text } });

  const updatedTodo = (await getDb()
    .collection('todos')
    .findOne({ _id: new ObjectId(tid) })) as TodoDbFormat;

  ctx.response.body = { message: 'Updated todo', updatedTodo };
});

router.delete('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId;

  await getDb()
    .collection('todos')
    .deleteOne({ _id: new ObjectId(tid) });

  ctx.response.body = { message: 'Deleted todo' };
});

export default router;
