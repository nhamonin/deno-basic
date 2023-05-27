async function handleHttp(conn: Deno.Conn) {
  for await (const e of Deno.serveHttp(conn)) {
    e.respondWith(new Response('Hello World'));
  }
}

for await (const conn of Deno.listen({ port: 3000 })) {
  handleHttp(conn);
  console.log(conn.localAddr);
}
