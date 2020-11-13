import React, { useState } from 'react'
import './Sell.css'
import Product from "./Product"
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import firebase from "firebase";
import axios from 'axios';

function Sell() {
  const [{ user }, dispatch] = useStateValue();
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const uploadImage = async (e) => {
    e.preventDefault();
    
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    
    await axios({
      method: 'POST',
      url: 'https://api.imgur.com/3/image',
      data: formData,
      headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_ID}`  
      },
      mimeType: 'multipart/form-data'
      }).then(res => {
        setImageUrl(res.data.data.link)       
      }).catch(e => {
        console.log(e)
    })

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && price && imageUrl) {
      db.collection('products').add({
        user: user.uid,
        id: Math.floor(Math.random() * Math.floor(10000000)) + 1,
        title,
        price,
        rating: Math.floor(Math.random() * Math.floor(5)) + 1,
        image: imageUrl,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }    

    setTitle("")
    setPrice("")
    setImageUrl("")
  };

  return (
    <div className="sell">
      <div className="sell__left">
        <Product
            title={title}
            price={price}
            rating={Math.floor(Math.random() * Math.floor(5)) + 1}
            image={imageUrl}
            nobutton
          />
      </div>
      <div className="sell__right">
        <form className="sell__form">
          <input 
            value={ title }
            onChange={ (e) => setTitle(e.target.value)}
            className="sell__title" 
            placeholder="Title in 25 words"
            maxlength="25"
            required
          />
           <input 
            value={ price }
            onChange={ (e) => setPrice(e.target.value)}
            className="sell__price" 
            placeholder="price"
            type="number" 
            maxlength="25"
            max="9999999999999"
            required
          />
          <input 
            value={ imageUrl }
            onChange={ (e) => setImageUrl(e.target.value)}
            placeholder="image URL" 
            type="url"
            required
          />

          <input type='file' onChange={(e) => uploadImage(e)}/>

          <button onClick={handleSubmit} type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  )
}

export default Sell
