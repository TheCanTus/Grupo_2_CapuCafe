import React, { useState, useEffect } from "react";
import { SmallCard } from "./SmallCard";

export function ContentRowMovies() {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await fetch('http://localhost:8000/api/products');
        const productData = await productResponse.json();
        setProductCount(productData.count);

        const categoryResponse = await fetch('http://localhost:8000/api/categories');
        const categoryData = await categoryResponse.json();
        setCategoryCount(categoryData.meta.length);

        const userResponse = await fetch('http://localhost:8000/api/users');
        const userData = await userResponse.json();
        setUserCount(userData.meta.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const productsInDB = {
    title: "Cantidad de productos",
    color: "primary",
    cuantity: productCount,
    icon: "fa-clipboard-list",
  };

  const totalCategories = {
    title: "total de categorias",
    color: "success",
    cuantity: categoryCount,
    icon: "fa-award",
  };

  const usersQuantity = {
    title: "Cantidad de usuarios",
    color: "warning",
    cuantity: userCount,
    icon: "fa-user-check",
  };

  const cartProps = [productsInDB, totalCategories, usersQuantity];

  return (
    <div className="row">
      {cartProps.map((item, index) => (
        <SmallCard {...item} key={index} />
      ))}
    </div>
  );
}
