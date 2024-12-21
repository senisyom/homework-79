import express from "express";
import fileDb from "../fileDb";
import { CategoryWithoutId, PlaceWithoutId, ResourceWithoutId } from "../types";
import { imagesUpload } from "../multer";

const router = express.Router();

router.get("/categories", async (req, res) => {
  const categories = await fileDb.getCategories();
  return res.send(categories);
});

router.get("/categories/:id", async (req, res) => {
  const category = await fileDb.getCategory(req.params.id);
  return res.send(category);
});

router.get("/resources", async (req, res) => {
  const resources = await fileDb.getResources();
  return res.send(resources);
});

router.get("/resources/:id", async (req, res) => {
  const resource = await fileDb.getResource(req.params.id);
  return res.send(resource);
});

router.get("/places", async (req, res) => {
  const places = await fileDb.getPlaces();
  return res.send(places);
});

router.get("/places/:id", async (req, res) => {
  const place = await fileDb.getPlace(req.params.id);
  return res.send(place);
});

router.post("/categories", async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .send({ error: "Category name must be present in the request" });
  }

  const category: CategoryWithoutId = {
    name: req.body.name,
    description: req.body.description ? req.body.description : null,
  };
  const savedCategory = await fileDb.addCategory(category);

  return res.send(savedCategory);
});

router.post("/places", async (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .send({ error: "Place name must be present in the request" });
  }

  const place: PlaceWithoutId = {
    name: req.body.name,
    description: req.body.description ? req.body.description : null,
  };
  const savedPlace = await fileDb.addPlace(place);

  return res.send(savedPlace);
});

export default router;
