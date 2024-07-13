import { Link } from "react-router-dom";

const ListingList = (props) => {
  const listingListItems = props.listings.map((listing) => (
    <Link key={listing._id} to={"/listings/" + listing._id}>
      <article className="listing">
        <header>
          <h2>{listing.title}</h2>
          <p>
            {listing.seller.username} posted on{" "}
            {new Date(listing.createdAt).toLocaleDateString()}
          </p>
        </header>
        <p>{listing.text}</p>
      </article>
    </Link>
  ));

  return <main className="listing-container">{listingListItems}</main>;
};

export default ListingList;
