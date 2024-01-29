// import React, { useEffect, useState } from "react";
import "./FeaturedProducts.scss";
import Card from "../Card/Card";
// import axios from 'axios'
import useFetch from "../../hooks/useFetch";

const FeaturedProducts = ({ type }) => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // `/products?populate=*&[filters][type][$eq]=${type}`
  //       const res = await axios.get(import.meta.env.VITE_REACT_APP_API_URL + `/products?populate=*&[filters][type][$eq]=${type}`, {
  //         headers: {
  //           Authorization: "bearer " + import.meta.env.VITE_REACT_APP_API_TOKEN,
  //         },
  //       });

  //       setData(res.data.data);
  //     } catch(error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  // console.log(data);

  // const { data, loading, error } = useFetch(
  //   `/products?populate=*&[filters][type][$eq] = ${type}`
  // );

  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <div className="bottom">
        {error
          ? "Something went wrong!"
          : loading
          ? "loading"
          : data?.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
