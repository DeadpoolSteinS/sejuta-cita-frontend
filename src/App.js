import axios from "axios";
import React from "react";
import BookCard from "./components/BookCard";
import NavBar from "./components/NavBar";
import Search from "./components/Search";

class App extends React.Component {
  booksUri = "/fee-assessment-books";
  categoriesUri = "/fee-assessment-categories";

  constructor() {
    super();
    this.state = {
      categories: [],
      categoryId: 1, // masih static
      books: [],
      booksNoFilter: [],
      page: 0,
      size: 10,
      totalBooks: 0,
      bookmark: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.getBookmark();
    this.fetchBooks();
    this.getLengthBooks();
  }

  fetchCategories = () => {
    axios
      .get(this.categoriesUri, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => {
        this.setState({
          categories: res.data,
        });
      });
  };

  fetchBooks = async () => {
    await axios
      .get(
        this.booksUri +
          "?categoryId=" +
          this.state.categoryId +
          "&page=" +
          this.state.page +
          "&size=" +
          this.state.size,
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        } // set header core
      )
      .then((res) => {
        this.setState({
          books: res.data,
          booksNoFilter: res.data,
        });
      });
  };

  getLengthBooks = () => {
    axios
      .get(
        this.booksUri + "?categoryId=" + this.state.categoryId,
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        } // set header core
      )
      .then((res) => {
        this.setState({
          totalBooks: res.data.length,
        });
      });
  };

  getBookmark = async () => {
    let list = localStorage.getItem("bookmark");

    if (list) {
      await this.setState({
        bookmark: JSON.parse(list),
      });
    } else {
      await this.setState({
        bookmark: [],
      });
    }
  };

  setBookmark = async () => {
    await localStorage.setItem("bookmark", JSON.stringify(this.state.bookmark));
  };

  changeCategory = async (id) => {
    await this.setState({
      categoryId: id,
      page: 0,
    });
    this.fetchBooks();
    this.getLengthBooks();
  };

  changePage = async (val) => {
    let limitPage = parseInt((this.state.totalBooks - 1) / this.state.size);

    if (
      (this.state.page > 0 && val === -1) ||
      (this.state.page < limitPage && val === 1)
    ) {
      await this.setState({
        page: this.state.page + val,
      });
      await this.fetchBooks();
    }
  };

  changeSize = async (size) => {
    await this.setState({
      size: size,
    });
    await this.fetchBooks();
  };

  addToBookmark = async (val) => {
    await this.setState({
      bookmark: [...this.state.bookmark, val],
    });
    await this.setBookmark();
  };

  removeFromBookmark = async (val) => {
    let arr = this.state.bookmark.filter((e) => {
      return e !== val;
    });

    await this.setState({
      bookmark: arr,
    });
    await this.setBookmark();
  };

  checkStatus(val) {
    return this.state.bookmark.includes(val);
  }

  filterSearch = async (val) => {
    await this.setState({
      books: this.state.booksNoFilter.filter((e) => {
        return e.title !== val;
      }),
    });
  };

  render() {
    return (
      <div className="App max-w-5xl mx-auto p-4">
        <NavBar
          categories={this.state.categories}
          changeCategory={this.changeCategory}
          changePage={this.changePage}
          page={this.state.page}
          changeSize={this.changeSize}
          size={this.state.size}
        />
        <Search onChange={this.filterSearch} />
        <div className="grid gap-2 grid-cols-auto">
          {this.state.books.map((book) => {
            let status = this.checkStatus(book.id);
            return (
              <BookCard
                key={book.id}
                book={book}
                addToBookmark={this.addToBookmark}
                removeFromBookmark={this.removeFromBookmark}
                status={status}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
