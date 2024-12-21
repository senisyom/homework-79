import express from "express";
import resourcesRouter from "./routers/resources";
import fileDb from "./fileDb";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static("public"));
app.use("/", resourcesRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
};
run().catch(console.error);
