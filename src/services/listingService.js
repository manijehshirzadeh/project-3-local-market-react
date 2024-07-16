const BASE_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL + "/listings";

const index = async () => {
  // return [
  //   {
  //     _id: "1",
  //     title: '65" SAMSUNG TV',
  //     description: '65" TV in very good condition to be picked up asap',
  //     category: "Electronics",
  //     price: "120",
  //     postcode: "3000",
  //     condition: "Used - like new",
  //     seller: {
  //       username: "a",
  //       _id: "6692889d306d36571a6b4778"
  //     },
  //     createdAt: "01-08-2024",
  //   },
  //   {
  //     _id: "2",
  //     title: '65" SAMSUNG TV',
  //     description: '65" TV in very good condition to be picked up asap',
  //     category: "Electronics",
  //     price: "120",
  //     postcode: "3000",
  //     condition: "Used - like new",
  //     seller: {
  //       username: "a",
  //       _id: "6692889d306d36571a6b4778",
  //     },
  //     createdAt: "01-08-2024",
  //   },
  // ];

  try {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const show = async (id) => {
  // return {
  //   _id: "1",
  //   title: '65" SAMSUNG TV',
  //   description: '65" TV in very good condition to be picked up asap',
  //   category: "Electronics",
  //   price: "120",
  //   postcode: "3000",
  //   condition: "Used - like new",
  //   seller: {
  //     username: "a",
  //     _id: "6692889d306d36571a6b4778",
  //   },
  //   createdAt: "01-08-2024",
  // };

  try {
    const response = await fetch(BASE_URL + "/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const create = async (newListing) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newListing),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const update = async (id, listingFormData) => {
  try {
    const response = await fetch(BASE_URL + "/" + id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listingFormData),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteListing = async (id) => {
  try {
    const response = await fetch(BASE_URL + "/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const createBid = async (listingId, bid) => {
  try {
    const response = await fetch(`${BASE_URL}/${listingId}/bids`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bid),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export { index, show, create, update, deleteListing, createBid };
