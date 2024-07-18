
# Local Market - Frontend with React

## Description

This repository contains the frontend implementation for the Local Market application. The frontend is built with React using Vite , and also integrated Cloudinary for image upload.

## Deployment
The project is deployed to Render. Can be accessed via:

https://project-3-local-market-react.onrender.com


The Backend of this Local Market is deployed to Render, and can be accessed on this link:

https://project-3-local-market-express.onrender.com


![The screenshot of our local market app](landing-page.png "a title")
![The screenshot of our local market app](listings.png "a title")

## Features

- On this application, the users can list their items to sell them in the market. And others can make a bid on any listing to buy a listing
- User authentication and authorization (Sign up, Sign in, Sign out)
- Each user can create a Listing and upload image for the listing. They can also edit and delete their own listings. 
- Only singed in user can see ALL the listings in the website.
- A guest user (user who doesn't sign in) can't see ALL the listings.
- Display Date and Time for the Bids and Listings
- Each user who is signed in, can also bid on other users' listings

## Technologies:
- React.js
- Vite
- React Router Dom
- Cloudinary
- Render
- Bootstrap


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/manijehshirzadeh/project-3-local-market-react.git
   cd project-3-local-market-react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables to the `.env` file:
   ```bash
   VITE_EXPRESS_BACKEND_URL= http://localhost:3000

   VITE_MAPBOX_API_KEY= your_VITE_MAPBOX_API_KEY_secret
   ```

3. Running the Development Server:
   ```bash
   npm run dev
   ```

4. Building for Production
   ```bash
   npm run build
   ```
   
5. Visit `localhost:3000`

##  Contributors
- Parisa Naeim https://github.com/parisa-naeim
- Manijeh Shirzadeh https://github.com/manijehshirzadeh 

## Next Steps:
- Adding Edit and Delete functinality for Bids
- Adding Like a Comment or Listing functinality





