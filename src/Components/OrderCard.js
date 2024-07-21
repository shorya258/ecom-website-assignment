import { faHourglassHalf } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import { useState } from "react";

function OrderCard(props) {
  const [openModal, toggleModal] = useState(false);
  const handleModal = () => {
    toggleModal(!openModal);
    console.log("modal called", openModal);
    props.handleBackground();
  };

  return (
    <div className="w-1/4 shadow-xl mr-2 mb-2 transition-transform duration-300 ease-in-out transform hover:translate-y-1">
      {props.order.created_by.role !== "CUSTOMER" && (
        <div className=" border-gray-500 rounded-md  border-2 border-solid flex flex-col">
          <div className="flex flex-row justify-between text-2xl font-bold bg-purple-800 text-white p-2">
            <div >{props.order.created_by.name}</div>
            <div onClick={handleModal}>... </div>
          </div>
          {openModal && (
            <div>
              <Modal handleModal={handleModal} order={props.order} />
            </div>
          )}
          <div className="p-2">
            <div>
              <div className="font-semibold ">Cancelled :</div>
              <div> {props.order.is_cash ? "YES" : "NO"}</div>
            </div>
            <p>Payment mode : {props.order.is_cash ? "CASH" : "ONLINE"}</p>
            <p>Created : {props.order.createdAt}</p>
            <div>
              <div>Status</div>
            </div>{" "}
            {props.order.status.toLowerCase()}
            {props.order.status === "PENDING" ? (
              <FontAwesomeIcon icon={faHourglassHalf} />
            ) : (
              <FontAwesomeIcon icon={faCheck} color="green" />
            )}
            <p>Order Version : {props.order.order_version}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderCard;
