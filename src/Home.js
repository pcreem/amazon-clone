import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "./Product";
import { db } from "./firebase";

function Home() {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    db
    .collection('products')
    .onSnapshot(snapshot => (
            setProducts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
  },[])

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_Tallhero_Dash_en_US_1x._CB418727898_.jpg"
          alt=""
        />

        <div className="home__row">
          {products?.map(product => (
                    <Product 
                    id={product.id} 
                    title={product.data.title}
                    price={product.data.price}
                    rating={product.data.rating}
                    image={product.data.image}
                    />
                ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
