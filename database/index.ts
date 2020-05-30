import { Client } from "https://deno.land/x/postgres/mod.ts";

async function connectionDatabse() {
  const connection = new Client({
    user: "postgres",
    database: "todo-deno",
    password: "docker",
    hostname: "localhost",
    port: 5432,
  });
  
  await connection.connect();

  return connection;
}

export default connectionDatabse;
