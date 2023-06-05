import React, { useState, useEffect, Suspense } from "react";
import "./Profile.scss";
import axios from "axios";
import AddNewModal from "./AddNewModal";

import { UserContext } from "../../App";
import { useContext } from "react";

const Profile = () => {
  const Auth = useContext(UserContext);
  const [pharmacy, setPharmacy] = useState("");
  const [temp, setTemp] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(`https://elaj-server.herokuapp.com/api/account/${Auth.user.id}`)
      .then((res) => {
        setPharmacy(res.data.pharmacy);
        console.log(res.data);
      });
  }, []);

  return (
    <div className="profile">
      <div className="header">
        <h1 className="header-text">Profile</h1>
      </div>
      <div className="content">
        {/* <button className="edit-btn">Edit Profile</button> */}
        <div>
          {show && (
            <AddNewModal
              show={show}
              setShow={setShow}
              temp={temp}
              setTemp={setTemp}
            />
          )}
          <button
            onClick={() => {
              setShow(!show);
            }}
            className="edit-btn"
          >
            Edit Profile
          </button>
        </div>
        {pharmacy && (
          <div className="container">
            <div className="row">
              <div className="col">
                <h6 className="key">{`Name: `}</h6>
              </div>
              <div className="col">
                <p>{pharmacy.name}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="key">{`Description: `}</h6>
              </div>
              <div className="col">
                <p>{pharmacy.description}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="key">{`Open Time: `}</h6>
              </div>
              <div className="col">
                <p>{pharmacy.openTime}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="key">{`Close Time: `}</h6>
              </div>
              <div className="col">
                <p>{pharmacy.closeTime}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="key">{`City: `}</h6>
              </div>
              <div className="col">
                <p>{pharmacy.city}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="key">{`Delivery Fee: `}</h6>
              </div>
              <div className="col">
                <p>{pharmacy.deliveryFee}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="key">{`Service Fee: `}</h6>
              </div>
              <div className="col">
                <p>{pharmacy.serviceFee}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="key">{`Delivery Time: `}</h6>
              </div>
              <div className="col">
                <p>{pharmacy.deliveryTime}</p>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <h6 className="key">{`Profile Pic: `}</h6>
              </div>
              <div className="col">
                <img className="profile-pic" src={pharmacy.profilePic} alt="" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h6 className="key">{`Header Pic: `}</h6>
              </div>
              <div className="col">
                <img className="header-pic" src={pharmacy.headerPic} alt="" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
