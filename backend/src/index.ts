import { HttpAPI } from "./app/server";

const httpAPI = new HttpAPI(3001);

httpAPI.run();