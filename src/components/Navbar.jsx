import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Tag } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItemCount();
  }, []);

  const fetchCartItemCount = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/cart/count");
      setCartItemCount(response.data.count);
    } catch (error) {
      console.error("Failed to fetch cart item count:", error);
    }
  };

  const moveToCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <div className="overlay"></div>
      <nav>
        <div className="logo">
        <a href="http://localhost:3000">
          <h1>PETS SHOP</h1>
          </a>
        </div>
        <div className="items">
          <ul>
            <NavLink to='http://localhost:3001' >
            <li>Cat Care</li>
            </NavLink>
            <li >
            <NavLink to='/cart' >
            <Badge count={cartItemCount} size="small">
            <ShoppingCartOutlined style={{ fontSize: "24px" }} />
            </Badge>
            </NavLink>
            <NavLink to='/login' >
            <span style={{marginLeft:'1rem'}} color='green' >Login</span>
            </NavLink>
            <NavLink to='/register' >
            <span style={{marginLeft:'1rem'}} color='red' >Regsiter</span>
            </NavLink>
            </li>
            <li>About</li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
