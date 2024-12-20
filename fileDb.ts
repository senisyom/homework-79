import { promises as fs } from "fs";
import {
  CategoryWithoutId,
  ICategory,
  ICategoryPlaceBrief,
  ILists,
  IPlace,
  IResource,
  IResourceBrief,
  PlaceWithoutId,
  ResourceWithoutId,
} from "./types";
import { randomUUID } from "crypto";

const fileName = "./db.json";
let lists: ILists;

const fileDb = {
  async init() {
    try {
      const fileContent = await fs.readFile(fileName);
      lists = JSON.parse(fileContent.toString());
    } catch (e) {
      lists = {
        categories: [],
        resources: [],
        places: [],
      };
    }
  },
  async getResources() {
    const resources: IResourceBrief[] = [];

    lists.resources.map((resource) => {
      const newResource = {
        id: resource.id,
        name: resource.name,
        idCategory: resource.idCategory,
        idPlace: resource.idPlace,
      };
      resources.push(newResource);
    });

    return resources;
  },
  async getCategories() {
    const categories: ICategoryPlaceBrief[] = [];

    lists.categories.map((category) => {
      const newCategory = {
        id: category.id,
        name: category.name,
      };
      categories.push(newCategory);
    });

    return categories;
  },
  async getPlaces() {
    const places: ICategoryPlaceBrief[] = [];

    lists.places.map((place) => {
      const newPlace = {
        id: place.id,
        name: place.name,
      };
      places.push(newPlace);
    });

    return places;
  },
  async getResource(id: string) {
    const resource = lists.resources.find((p) => p.id === id);
    if (resource) {
      return resource;
    } else {
      return {};
    }
  },
  async getCategory(id: string) {
    const category = lists.categories.find((p) => p.id === id);
    if (category) {
      return category;
    } else {
      return {};
    }
  },
  async getPlace(id: string) {
    const place = lists.places.find((p) => p.id === id);
    if (place) {
      return place;
    } else {
      return {};
    }
  },
  async addResource(item: ResourceWithoutId) {
    const resource: IResource = {
      ...item,
      id: randomUUID(),
    };

    lists.resources.push(resource);
    await this.save();
    return resource;
  },
  async addCategory(item: CategoryWithoutId) {
    const category: ICategory = {
      ...item,
      id: randomUUID(),
    };

    lists.categories.push(category);
    await this.save();
    return category;
  },
  async addPlace(item: PlaceWithoutId) {
    const place: IPlace = {
      ...item,
      id: randomUUID(),
    };

    lists.places.push(place);
    await this.save();
    return place;
  },
  async deleteResource(id: string) {
    let itemIndex: number | null = null;
    lists.resources.find((p, index) => {
      if (p.id === id) {
        itemIndex = index;
      }
    });
    if (itemIndex !== null) {
      lists.resources.splice(itemIndex, 1);
      await this.save();
      return lists.resources;
    }
  },
  async deleteCategory(id: string) {
    let itemIndex: number | null = null;
    let resource: IResource | null | undefined = null;
    resource = lists.resources.find((p) => p.idCategory === id);
    if (resource) {
      return false;
    }
    lists.categories.find((p, index) => {
      if (p.id === id) {
        itemIndex = index;
      }
    });
    if (itemIndex !== null) {
      lists.categories.splice(itemIndex, 1);
      await this.save();
      return lists.categories;
    }
  },
  async deletePlace(id: string) {
    let itemIndex: number | null = null;
    let resource: IResource | null | undefined = null;
    resource = lists.resources.find((p) => p.idPlace === id);
    if (resource) {
      return false;
    }
    lists.places.find((p, index) => {
      if (p.id === id) {
        itemIndex = index;
      }
    });
    if (itemIndex !== null) {
      lists.places.splice(itemIndex, 1);
      await this.save();
      return lists.places;
    }
  },
  async save() {
    await fs.writeFile(fileName, JSON.stringify(lists, null, 2));
  },
};

export default fileDb;
