import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Todo API is running on http://localhost:3333 🚀");

await app.listen({ port: 3333 });

