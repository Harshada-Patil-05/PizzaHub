import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
const [showToast, setShowToast] = useState(false);

// Import Thunks
import { getUserDetails } from "../../../redux/asyncThunks/userThunks";
import { addToCart } from "../../../redux/slices/cartSlice";

// Import Components
import Button from "../Button";

function AddToCartButton({ id, qty }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userDetails } = user;

const handleAddToCart = () => {
  if (userDetails && !userDetails.isVerified) {
    setShowToast("Please verify your email first ❌");
  } else {
    dispatch(addToCart({ id, qty }));
    setShowToast("Item added to cart 🛒");
  }

  setTimeout(() => {
    setShowToast(false);
  }, 3000);
};


  useEffect(() => {
    if (!userDetails) {
      dispatch(getUserDetails({}));
    }
  }, [dispatch, userDetails]);

  return (
  <>
    {showToast && (
      <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border border-orange-400 text-orange-600 px-6 py-3 rounded-full font-semibold z-50">
        {showToast}
      </div>
    )}

    <Button
      variant="primary"
      onClick={handleAddToCart}
      className="font-semibold py-2 px-4 rounded-full inline-flex items-center"
    >
      <FaCartPlus className="mr-2" />
      Add to Cart
    </Button>
  </>
);

AddToCartButton.propTypes = {
  id: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
};

export default AddToCartButton;
