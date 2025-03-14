import "../styles/List.scss";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"

const WishList = () => {
  const wishList = useSelector((state) => state?.user?.wishList) || [];
  
  console.log("Wishlist Data:", Array.isArray(wishList) ? wishList : "Not an array"); // ✅ Debugging

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList?.length > 0 ? (  // ✅ Check if wishlist is not empty
          wishList.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                key={_id} // ✅ Ensure unique key for React
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )
        ) : (
          <p>No items in your wishlist.</p> // ✅ Show message if empty
        )}
      </div>
    </>
  );
};

export default WishList;