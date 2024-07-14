import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

// import CommentForm from '../CommentForm/CommentForm';

import { AuthedUserContext } from "../App";

import * as listingService from "../../services/listingService";

const ListingDetails = (props) => {
  const [listing, setListing] = useState(null);

  const user = useContext(AuthedUserContext);
  console.log("user", user);

  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const listing = await listingService.show(id);
      setListing(listing);
    };
    fetchListing();
  }, [id]);

  // const handleAddComment = async (commentFormData) => {
  //   const newComment = await listingService.createComment(
  //     listing._id,
  //     commentFormData
  //   );
  //   setListing({ ...listing, comments: [...listing.comments, newComment] });
  // };

  // Conditional rendering
  if (listing === null) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <header>
        <p style={{ textTransform: "uppercase" }}>{listing.category}</p>
      </header>

      <section>
        <img src="https://placehold.co/400x300.png" />
        <h2>{listing.title}</h2>
        <h4>${listing.price}</h4>
        <p>
          {listing.seller.username} posted on{" "}
          {new Date(listing.createdAt).toLocaleDateString()}
        </p>
        <p>{listing.description}</p>
        <p>Condition: {listing.condition}</p>
        <p>Pick up: {listing.postcode}</p>
        <h2>Bids</h2>
        {listing.seller._id === user._id && (
          <>
            <Link to={`/listings/${listing._id}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteListing(listing._id)}>
              Delete
            </button>
          </>
        )}
        {/* <CommentForm handleAddComment={handleAddComment} /> */}
        {/* {listing.comments.length === 0 && <p>No comments.</p>}
        {listing.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.username} posted on{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))} */}
      </section>
    </main>
  );
};

export default ListingDetails;
