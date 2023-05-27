import { Application } from 'https://deno.land/x/oak@v12.5.0/mod.ts';

import todosRoutes from './routes/todos.ts';

const app = new Application();

app.use(async (_, next) => {
  console.log('Middleware!');
  await next();
});

app.use(async (ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', '*');
  ctx.response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE'
  );
  ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

await app.listen({ port: 8000 });