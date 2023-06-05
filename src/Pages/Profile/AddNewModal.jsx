import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./AddNewModal.scss";

import { UserContext } from "../../App";

const AddNewModal = (props) => {
  const [loading, setLoading] = useState(false);
  const { error, setError } = useState("");
  const Auth = useContext(UserContext);
  // console.log(props);
  const [imgStr, setImgStr] = useState([]);
  const uploadImage = (img, idx) => {
    let resImg = null;
    const imgAPIKey = "826fbb1f90dacfa942f721a496d71950";
    let formData = new FormData();
    formData.append("image", img);
    const url = `https://api.imgbb.com/1/upload?key=${imgAPIKey}`;
    console.log(formData);
    fetch(url, {
      method: "POST",
      body:
        // JSON.stringify({
        formData,
      // })
    })
      .then((res) => res.json())
      .then((result) => {
        resImg = result.data.display_url;
        console.log(resImg);
        console.log("imgbb", result);
        let arr = imgStr;
        arr[idx] = resImg;
        setImgStr(arr);
        console.log(imgStr);
        return resImg;
      });
  };

  //   const [show, setShow] = useState(props.show);
  console.log(props.show);
  const handleClose = () => props.setShow(false);
  const handleShow = () => props.setShow(true);

  const [apply, setApply] = useState(false);
  console.log(props.show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    let arr = data;
    imgStr["profilePic"] = imgStr["0"];
    imgStr["headerPic"] = imgStr["1"];
    data = { ...arr, ...imgStr };
    console.log(data);

    try {
      axios({
        method: "post",
        headers: { "Access-Control-Allow-Origin": "*" },
        url: "https://elaj-server.herokuapp.com/api/account/edit",
        // url: "http://localhost:5001/api/account/edit",
        data: {
          _id: Auth.user.id,
          name: data.name,
          description: data.description,
          openTime: data.openTime,
          closeTime: data.closeTime,
          city: data.city,
          deliveryFee: data.deliveryFee,
          serviceFee: data.serviceFee,
          deliveryTime: data.deliveryTime,
          profilePic: data.profilePic,
          headerPic: data.headerPic,
        },
      });
      props.setTemp(!props.temp);
      props.setShow(false);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
    props.setShow(props.show);
    console.log(Auth);
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pharmacy</Modal.Title>
        </Modal.Header>
        <form
          className="addNewCard container-fluid"
          onSubmit={handleSubmit(onSubmit)}
        >
          {!loading && (
            <Modal.Body>
              <div className="row">
                <div className="col">
                  <label>Name</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Type..."
                    id="name"
                    {...register("name", { min: 6, maxLength: 24 })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Description</label> <br />
                  <input
                    type="text"
                    placeholder="Type..."
                    id="description"
                    {...register("description", { required: true })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Open Time</label> <br />
                  <input
                    type="time"
                    id="openTime"
                    {...register("openTime", { required: true })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Close Time</label> <br />
                  <input
                    type="time"
                    id="closeTime"
                    {...register("closeTime", { required: true })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>City</label> <br />
                  <select {...register("city", { required: true })}>
                    <option label="Choose..."></option>
                    <option value="Khartoum">Khartoum</option>
                    <option value="Bahri">Bahri</option>
                    <option value="Omdurman">Omdurman</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Location</label> <br />
                  <input
                    type="text"
                    placeholder="Type..."
                    id="location"
                    {...register("location", { required: true })}
                  />
                </div>
              </div>
              {/* <div className="row">
                <div className="col">
                  <label>Location</label> <br />
                  <select {...register("location", { required: true })}>
                    <option label="Choose..."></option>
                    <option value="Kafori">Kafori</option>
                    <option value="Riyadh">Riyadh</option>
                  </select>
                </div>
              </div> */}
              <div className="row">
                <div className="col">
                  <label>Category</label> <br />
                  <input
                    type="text"
                    placeholder="Type..."
                    id="category"
                    {...register("category", { required: true })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Delivery Fee</label> <br />
                  <input
                    type="number"
                    placeholder="Type..."
                    id="deliveryFee"
                    value="600"
                    {...register("deliveryFee", { required: true })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Service Fee</label> <br />
                  <input
                    type="number"
                    placeholder="Type..."
                    id="serviceFee"
                    value="600"
                    {...register("serviceFee", { required: true })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Delivery Time</label> <br />
                  <input
                    type="number"
                    placeholder="Type..."
                    id="deliveryTime"
                    value="60"
                    {...register("deliveryTime", { required: true })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Profile Image</label>
                  <input
                    style={{ border: "none" }}
                    type="file"
                    onChange={(e) => {
                      uploadImage(e.target.files[0], 0);
                      console.log(imgStr);
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Header Image</label>
                  <input
                    style={{ border: "none" }}
                    type="file"
                    onChange={(e) => {
                      uploadImage(e.target.files[0], 1);
                      console.log(imgStr);
                    }}
                  />
                </div>
              </div>

              {/* <input type="submit" /> */}
            </Modal.Body>
          )}
          {loading && <div className="loading lds-hourglass"></div>}
          <Modal.Footer>
            {loading ? (
              <>
                {error && <p>{error}</p>}
                <p>Please wait</p>
              </>
            ) : (
              <input type="submit" className="submit-btn" />
            )}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
            Ok!
          </Button> */}
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AddNewModal;
