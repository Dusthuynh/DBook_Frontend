import createApiClient from "./api.service";

class ContactService {
  constructor(baseUrl = "https://dbook-server.onrender.com/api/v1/books") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const books = (await this.api.get("/")).data;
      return books.data.books;
    } catch (err) {
      console.log(err);
    }
  }
  async get(slug) {
    try {
      const book = (await this.api.get(`/${slug}`)).data;
      return book.data.book;
    } catch (err) {
      console.log(err);
    }
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async hotBooks() {
    try {
      const books = (await this.api.get("/hotbooks")).data;
      return books.data.books;
    } catch (err) {
      console.log(err);
    }
  }
  async search(key) {
    try {
      const books = (await this.api.get(`/search/:${key}`)).data;
      return books.data.books;
    } catch (err) {
      console.log(err);
    }
  }
}
export default new ContactService();
