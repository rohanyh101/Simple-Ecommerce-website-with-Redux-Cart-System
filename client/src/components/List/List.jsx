import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const List = ({ subCats, maxPrice, sort, catId }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[fliters][categories][id][$eq]=${catId}${subCats?.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
      // it's not the good idea to filter like this because the products are going to render as each incr or decr in $, which is resource intensive, interms of api fetching all data ...
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );

  return (
    <div className="list">
      {loading
        ? "loading content"
        : data?.map((item) => {
            return <Card item={item} key={item.id} />;
          })}
    </div>
  );
};

export default List;
