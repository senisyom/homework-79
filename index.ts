import express from "express";
import fileDb from "./fileDb";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static("public"));
app.use("/", thingsRouter);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
};
run().catch(console.error);
