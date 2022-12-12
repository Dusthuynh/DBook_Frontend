import createApiClient from "./api.service";

class ContactService {
  constructor(baseUrl = "https://dbook-server.onrender.com/api/v1/posts") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      return (await this.api.get("/")).data;
    } catch (err) {
      console.log(err);
    }
  }
  async create(data) {
    try {
      const res = await this.api.post("/", data, {
        headers: {
          Authorization: localStorage.getItem("SavedToken"),
        },
      });
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  }
  async get(slug) {
    try {
      var config = {};
      if (localStorage.User) {
        const idUser = JSON.parse(localStorage.User)._id;
        config = { headers: { idUser } };
      }
      const post = (await this.api.get(`/${slug}`, config)).data;
      return post.data;
    } catch (err) {
      console.log(err);
    }
  }
  async votePost(idPost, vote) {
    const res = (
      await this.api.patch(`vote/${idPost}`, vote, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      })
    ).data;
    return res;
  }
  async update(slug, data) {
    try {
      const res = await this.api.patch(`/${slug}`, data, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  }
  async delete(slug) {
    return await this.api.delete(`/${slug}`, {
      headers: { Authorization: localStorage.getItem("SavedToken") },
    });
  }
  async hotPosts() {
    try {
      const posts = (await this.api.get("/hotPosts")).data;
      return posts.data.posts;
    } catch (err) {
      console.log(err);
    }
  }
  async search(key) {
    try {
      const posts = (await this.api.get(`/search/:${key}`)).data;
      return posts.data.posts;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllOfBook(idBook) {
    try {
      const posts = (await this.api.get(`/postsOfBook/${idBook}`)).data;
      return posts.data.posts;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllOfUser(idUser) {
    try {
      const posts = (await this.api.get(`/postsOfUser/${idUser}`)).data;
      return posts.data.posts;
    } catch (err) {
      console.log(err);
    }
  }
}
export default new ContactService();
