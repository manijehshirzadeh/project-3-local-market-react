import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const ListingList = (props) => {
  const listingListItems = props.listings.map((listing) => (
    <Link
      key={listing._id}
      className="card position-relative"
      style={{ width: "18rem", minHeight: "400px" }}
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
        <p className="card-text pb-4">{listing.description}</p>
        <p className="position-absolute bottom-0">
          {listing.bids.length !== 0
            ? "Highest bid is AU$" +
              Math.max(...listing.bids.map((bid) => bid.price))
            : "No bids yet"}
        </p>
      </div>
    </Link>
  ));

  return <main className="listing-container">{listingListItems}</main>;
};

export default ListingList;
