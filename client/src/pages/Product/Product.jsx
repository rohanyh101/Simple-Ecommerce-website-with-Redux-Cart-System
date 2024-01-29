import React, { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);
  const maxAddItemLimit = 5;

  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);
  // console.log(data);

  const dispatch = useDispatch();

  const getImage = (image) => {
    return (
      import.meta.env.VITE_REACT_APP_UPLOAD_URL +
      data?.attributes[image]?.data?.attributes?.url
    );
  };

  return (
    <div className="product">
      {loading ? (
        "loading components"
      ) : (
        <>
          <div className="left">
            <div className="images">
              {/* data?.attributes?.img?.data?.attributes?.url */}
              <img
                src={getImage("img")}
                alt=""
                onClick={() => setSelectedImg("img")}
              />
              <img
                src={getImage("img2")}
                alt=""
                onClick={() => setSelectedImg("img2")}
              />
            </div>

            <div className="mainImg">
              <img src={getImage(selectedImg)} alt="" />
            </div>
          </div>

          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <span className="price">${data?.attributes?.price}</span>
            <p>{data?.attributes?.desc}</p>

            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev <= 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev >= maxAddItemLimit ? maxAddItemLimit : prev + 1
                  )
                }
              >
                +
              </button>
              {quantity >= maxAddItemLimit && (
                <div className="limitReached">limit Reached</div>
              )}
            </div>

            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: data.id,
                    title: data.attributes.title,
                    desc: data.attributes.desc,
                    price: data.attributes.price,
                    img: data.attributes.img.data.attributes.url,
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>

            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>

              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>

            <div className="info">
              <span>Vendor: Polo</span>
              <span>Product Type: T-Shirt</span>
              <span>Tag: T-Shirt, Women, Top</span>
            </div>
            <hr />
            <div className="details">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
