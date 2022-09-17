const NavBar = (props) => {
  const onChangeCategory = (event) => {
    props.changeCategory(event.target.value);
  };

  const onChangePage = (val) => {
    props.changePage(val);
  };

  const onChangeSize = (event) => {
    props.changeSize(event.target.value);
  };

  return (
    <nav className="mb-2 middle:flex middle:justify-between">
      <div className="flex mb-2 middle:mb-0 justify-center">
        <select
          id="category"
          className="border-2 border-gray-300 rounded mr-2"
          onChange={onChangeCategory}
        >
          {props.categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <input
          type="number"
          value={props.size}
          min="1"
          onChange={onChangeSize}
          className="border-2 px-2 w-16"
        />
      </div>
      <div className="pagination flex justify-center items-center">
        <button
          className="mr-2 border-2 rounded px-2 hover:border-gray-500"
          onClick={() => onChangePage(-1)}
        >
          Prev
        </button>
        <span>{props.page + 1}</span>
        <button
          className="ml-2 border-2 rounded px-2 hover:border-gray-500"
          onClick={() => onChangePage(1)}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
