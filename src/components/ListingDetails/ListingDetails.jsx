import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

// import CommentForm from "../CommentForm/CommentForm";

import { AuthedUserContext } from "../App";

import * as listingService from "../../services/listingService";

const ListingDetails = (props) => {
  const [listing, setListing] = useState(null);

  const user = useContext(AuthedUserContext);

  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const listing = await listingService.show(id);
      setListing(listing);
    };
    fetchListing();
  }, [id]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await listingService.createComment(
      listing._id,
      commentFormData
    );
    setListing({ ...listing, comments: [...listing.comments, newComment] });
  };

  // Conditional rendering
  if (listing === null) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <header>
        <p style={{ textTransform: "uppercase" }}>{listing.category}</p>
        <h1>{listing.title}</h1>
        <p>
          {listing.author.username} posted on{" "}
          {new Date(listing.createdAt).toLocaleDateString()}
        </p>
        {listing.author._id === user._id && (
          <>
            <Link to={`/listings/${listing._id}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteListing(listing._id)}>
              Delete
            </button>
          </>
        )}
      </header>
      <p>{listing.text}</p>
    </main>
  );
};

export default ListingDetails;
