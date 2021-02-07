import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth, signupForm } from "../hooks/Auth";
import illus from "../images/illus.svg";
import { useHistory, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants/constants";
import { KGPyaarKeysGen, privToString, pubToString, symmetry_object_encryption } from "../crypto";
import axios from "axios";

interface initialDetails {
  id: string;
  jwt: string;
  name?: string;
  year?: string;
  department?: string;
  email?: string;
}

function Verify() {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState<initialDetails>({ id: "", jwt: "" });
  let auth = useAuth();
  let { id }: { id: string } = useParams();
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data: signupForm) => {
    setIsLoading(true);

    let keyPair = KGPyaarKeysGen();
    let serializedPrivateKey = privToString(keyPair.privateKey);
    data.encryptedPrivateKey = symmetry_object_encryption(data.password, serializedPrivateKey);

    data.serializedPublicKey = pubToString(keyPair.publicKey);
    localStorage.setItem("privateKey", data.encryptedPrivateKey);

    data.id = details.id;
    data.jwt = details.jwt;
    console.log("Submitted Form Data: ", data);

    auth?.signup(data, (response) => {
      setIsLoading(false);
      console.log("signup succex");

      if(response == undefined) setMessage("Server is down, please try again later");
      if(response.status == 200 ) history.push("/login");
      else setMessage(response.data.message);
    });
  };
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/verify/${id}`)
      .then((response) => {
        setDetails(response.data);
        localStorage.setItem("jwt", response.data.jwt);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="authform register">
      <div className="illus">
        <img src={illus} alt="Chora Chori Gup Chup Gup Chup" />
      </div>
      <div className="form">
        <h1>Signup</h1>
        {message}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={details.name} placeholder="Name" ref={register({ required: true })} />
          {errors.name && <p>This field is required</p>}

          <input name="nickname" placeholder="Nickname" ref={register({ required: true })} />
          {errors.nickname && <p>This field is required</p>}

          <input name="year" defaultValue={details.year} placeholder="Year" ref={register({ required: true })} />
          {errors.year && <p>This field is required</p>}

          <input
            name="department"
            defaultValue={details.department}
            placeholder="Department"
            ref={register({ required: true })}
          />
          {errors.department && <p>This field is required</p>}

          <input
            name="email"
            defaultValue={details.email}
            placeholder="KGP Email"
            ref={register({ required: true, pattern: /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){5,}@iitkgp.ac.in$/i })}
          />
          {errors.email?.type === "required" && <p>This field is required</p>}
          {errors.email?.type === "pattern" && <p>IITKGP email-id only</p>}

          <input name="contact_details" placeholder="Contact details" ref={register({ required: true })} />
          {errors.contact && <p>This field is required</p>}

          <input name="password" type="password" placeholder="Password" ref={register({ required: true })} />
          {errors.password && <p>This field is required</p>}

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            ref={register({ validate: (value) => value === password.current || "The passwords do not match." })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <input type="submit" value="Break My Heart" disabled={isLoading} />
        </form>
      </div>
    </div>
  );
}

// Register.propTypes = {};

export default Verify;
