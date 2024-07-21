import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import FoodItemCard from "./FoodItemCard";
function Modal(props) {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed" aria-hidden="true"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto opacity-100">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <FontAwesomeIcon
              className="absolute right-4 top-4 cursor-pointer"
              icon={faXmark}
              fontSize={20}
              onClick={() => props.handleModal}
            />
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
              <div className="flex flex-wrap flex-row" >
                FORM OPEN
                {props.order.items.map((item,key) => {
                  return <FoodItemCard key={key} menuItem={item.menu_item} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
