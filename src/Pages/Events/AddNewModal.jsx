import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./AddNewModal.scss";
import { UserContext } from "../../App";
import { backend } from "../../Context/Backend";

const AddNewModal = (props) => {
  const Auth = useContext(UserContext);
  const pharmacyId = Auth.user.id;
  const [imgStr, setImgStr] = useState([]);
  const [apply, setApply] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => props.setShow(false);
  const handleShow = () => props.setShow(true);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data, e) => {
    setLoading(true);
    let arr = data;
    imgStr["pictureUrl"] = imgStr["0"];
    data = { ...arr, ...imgStr };

    try {
      const url = `${backend}/api/event/create`;
      await axios({
        method: "post",
        headers: { "Access-Control-Allow-Origin": "*" },
        url: url,
        data: {
          eventName: data.eventName,
          location: data.location,
          pictureUrl: data.pictureUrl,
          description: data.description,
          dateTime: data.dateTime,
          country: data.country,
          city: data.city,
        },
      });
      console.log(data);
      props.setTemp(!props.temp);
      setLoading(false);
      handleClose();
      e.target.reset();
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
    props.setShow(props.show);
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <form
          className="addNewCard container-fluid"
          onSubmit={handleSubmit(onSubmit)}
        >
          {!loading && (
            <Modal.Body>
              <div className="row">
                <div className="col">
                  <label>Event Name</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Type..."
                    id="eventName"
                    {...register("eventName", { required: true })}
                  />
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
              <div className="row">
                <div className="col">
                  <label>Add Image</label>
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
                  <label>Date-Time</label> <br />
                  <input
                    type="datetime-local"
                    placeholder="Type..."
                    id="dateTime"
                    {...register("dateTime", { required: false })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Country</label> <br />
                  <select {...register("country", { required: true })}>
                    <option label="Choose..."></option>
                    <option value="Egypt">Egypt</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>City</label> <br />
                  <select {...register("city", { required: true })}>
                    <option label="Choose..."></option>
                    <option value="Cairo">Cairo</option>
                  </select>
                </div>
              </div>

              {/* <div className="row">
                <input
                  className="small-check"
                  type="checkbox"
                  // checked={apply}
                  onClick={(e) => {
                    setApply(!apply);
                    console.log(apply);
                  }}
                  {...register("needsPrescription")}
                />
                <label>Needs Prescription?</label>
              </div> */}
              {/* {apply == true && (
              <div className="row">
                <div className="col">
                  <label>Apply form link</label>
                  <br />
                  <input
                    type="url"
                    placeholder="Type..."
                    id="applyURL"
                    {...register("applyURL")}
                  />
                </div>
              </div>
            )} */}
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
