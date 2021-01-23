import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  
    <p>
      <span>Order Id: {order._id}</span> {" | "}
      <span>
        Amount:{" "}
        {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span> {" | "}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span> {" | "}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span> {" | "}
      <span>
        Orderd on:{" "}
        {order.createdAt.substring(0, 10)} 
      </span> {" "}
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}

    </p>
  
);

export default ShowPaymentInfo;
