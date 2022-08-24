import api from "./config";

class Userservice {
  //   getAll() {
  //     return api.get("/notifications");
  //   }
  //   get(id) {
  //     return api.get(`/notifications/${id}`);
  //   }
  create(data) {
    return api.post("/createUser", data);
  }
  //   update(id, data) {
  //     return api.put(`/notifications/${id}`, data);
  //   }
  //   delete(id) {
  //     return api.delete(`/notifications/${id}`);
  //   }
}

export default new Userservice();
