import { useState } from "react";

const BookCard = (props) => {
  // get default status with check local storage
  const setTextStatus = () => {
    if (props.status === true) {
      return "Added";
    } else {
      return "Add";
    }
  };

  const [statusText, setStatusText] = useState(setTextStatus);
  const [status, setStatus] = useState(props.status);

  // add to localstorage and get new status
  const onAddBookmark = () => {
    console.log(status);
    if (!status) {
      props.addToBookmark(props.book.id);
      setStatus(true);
      setStatusText("Added");
    } else {
      props.removeFromBookmark(props.book.id);
      setStatus(false);
      setStatusText("Add");
    }
  };

  return (
    <div className="book-card border-2 flex justify-between items-end p-2">
      <div className="flex">
        <img
          src={props.book.cover_url}
          alt={props.book.title}
          className="w-20 mr-4"
        />
        <div>
          <p className="font-bold">{props.book.title}</p>
          <p>{props.book.authors}</p>
        </div>
      </div>
      <p onClick={onAddBookmark} className="cursor-pointer">
        {statusText}
      </p>
    </div>
  );
};

export default BookCard;
