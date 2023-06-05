import React, { useState, useEffect, Suspense, useContext } from "react";
import "./Users.scss";
import axios from "axios";
import { Table } from "react-bootstrap";
// import AddNewModal from "./AddNewModal";

import deletebtn from "../../Assets/delete.svg";
import plus from "../../Assets/plus.svg";
import { UserContext } from "../../App";

const Users = () => {
  const [orders, setOrders] = useState();
  const [temp, setTemp] = useState(false);
  const [show, setShow] = useState(false);

  const Auth = useContext(UserContext);

  useEffect(() => {
    // const pharmacyId = Auth.user.id;
    // axios.get(`/api/orders/pharmacy-orders/${pharmacyId}`).then((res) => {
    //   setOrders(res.data.orders);
    //   console.log(res.data.orders);
    // });
  }, []);

  const deleteProduct = (id) => {
    console.log("remove by id");
    axios.post(`/api/product/remove/${id}`).then((res) => {
      setTemp(!temp);
    });
  };
  return (
    <div className="orders">
      <div className="header">
        <h1 className="header-text">Users</h1>
      </div>
      <>
        <div
          className="member-table"
          style={{
            marginBottom: "0px !important",
            overflow: "scroll",
            width: "90%",
            margin: "auto",
            borderRadius: "4px",
          }}
        >
          <Table striped hover fixed>
            <thead
              style={{
                position: "sticky",
                top: "0",
                backgroundColor: "#4a46d0",
                color: "white",
                verticalAlign: "middle",
                position: "relative",
              }}
              variant="dark"
            >
              <tr>
                <th className="theader">id</th>
                <th className="theader">Products</th>
                <th className="theader">Name</th>
                <th className="theader">Total</th>
                <th className="theader">Pharmacy</th>
                <th className="theader">City</th>
                <th className="theader">Address</th>
                <th className="theader">Phone</th>
                <th className="theader">Status</th>
                <th className="theader">Location</th>
              </tr>
            </thead>
            <Suspense>
              <tbody>
                {orders &&
                  orders
                    .slice(0)
                    .reverse()
                    .map((order, idx) => (
                      <tr
                        key={order.id}
                        style={{
                          backgroundColor:
                            order.status === "placed"
                              ? "transparent"
                              : order.status === "received"
                              ? "rgb(252, 223, 173)"
                              : order.status === "delivered"
                              ? "rgb(237, 255, 236)"
                              : order.status === "booked"
                              ? "rgb(251, 255, 181)"
                              : order.status === "deleted"
                              ? "rgb(252, 196, 196)"
                              : "transparent",
                        }}
                      >
                        {" "}
                        {/* add a unique key */}
                        <td>{order.id}</td>
                        <td style={{ minWidth: "200px" }}>
                          {order.cartItems &&
                            order.cartItems.map((item, idx) => (
                              <div key={idx}>{`👉🏽 ${item.name} `}</div>
                            ))}
                        </td>
                        <td>{order.name}</td>
                        <td>{order.total}</td>
                        <td>{order.pharmacyName}</td>
                        <td>{order.city}</td>
                        <td>{order.address}</td>
                        <td>{order.phone}</td>
                        <td>{order.status}</td>
                        {order.selectedLocation && (
                          <td>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${order.selectedLocation.lat},${order.selectedLocation.lng}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Location
                            </a>
                          </td>
                        )}
                      </tr>
                    ))}
              </tbody>
            </Suspense>
          </Table>
        </div>
      </>
    </div>
  );
};

export default Users;
