import React, { useEffect } from "react";
import { useAuth } from "../hooks/Auth";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import { symmetry_object_decryption } from "../crypto";

function MatchCards() {
  let auth = useAuth();

  useEffect(() => {
    let matches: any = [];
    axios
      .get(`${BACKEND_URL}/get_sent_hearts`, auth?.authHeader()) 
      .then((res) => {
        let sent_hearts_data: any = res.data;

        for (let sent_heart of sent_hearts_data) {
          let decrypted_data = symmetry_object_decryption(
            localStorage.getItem("decryptedPrivateKey"),
            sent_heart["encrypted_data"]
          );
          console.log(decrypted_data);
          let parsed_data = decrypted_data;
          let love_number = parsed_data["loveNumber"];
          axios
            .get(`${BACKEND_URL}/get_freq/${love_number}`)
            .then((res) => {
              if (res.data["frequency"] == 2) matches.push(parsed_data);
              console.log(matches);
            })
            .catch((err) => console.log("err is ", err));
        }
      })
      .catch((err) => console.log("err is ", err));
  }, []);

  return (
    <div>
      <h1>Yo</h1>
    </div>
  );
}

export default MatchCards;
