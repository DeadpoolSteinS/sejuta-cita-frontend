const Search = (props) => {
  const onChangeSearch = (event) => {
    props.onChange(event.target.value);
  };
  return (
    <div className="mb-2">
      <div className="border-2 rounded w-80 px-2 flex items-center mx-auto">
        <ion-icon name="search-outline"></ion-icon>
        <input
          type="text"
          className="outline-none ml-2"
          onChange={onChangeSearch}
        />
      </div>
    </div>
  );
};

export default Search;
