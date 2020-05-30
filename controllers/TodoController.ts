import connectionDatabse from "../database/index.ts";

const connection = await connectionDatabse();

async function getAllTodos(context: any) {
  try {
    const result = await connection.query("SELECT * FROM todo;");

    context.response.body = result.rowsOfObjects();
  } catch (err) {
    console.log(err);
    context.throw(err);
  }
}

async function getOneTodo(context: any) {
  try {
    if (context.params && context.params.id) {
      const result = await connection.query(`SELECT * FROM todo WHERE id = ${context.params.id};`);

      context.response.body = result.rowsOfObjects();
    }
  } catch (err) {
    console.log(err);
    context.throw(err);
  }
}

async function createTodo(context: any) {
  try {
    if (context.request.hasBody) {
      const body = await context.request.body({
        contentTypes: {
          text: ["application/json"],
        },
      })

      const { title, description } = body.value;

      const result = await connection
        .query(`INSERT INTO todo (title, description) 
                VALUES ('${title}', '${description}') 
                RETURNING *;`);

      context.response.body = result.rowsOfObjects();
    }
  } catch (err) {
    console.log(err);
    context.throw(err);
  }
}

async function deleteTodo(context: any) {
  try {
    if (context.params && context.params.id) {
      const result = await connection.query(`DELETE FROM todo WHERE id = ${context.params.id} RETURNING *;`);

      if (result.rowCount) {
        context.response.body = { message: "Todo is deleted" };
      } else {
        context.response.body = { message: "Todo not found" };
      }
    }
  } catch (err) {
    console.log(err);
    context.throw(err);
  }
}

async function updateTodo(context: any) {
  try {
    if (context.request.hasBody && context.params && context.params.id) {
      const body = await context.request.body({
        contentTypes: {
          text: ["application/json"],
        },
      })

      const { title, description } = body.value;

      const result = await connection
        .query(`UPDATE todo 
                SET title = '${title}', description = '${description}' 
                WHERE id = ${context.params.id} 
                RETURNING *;`);

      context.response.body = result.rowsOfObjects();
    }
  } catch (err) {
    console.log(err);
    context.throw(err);
  }
}

export { getAllTodos, getOneTodo, createTodo, deleteTodo, updateTodo };