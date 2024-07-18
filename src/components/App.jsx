import "./App.css";
import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Landing from "./Landing/Landing";
import SignupForm from "./SignupForm/SignupForm";
import SigninForm from "./SigninForm/SigninForm";

import * as authService from "../services/authService";
import * as listingService from "../services/listingService";
import ListingDetails from "./ListingDetails/ListingDetails";
import ListingList from "./ListingList/ListingList";
import ListingForm from "./ListingForm/ListingForm";
import ListingFilter from "./ListingFilter/ListingFilter";

export const AuthedUserContext = createContext(null);

const initialFilterData = {
  title: "",
  category: "",
  condition: "",
};

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [listings, setListings] = useState([]); // all users' listings
  const [filterData, setFilterData] = useState(initialFilterData);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchAllListings();
  }, [user, filterData]);

  const fetchAllListings = async () => {
    const allListings = await listingService.index();
    setListings(filterListings(allListings));
  };

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddListing = async (listingFormData) => {
    const newListing = await listingService.create(listingFormData);
    setListings([...listings, newListing]);
    navigate("/listings");
  };

  const handleUpdateListing = async (listingFormData) => {
    console.log("listingFormData" + JSON.stringify(listingFormData));
    const updatedListing = await listingService.update(
      listingFormData._id,
      listingFormData
    );
    const updatedListingIndex = listings.findIndex(
      (listing) => listing._id === listingFormData._id
    );

    const updatedListings = [...listings];
    updatedListings[updatedListingIndex] = updatedListing;
    setListings(updatedListings);

    navigate("/listings/" + updatedListing._id);
  };

  const handleEditListing = async (listingId) => {
    navigate("/listings/" + listingId + "/edit");
  };

  const handleDeleteListing = async (listingId) => {
    await listingService.deleteListing(listingId);
    const remainingListings = listings.filter(
      (listing) => listing._id !== listingId
    );
    setListings(remainingListings);
    navigate("/listings");
  };

  const filterListings = (allListings) => {
    if (filterData) {
      return allListings.filter((listing) => {
        if (
          filterData.title &&
          !listing.title.toLowerCase().includes(filterData.title.toLowerCase())
        ) {
          return false;
        }

        if (filterData.category && listing.category !== filterData.category) {
          return false;
        }

        if (
          filterData.condition &&
          listing.condition !== filterData.condition
        ) {
          return false;
        }

        return true;
      });
    }
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <div className="p-4 d-flex justify-content-center">
          <div className="max-width w-100">
            <Routes>
              {user ? (
                <>
                  <Route
                    path="/"
                    element={<Navigate to="/listings" />}
                  />
                  <Route
                    path="/listings"
                    element={
                      <div className="d-flex justify-content-start w-100">
                        <ListingFilter
                          filterListing={setFilterData}
                          resetFilter={() => setFilterData(initialFilterData)}
                        />
                        <ListingList listings={listings} />
                      </div>
                    }
                  />
                  <Route
                    path="/my-listings"
                    element={
                      <ListingList
                        listings={listings.filter(
                          (listing) => listing.seller._id === user._id
                        )}
                      />
                    }
                  />
                  <Route
                    path="/listings/:id"
                    element={
                      <ListingDetails
                        handleDeleteListing={handleDeleteListing}
                        handleEditListing={handleEditListing}
                      />
                    }
                  />
                  <Route
                    path="/listings/new"
                    element={<ListingForm handleSubmit={handleAddListing} />}
                  />
                  <Route
                    path="/listings/:id/edit"
                    element={<ListingForm handleSubmit={handleUpdateListing} />}
                  />
                  <Route
                    path="*"
                    exact={true}
                    element={<Navigate to="/listings" />}
                  />
                </>
              ) : (
                <Route path="/" element={<Landing />} />
              )}
              <Route
                path="/signup"
                element={<SignupForm setUser={setUser} />}
              />
              <Route
                path="/signin"
                element={<SigninForm setUser={setUser} />}
              />
              <Route path="*" exact={true} element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
