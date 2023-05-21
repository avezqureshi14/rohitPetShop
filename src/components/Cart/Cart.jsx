import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "antd";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/cart");
        setItems(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8800/api/cart/${itemId}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="majorContainer" style={{ backgroundColor: "#ffe6f0", padding: "20px" }}>
      <Card className="cartCard" style={{ background: "#fff0f6", border: "none" }}>
        {items.map((item) => (
          <div className="containerCart" key={item._id} style={{ marginBottom: "20px" }}>
            <div className="imageContainer">
              <img src={item.imageUrl} alt="" style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
            </div>
            <div className="contentContainer" style={{ marginTop: "10px" }}>
              <h3 style={{ color: "#eb2f96", marginBottom: "5px" }}>{item.name}</h3>
              <h5 style={{ color: "#ff85c0", marginBottom: "5px" }}>₹{item.price}</h5>
              <p style={{ color: "#f06292" }}>{item.description}</p>
              <Button onClick={() => handleDelete(item._id)} danger style={{ background: "#f5222d", color: "#fff", marginTop: "10px" }}>
                Delete
              </Button>
            </div>
          </div>
        ))}

        <NavLink to="/checkout">
          <Button style={{ backgroundColor: "#eb2f96", color: "#fff", marginTop: "20px" }}>
            Checkout
          </Button>
        </NavLink>
      </Card>
    </div>
  );
};

export default Cart;
