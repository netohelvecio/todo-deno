import connectionDatabse from "../database/index.ts";

const connection = await connectionDatabse();

async function todoIsDone(context: any) {
  try {
    if (context.params.id) {
      const result = await connection
        .query(`UPDATE todo 
                SET is_done = true
                WHERE id = ${context.params.id} 
                RETURNING *;`);

      context.response.body = result.rowsOfObjects();
    }
  } catch (err) {
    console.log(err);
    context.throw(err);
  }
}

async function getTodosDone(context: any) {
  try {
    const result = await connection.query("SELECT * FROM todo WHERE is_done = true;");

    context.response.body = result.rowsOfObjects();
  } catch (err) {
    console.log(err);
    context.throw(err);
  }
}

export { todoIsDone, getTodosDone };