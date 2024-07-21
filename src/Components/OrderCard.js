import { faHourglassHalf } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import { useState } from "react";

function OrderCard(props) {
  const [openModal, toggleModal] = useState(false);
  console.log(props.order);
  const handleModal = () => {
    toggleModal(!openModal);
    console.log("modal called", openModal);
    props.handleBackground();
  };
  const handleDateAndTime = (dateString) => {
    const utcString = "2024-07-13T21:22:43.814Z";
    const utcDate = new Date(dateString);
    const day = utcDate.getUTCDate();
    const month = utcDate.getUTCMonth();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = utcDate.getUTCFullYear();
    const hours = utcDate.getUTCHours();
    const minutes = utcDate.getUTCMinutes();
    const formattedDateTime = `${hours}:${minutes} ${day}, ${months[month]}, ${year} `;

    console.log(formattedDateTime); // Output: 13/7/2024 21:22:43
    return formattedDateTime;
  };

  return (
    <div className="w-1/4 shadow-xl mr-2 mb-2 transition-transform duration-300 ease-in-out transform hover:translate-y-1">
      {props.order.created_by.role !== "CUSTOMER" && (
        <div className=" border-gray-500 rounded-md  border-2 border-solid flex flex-col">
          <div className="flex flex-row justify-between text-2xl font-bold bg-purple-800 text-white p-2">
            <div>{props.order.created_by.name}</div>
            <div onClick={handleModal}>... </div>
          </div>
          {openModal && (
            <div>
              <Modal handleModal={handleModal} order={props.order} />
            </div>
          )}
          <div className="p-2">
            <div className="flex flex-row justify-middle ">
              <div className="font-semibold mr-1">Cancelled: </div>
              <div> {props.order.cancelled ? "Yes" : "No"}</div>
            </div>
            <div className="flex flex-row justify-middle ">
              <div className="font-semibold mr-1 ">Payment mode: </div>
              <div> {props.order.is_cash ? "Cash" : "Online"}</div>
            </div>
            <div className="flex flex-row justify-middle ">
              <div className="font-semibold mr-1 ">Creation time: </div>
              <div> {handleDateAndTime(props.order.createdAt)}</div>
            </div>
            <div className="flex flex-row justify-middle ">
              <div className="font-semibold">Status: </div>
              <div className="mx-1">{props.order.status.toLowerCase()}</div>
              {props.order.status === "PENDING" ? (
                <FontAwesomeIcon icon={faHourglassHalf} />
              ) : (
                <FontAwesomeIcon icon={faCheck} color="green" />
              )}
            </div>
            <div className="flex flex-row justify-middle ">
              <div className="font-semibold mr-1">Order Version: </div>
              <div> {props.order.order_version}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderCard;
