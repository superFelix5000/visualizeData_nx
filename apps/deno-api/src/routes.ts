import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  appendAllDataEntries,
  fetchAllDataEntries,
  fetchCategoryMap,
  saveAllDataEntries,
  saveCategoryMap,
} from "../controllers/dataEntries.ts";

const router = new Router();

router
  .get("/api/v1/fetchAll", fetchAllDataEntries)
  .get("/api/v1/fetchCategoryMap", fetchCategoryMap)
  .post("/api/v1/saveCategoryMap", saveCategoryMap)
  .post("/api/v1/saveAll", saveAllDataEntries)
  .post("/api/v1/appendAll", appendAllDataEntries)
  .get("/", (ctx) => {
    ctx.response.body = "GET HTTP - server working";
  });

// .put('api/v1/:id', updateDataEntry);

export default router;
