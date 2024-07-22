import { faHourglassHalf } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import OrderCard from "./OrderCard";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    let url = "https://test-api.achilyon.in/v1/orders/all-orders";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        is_cash: true,
      }),
    };
    const response = await fetch(url, options);
    let json = await response.json();
    console.log(json);
    console.log(json.data);
    setOrders(json.data);
  };
  const [bgGray, toggleBgGray] = useState(false);
  const handleBackground = () => {
    toggleBgGray(!bgGray);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div
      className={`${
        bgGray && "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      }`}
    >
      <h2 className={`text-3xl font-bold p-1 `}>Dashboard</h2>
      <div className={`flex gap-2 flex-wrap justify-center  `}>
        {orders.map((order, key) => {
          return (
            <OrderCard
              key={key}
              order={order}
              handleBackground={handleBackground}
              bgGray={bgGray}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
