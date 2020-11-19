import React, { useEffect, useState } from "react";
import './ProductList.css'
import { db } from "./firebase";
import CheckoutProduct from "./CheckoutProduct"

function ProductList() {
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
    <div className="productlist"> 
      {products?.map(product => (                     
                    <CheckoutProduct 
                    id={product.id} 
                    title={product.data.title}
                    price={product.data.price}
                    rating={product.data.rating}
                    image={product.data.image}
                    hideButton
                    deleteButton
                    /> 
                ))}      
    </div>
  )
}

export default ProductList
