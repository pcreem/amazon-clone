import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import ProductList from "./ProductList";

function Header({ setSearchTerm }) {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
      history.push('/')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm("")
  };

  return (
    <div className="header">
      <div className="header__top">
        <Link to="/">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          />
        </Link>

        <div className="header__search">
          <input className="header__searchInput" type="text" onChange={ (e) => setSearchTerm(e.target.value)} />
          <SearchIcon className="header__searchIcon" onClick={handleSubmit} type="submit"/>
        </div>

        <div className="header__nav">
          <Link to={!user && '/login'}>
            <div onClick={handleAuthenticaton} className="header__option">
              <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
              <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
            </div>
          </Link>

          <Link to='/orders'>
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>
          

          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>

          <Link to="/checkout">
            <div className="header__optionBasket">
              <ShoppingCartOutlinedIcon fontSize="large" />
              <span className="header__optionLineTwo header__basketCount">
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="header__bottom">
        <div className="header__bottomLeft">
          <Link to="/sell">
            <p className="header__bottomLeftSell">{ user && 'Sell' }</p>
          </Link>   
          <Link to="/list">
            <p className="header__bottomLeftList">{ user && 'List' }</p>
          </Link>   
        </div>
                    
        <p className="header__optionLineTwo">Amazon's response to COVID-19</p>
      </div>
    </div>
  );
}

export default Header;
