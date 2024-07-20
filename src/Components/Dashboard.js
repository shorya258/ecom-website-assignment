import React, { useEffect } from "react";

function Dashboard() {
  const fetchOrders = async () => {
    let url = "https://test-api.achilyon.in/v1/orders/all-orders";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("authToken"),
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
    if (json.message === "User registered successfully.") {
      console.log("SUCCESSFUL FETCH");
    } else {
      alert("enter valid credentials");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return <div>Dashboard</div>;
}

export default Dashboard;
