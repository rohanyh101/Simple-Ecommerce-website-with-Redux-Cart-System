import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  // const descStr = "wefwkebfwbekbfwlqkjfbkjwbeb,asndbcoqweuirywqpoityqwljefwjberoqw3r216y432`31flkqwjebfjkwqbeklfjblkjwberfiug21i34qf";

  const computeTotal = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2);
  };

  const stripePromise = loadStripe(
    "pk_test_51OH58OSIQPvc35APWDvudyquhf1ZPDh4rnuG0Rbk1L8gxiI61JLKQf0znziphy7wWpixG4zWGu3iTdPomoYI3rpn00B8v4LNlh"
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post("/orders", {
        products,
      });

      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item) => {
        return (
          <div className="item" key={item.id}>
            <img
              src={import.meta.env.VITE_REACT_APP_UPLOAD_URL + item.img}
              alt=""
            />

            <div className="details">
              <h1>{item.title}</h1>
              <p>{item.desc?.substring(1, 50)}</p>
              {/* {item.desc?.substring(1, 50)} */}
              <div className="price">
                {item.quantity} x {item.price}
              </div>
            </div>
            <DeleteOutlinedIcon
              className="delete"
              onClick={() => dispatch(removeItem(item.id))}
            />
          </div>
        );
      })}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${computeTotal()}</span>
      </div>
      <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset cart
      </span>
    </div>
  );
};

export default Cart;
