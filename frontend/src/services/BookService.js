import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/books";

class BookService {

  getAllBooks() {
    return axios.get(`${BASE_URL}/all`);
  }

  addBook(book) {
    return axios.post(`${BASE_URL}/add`, book);
  }

  deleteBook(isbn) {
    return axios.delete(`${BASE_URL}/${isbn}`);
  }

  searchByTitle(title) {
    return axios.get(`${BASE_URL}/title/${title}`);
  }

  searchByAuthor(author) {
    return axios.get(`${BASE_URL}/author/${author}`);
  }

  searchByGenre(genre) {
    return axios.get(`${BASE_URL}/genre/${genre}`);
  }

  searchByPrice(min, max) {
    return axios.get(
      `${BASE_URL}/price?min=${min}&max=${max}`
    );
  }

}

export default new BookService();