import React, { useEffect, useState } from "react";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    let url = "https://test-api.achilyon.in/v1/orders/all-orders";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        status: "PENDING",
        is_cash: true,
      }),
    };
    const response = await fetch(url, options);
    let json = await response.json();
    console.log(json);
    console.log(json.data);
    setOrders(json.data);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      Dashboard
      <div className="flex gap-2 flex-wrap ">
        {orders.map((order) => {
          return (
            <div className=" border-gray-500 rounded-md  border-2 border-solid flex flex-col p-4 ">
              <h2>{order.created_by.name}</h2>
              <p>Cancelled : {order.is_cash ? "YES" : "NO"}</p>
              <p>Cash : {order.is_cash ? "YES" : "NO"}</p>
              <p>Created : {order.created_at}</p>
              <p>Status : {order.status}</p>
              <p>Order Version : {order.order_version}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
