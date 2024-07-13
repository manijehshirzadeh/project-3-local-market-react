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
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{id ? "Edit listing" : "New listing"}</h1>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Description</label>
        <textarea
          required
          type="text"
          name="description"
          id="text-input"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Tools">Tools</option>
          <option value="Tools">Tools</option>
          <option value="Garden">Garden</option>
          <option value="Cloth">Cloth</option>
          <option value="Books">Books</option>
          <option value="Appliances">Appliances</option>
          <option value="Toys">Toys</option>
          <option value="Electronics">Electronics</option>
        </select>

        <label htmlFor="price-input">Price</label>
        <input
          required
          type="number"
          name="price"
          id="price-input"
          value={formData.price}
          onChange={handleChange}
        />

        <label htmlFor="postcode-input">Postcode</label>
        <input
          required
          type="number"
          name="postcode"
          id="postcode-input"
          value={formData.postcode}
          onChange={handleChange}
        />

        <label htmlFor="condition-input">Category</label>
        <select
          required
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

        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default ListingForm;
