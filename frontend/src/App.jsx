import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const BASE_URL = "http://localhost:8080/api/v1/books";

  const [books, setBooks] = useState([]);

  const [searchType, setSearchType] = useState("title");
  const [searchValue, setSearchValue] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [book, setBook] = useState({
    isbn: "",
    title: "",
    author: "",
    genre: "",
    price: ""
  });

  // FETCH ALL BOOKS

  const fetchBooks = async () => {

    try {

      const response = await axios.get(
        `${BASE_URL}/all`
      );

      setBooks(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  // LOAD ON PAGE START

useEffect(() => {

  const loadData = async () => {
    try{
      const response = await axios.get(
        "http://localhost:8080/api/v1/books/all"
      );
      setBooks(response.data);
    }
    catch(error){
      console.log(error);
    }
  };

  loadData();

}, []);
  // HANDLE INPUT

  const handleChange = (e) => {

    setBook({
      ...book,
      [e.target.name]: e.target.value
    });

  };

  // SAVE / UPDATE BOOK

  const saveBook = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${BASE_URL}/add`,
        book
      );

      fetchBooks();

      setBook({
        isbn: "",
        title: "",
        author: "",
        genre: "",
        price: ""
      });

    }

    catch (error) {

      console.log(error);

    }

  };

  // DELETE BOOK

  const deleteBook = async (isbn) => {

    try {

      await axios.delete(
        `${BASE_URL}/${isbn}`
      );

      fetchBooks();

    }

    catch (error) {

      console.log(error);

    }

  };

  // EDIT BOOK

  const editBook = (bookData) => {

    setBook(bookData);

  };

  // SEARCH BOOKS

  const searchBooks = async () => {

    try {

      let response;

      // TITLE

      if (searchType === "title") {

        response = await axios.get(
          `${BASE_URL}/title/${searchValue}`
        );

        setBooks([response.data]);

      }

      // AUTHOR

      else if (searchType === "author") {

        response = await axios.get(
          `${BASE_URL}/author/${searchValue}`
        );

        setBooks(response.data);

      }

      // GENRE

      else if (searchType === "genre") {

        response = await axios.get(
          `${BASE_URL}/genre/${searchValue}`
        );

        setBooks(response.data);

      }

      // PRICE

      else if (searchType === "price") {

        response = await axios.get(
          `${BASE_URL}/price?min=${minPrice}&max=${maxPrice}`
        );

        setBooks(response.data);

      }

    }

    catch (error) {

      console.log(error);

      alert("No Books Found");

    }

  };

  return (

    <div className="app">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo" >
          Library Management
        </div>

        <div className="nav-links">

          <button className="nav-btn">
            Dashboard
          </button>

          <button className="nav-btn">
            Books
          </button>

          <button className="nav-btn">
            Authors
          </button>

          <button className="nav-btn">
            Genres
          </button>

        </div>

      </nav>

      {/* HERO */}

      <div className="logo">

        

        <p className="hero-subtitle">
          Add - Update Book
        </p>

      </div>

      {/* FORM */}

      <div className="form-container">

        

        <form
          onSubmit={saveBook}
          className="book-form"
        >

          <input
            type="number"
            name="isbn"
            placeholder="ISBN"
            value={book.isbn}
            onChange={handleChange}
            className="input-field"
          />

          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={book.title}
            onChange={handleChange}
            className="input-field"
          />

          <input
            type="text"
            name="author"
            placeholder="Author"
            value={book.author}
            onChange={handleChange}
            className="input-field"
          />

          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={book.genre}
            onChange={handleChange}
            className="input-field"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={book.price}
            onChange={handleChange}
            className="input-field"
          />

          <button className="save-btn">
            Save Book
          </button>

        </form>

      </div>

      {/* SEARCH PANEL */}

      <div className="search-panel">

        <h2 className="section-title">
          Search Books
        </h2>

        <div className="search-controls">

          <select
            className="search-select"
            value={searchType}
            onChange={(e) =>
              setSearchType(e.target.value)
            }
          >

            <option value="title">
              Title
            </option>

            <option value="author">
              Author
            </option>

            <option value="genre">
              Genre
            </option>

            <option value="price">
              Price Range
            </option>

          </select>

          {
            searchType !== "price" ? (

              <input
                type="text"
                placeholder={`Search by ${searchType}`}
                className="search-input"
                value={searchValue}
                onChange={(e) =>
                  setSearchValue(e.target.value)
                }
              />

            ) : (

              <div className="price-range">

                <input
                  type="number"
                  placeholder="Min Price"
                  className="search-input"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Max Price"
                  className="search-input"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(e.target.value)
                  }
                />

              </div>

            )
          }

          <button
            className="search-btn"
            onClick={searchBooks}
          >
            Search
          </button>

          <button
            className="refresh-btn"
            onClick={fetchBooks}
          >
            Reset
          </button>

        </div>

      </div>

      {/* TABLE */}

      <div className="table-container">

        <div className="table-header">

          <h2 className="section-title">
            Book Collection
          </h2>

          <button
            className="refresh-btn"
            onClick={fetchBooks}
          >
            Refresh
          </button>

        </div>

        <table className="book-table">

          <thead>

            <tr>

              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {
              books.map((b) => (

                <tr key={b.isbn}>

                  <td>{b.isbn}</td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.genre}</td>
                  <td>₹ {b.price}</td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() => editBook(b)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteBook(b.isbn)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default App;