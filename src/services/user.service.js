import createApiClient from "./api.service";

class UserService {
  constructor(baseUrl = "https://dbook-server.onrender.com/api/v1/users") {
    this.api = createApiClient(baseUrl);
  }
  async login(data) {
    return await this.api.post("/login", data);
  }
  async signup(data) {
    return await this.api.post("/signup", data);
  }
  async logout() {
    try {
      return await this.api.get("/logout");
    } catch (err) {
      console.error(err);
    }
  }
  async getUser(id) {
    return await (
      await this.api.get(`${id}`)
    ).data.data.user;
  }
}

export default new UserService();
