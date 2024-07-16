import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthedUserContext } from "../App";
import * as listingService from "../../services/listingService";

const ListingDetails = (props) => {
  const [listing, setListing] = useState(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidFormData, setbidFormData] = useState({ price: 1 });

  const user = useContext(AuthedUserContext);

  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const listing = await listingService.show(id);
      setListing(listing);
    };
    fetchListing();
  }, [id]);

  const submitBid = async () => {
    // todo create a bid for this listing
    const newBid = await listingService.createBid(listing._id, bidFormData);
    setListing({ ...listing, bids: [...listing.bids, newBid] });
    setShowBidForm(false);
  };

  const onBidFormChange = (event) => {
    if (
      event.target.name === "price" &&
      event.target.value &&
      event.target.value < 1
    ) {
      return;
    }
    setbidFormData({ ...bidFormData, [event.target.name]: event.target.value });
  };

  // Conditional rendering
  if (listing === null) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <header>
        <p className="lead" style={{ textTransform: "uppercase" }}>
          {listing.category}
        </p>
      </header>

      <section>
        <div
          id="myModal"
          className="modal-div"
          style={{ display: showBidForm ? "block" : "none" }}
        >
          <div className="modal-content-div">
            <span
              className="modal-close-btn"
              onClick={() => setShowBidForm(false)}
            >
              &times;
            </span>
            <div>
              <label htmlFor="price-input" className="form-label">
                Price
              </label>

              <input
                className="form-control me-2 w-50 d-inline mx-4"
                type="number"
                name="price"
                id="price-input"
                value={bidFormData.price}
                onChange={onBidFormChange}
                min={1}
              ></input>
              <div style={{ textAlign: "center" }}>
                <button
                  className="btn btn-primary btn-m mx-3 px-5 py-2 mt-4"
                  onClick={submitBid}
                >
                  Submit bid
                </button>
              </div>
            </div>
          </div>
        </div>

        <img src="https://placehold.co/400x300.png" />
        <h2 className="display-4">{listing.title}</h2>
        <h4 className="h4">${listing.price}</h4>
        <p>
          {listing.seller.username} posted on{" "}
          {new Date(listing.createdAt).toLocaleDateString()}
        </p>
        <p>{listing.description}</p>
        <p>Condition: {listing.condition}</p>
        <p>Pick up: {listing.postcode}</p>
        <h2>Bids</h2>

        {listing.bids.length === 0 && <p>No bids yet.</p>}
        {listing.bids.map((bid) => (
          <article key={bid._id}>
            <header>
              <p>
                ${bid.price} bid made by {bid.bidder.username} on{" "}
                {new Date(bid.createdAt).toLocaleDateString()}
              </p>
            </header>
          </article>
        ))}

        {listing.seller._id === user._id && (
          <>
            <Link
              className="btn btn-primary btn-m px-5 py-2 mt-2"
              to={`/listings/${listing._id}/edit`}
            >
              Edit
            </Link>
            <button
              className="btn btn-primary btn-m mx-3 px-5 py-2 mt-2"
              onClick={() => props.handleDeleteListing(listing._id)}
            >
              Delete
            </button>
          </>
        )}

        {listing.seller._id !== user._id && (
          <>
            <button
              className="btn btn-primary btn-m mx-3 px-5 py-2 mt-2"
              onClick={() => setShowBidForm(true)}
              type="button"
            >
              Make a bid
            </button>
          </>
        )}
      </section>
    </main>
  );
};

export default ListingDetails;
