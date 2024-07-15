import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

const initialFilterData = {
  title: "",
  category: "",
  condition: "",
};

const ListingFilter = (props) => {
  const [filterData, setFilterData] = useState(initialFilterData);

  const handleReset = (event) => {
    event.preventDefault();
    setFilterData(initialFilterData);
    props.resetFilter();
  };

  const handleChange = (event) => {
    setFilterData({ ...filterData, [event.target.name]: event.target.value });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    props.filterListing(filterData);
  };

  return (
    <div className="nav flex-column sidebar-filter">
      <h4>Filter Listings</h4>
      <div className="mb-3">
        <label htmlFor="category-input" className="form-label">
          Title
        </label>
        <input
          className="form-control me-2"
          type="search"
          name="title"
          aria-label="Search"
          value={filterData.title}
          onChange={handleChange}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="category-input" className="form-label">
          Category
        </label>
        <select
          className="form-control form-select"
          name="category"
          id="category-input"
          value={filterData.category}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="Tools">Tools</option>
          <option value="Garden">Garden</option>
          <option value="Cloth">Cloth</option>
          <option value="Books">Books</option>
          <option value="Appliances">Appliances</option>
          <option value="Toys">Toys</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="condition-input" className="form-label">
          Condition
        </label>
        <select
          className="form-control form-select"
          name="condition"
          id="condition-input"
          value={filterData.condition}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="New">New</option>
          <option value="Used - like new">Used - like new</option>
          <option value="Used - good">Used - good</option>
          <option value="Used - fair">Used - fair</option>
        </select>
      </div>
      <div className="mb-3 d-flex gap-2 justify-content-around">
        <button
          onClick={handleSearch}
          type="submit"
          className="btn btn-primary px-4"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          type="submit"
          className="btn btn-secondary px-4"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ListingFilter;
