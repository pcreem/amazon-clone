import React from 'react';
import './CheckoutProduct.css'
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";

function CheckoutProduct({ id, image, title, price, rating, hideButton, deleteButton }) {
    const [{ basket }, dispatch] = useStateValue();
    const deleteProduct = (e) => {
        e.preventDefault();

        db
        .collection('products')
        .doc(id)
        .delete()
    }

    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p>🌟</p>
                    ))}
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                )}

                { deleteButton && (
                    <button onClick={deleteProduct}>Delete Product</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct
