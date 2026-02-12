import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

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
      toast.error("Please verify your email address first ❌");
    } else {
      dispatch(addToCart({ id, qty }));
      toast.success("Item added to cart 🛒", {
        style: {
          borderRadius: "10px",
          background: "#f97316",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    if (!userDetails) {
      dispatch(getUserDetails({}));
    }
  }, [dispatch, userDetails]);

  return (
    <>
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
}

AddToCartButton.propTypes = {
  id: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
};

export default AddToCartButton;
