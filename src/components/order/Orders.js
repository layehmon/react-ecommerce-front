import React from "react";
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  DeliveredProcedureOutlined 
}from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
//import {formatCurrency} from "../../../utils";

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Qty</th>
          <th scope="col"><DeliveredProcedureOutlined style={{ fontSize: '20px'}}/>
          </th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{i+1}{". "}{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const formatAddress = (address) => {
    let newFormat = address.replace(/<p>/g, ""); // remove <p> and replace ""
    newFormat = newFormat.replace(/(<([^>]+)>)/gi, ", ");  // remove and replace 
    return newFormat.substring(0, newFormat.length -2 ); // remove the last ", " and return
  }

  return (
    <div>
      {orders.map((order, index) => (
        <div key={order._id} className="m-1 mb-5  card">
          <div className="btn text-left text-white btn-block bg-primary mb-0">
            Order  No.: {orders.length-index}
          </div>
          <ShowPaymentInfo order={order} showStatus={false}  /> 
          <div> Customer ID: {order.orderdBy} </div> 
          <div> Delivery Address: {formatAddress(order.deliveryAddress)} </div> 

          <div className="btn btn-block bg-light">
            <div className="row">
              <span> Order Status: {"    "}
                <select 
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className={order.orderStatus}
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Cash On Delivery">Cash On Delivery</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </span>
            </div>
            
          </div>

          {showOrderInTable(order)}
        </div>
      ))}
    </div>
  );
};

export default Orders;
