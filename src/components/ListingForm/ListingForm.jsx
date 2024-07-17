import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as listingService from "../../services/listingService";

const ListingForm = (props) => {
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Tools",
    price: "",
    postcode: "",
    condition: "New",
    image: "",
  });

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "react-cloudinary");
    data.append("cloud_name", "djaedfrag");
    return fetch("https://api.cloudinary.com/v1_1/djaedfrag/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

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

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (image) {
        const data = await uploadImage(image);
        setFormData({ ...formData, image: data.url });
        formData.image = data.url;
        formData._id = id;
        props.handleSubmit(formData); // might be add! might be update!
      } else {
        setImage("");
      }
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-100 d-flex justify-content-center">
      <form onSubmit={handleSubmit} style={{ minWidth: "600px" }}>
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
            Condition
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
          <label className="form-label">Image</label>
          <input
            onChange={handleImageChange}
            type="file"
            name="image"
            className="form-control"
          />
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
