import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as listingService from "../../services/listingService";

const ListingForm = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    postcode: "",
    condition: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const ListingData = await listingService.show(id);
      setFormData(ListingData);
    };
    if (id) fetchListing();
  }, [id]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formData._id = id;
    props.handleSubmit(formData); // might be add! might be update!
  };

  return (
    <main className="h-100 d-flex justify-content-center">
      <form onSubmit={handleSubmit} style={{ width: "50%"}}>
        <h1>{id ? "Edit listing" : "New listing"}</h1>
        <div className="mb-3">
          <label htmlFor="title-input" className="form-label">
            Title
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="title-input"
            name="title"
            placeholder="What do you want to sell?"
            value={formData.title}
            onChange={handleChange}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="description-input" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            name="description"
            id="description-input"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short description about the listing"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="category-input" className="form-label">
            Category
          </label>
          <select
            required
            className="form-control form-select"
            name="category"
            id="category-input"
            value={formData.category}
            onChange={handleChange}
          >
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
          <label htmlFor="price-input" className="form-label">
            Price
          </label>
          <input
            required
            className="form-control"
            type="number"
            name="price"
            id="price-input"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postcode-input" className="form-label">
            Postcode
          </label>
          <input
            required
            type="number"
            name="postcode"
            id="postcode-input"
            value={formData.postcode}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="condition-input" className="form-label">
            Category
          </label>
          <select
            required
            className="form-control form-select"
            name="condition"
            id="condition-input"
            value={formData.condition}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Used - like new">Used - like new</option>
            <option value="Used - good">Used - good</option>
            <option value="Used - fair">Used - fair</option>
          </select>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary mb-3">
            SUBMIT
          </button>
        </div>
      </form>
    </main>
  );
};

export default ListingForm;
