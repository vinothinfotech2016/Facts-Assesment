import axios from "axios";
const appApi = axios.create({
  baseURL: "http://localhost:3000",
});

export default appApi;

let formData = new FormData();

formData.append("sasas", "");
formData.append("sasas", "");
