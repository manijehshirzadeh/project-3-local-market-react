import "./App.css";
import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Landing from "./Landing/Landing";
import Dashboard from "./Dashboard/Dashboard";
import SignupForm from "./SignupForm/SignupForm";
import SigninForm from "./SigninForm/SigninForm";

import * as authService from "../services/authService";
import * as listingService from "../services/listingService";
import ListingDetails from "./ListingDetails/ListingDetails";
import ListingList from "./ListingList/ListingList";
import ListingForm from "./ListingForm/ListingForm";

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [listings, setListings] = useState([]); // all users' listings

  useEffect(() => {
    const fetchAllListings = async () => {
      const allListings = await listingService.index();
      setListings(allListings);
    };
    if (user) fetchAllListings();
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleDeleteListing = async (listingId) => {
    await listingService.deleteListing(listingId);
    const remainingListings = listings.filter(
      (listing) => listing._id !== listingId
    );
    setHoots(remainingListings);
    navigate("/listings");
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route
                path="/listings"
                element={<ListingList listings={listings} />}
              />
              <Route
                path="/listings/:id"
                element={
                  <ListingDetails handleDeleteListing={handleDeleteListing} />
                }
              />
              <Route
                path="/listings/new"
                element={<ListingForm /*handleSubmit={handleAddListing}*/ />}
              />
              <Route
                path="/listings/:id/edit"
                element={<ListingForm /*handleSubmit={handleUpdateListing}*/ />}
              />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
