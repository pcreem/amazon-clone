import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating, nobutton }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <div className="product__infoTop">
          <h3>{title}</h3>
        </div>

        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>     
        
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      { image && (
        <img src={image} alt="product image" />
      )}
      
      { nobutton ? <button>Add to Basket</button> : <button onClick={addToBasket}>Add to Basket</button>}
      
    </div>
  );
}

export default Product;
