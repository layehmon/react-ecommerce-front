import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector } from "react-redux";
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  AndroidOutlined,
  DeliveredProcedureOutlined,

} from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      //console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

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
              <b>{p.product.title}</b>
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

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );


  const formatAddress = (address) => {
    let newFormat = address.replace(/<p>/g, ""); // remove <p> and replace ""
    newFormat = newFormat.replace(/(<([^>]+)>)/gi, ", ");  // remove and replace 
    return newFormat.substring(0, newFormat.length -2 ); // remove the last ", " and return
  }

  const showEachOrders = () =>
    
    orders.reverse().map((order, i) => (
      <div key={i} className="m-1 mb-5 pt-3 card">
        <h6> Order No.: { orders.length - i  } </h6>
        <ShowPaymentInfo order={order} />
        <p>Delivery Address: {formatAddress(order.deliveryAddress)} </p>  
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
      
  ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            {orders.length > 0 ? 
              <p> All Purchase Orders  </p>
            : 
              <div> No Purchase Orders </div> 
            }
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
