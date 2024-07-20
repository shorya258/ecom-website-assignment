import React, { useEffect } from "react";

function Dashboard() {
  const fetchOrders = async () => {
    let url = "https://test-api.achilyon.in/v1/orders/all-orders";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "Authorization": "Bearer "+localStorage.getItem("authToken"),
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
    return json.data;
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return <div>Dashboard</div>;
}

export default Dashboard;
