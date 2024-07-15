import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const ListingList = (props) => {
  const listingListItems = props.listings.map((listing) => (
    <Link
      key={listing._id}
      className="card"
      style={{ width: "18rem" }}
      to={"/listings/" + listing._id}
    >
      <img
        src="https://placehold.co/400x300.png"
        className="card-img-top"
        alt="..."
      ></img>
      <div className="card-body">
        <h5 className="card-title">{listing.title}</h5>
        <h6 className="card-title">${listing.price}</h6>
        <p className="card-text">{listing.description}</p>
        {/* <a href="#" className="btn btn-primary">
          Make a bid
        </a> */}
      </div>
    </Link>
  ));

  return <main className="listing-container">{listingListItems}</main>;
};

export default ListingList;
