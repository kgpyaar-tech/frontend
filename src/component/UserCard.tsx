import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { generateLoveNumber, symmetry_object_encryption, generateSHA256 } from "../crypto";
import { BACKEND_URL } from "../constants/constants";
import { useAuth } from "../hooks/Auth";
import * as Icon from "react-feather";
interface componentProps {
  name: string;
  nickname: string;
  year: string;
  department: string;
  publicKey: string;
}

const UserCard: React.FC<componentProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let auth = useAuth();

  const sendHeart = () => {
    let loveNumber = generateLoveNumber(localStorage.getItem("decryptedPrivateKey"), props.publicKey);
    const userData = {
      name: props.name,
      nickname: props.nickname,
      year: props.year,
      department: props.department,
      publicKey: props.publicKey,
    };
    const data = {
      loveNumber,
      userData,
    };

    let sha256 = generateSHA256(loveNumber);
    let requestData = symmetry_object_encryption(localStorage.getItem("decryptedPrivateKey"), data);

    axios
      .post(
        `${BACKEND_URL}/add`,
        {
          data: requestData,
          sha256,
          love_number: loveNumber,
        },
        auth?.authHeader()
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card">
      <div className="card-container">
        <h1 className="title"> {props.name} </h1>

        <div className="card-body">
          <p> {props.nickname} </p>
          <span> {props.year} </span>
          <span> {props.department} </span>
        </div>

        <button onClick={() => setIsOpen(true)}>
          {" "}
          <Icon.Heart />{" "}
        </button>
      </div>
      <Modal className="modal" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <h1 className="title"> {props.name} </h1>

        <div className="body">
          <p> {props.nickname} </p>
          <span> {props.year} </span>
          <span> {props.department} </span>
        </div>

        <button onClick={sendHeart}> You Sure? </button>
      </Modal>
    </div>
  );
};

export default UserCard;
