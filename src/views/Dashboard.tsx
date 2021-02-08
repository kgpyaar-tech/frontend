import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../constants/constants";
import UserCard from "../component/UserCard";
import { useAuth } from "../hooks/Auth";
import axios from "axios";
import * as Icon from "react-feather";

interface inquire {
  name: string;
  nickname: string;
  department: string;
  year: string;
  public_key: string;
}

function Dashboard() {
  const auth = useAuth();
  const [isSearched, setIsSearched] = useState(false);
  const { register, handleSubmit } = useForm();
  const [searchResult, setSearchResult] = useState<inquire[]>([]);
  const [message, setMessage] = useState("");

  const onSubmit = (data: inquire) => {
    setIsSearched(true);
    axios
      .post(`${BACKEND_URL}/search`, data, auth?.authHeader())
      .then((response) => {
        setSearchResult(response.data);
        setMessage(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="authform dashboard">
      <div className={`form ${isSearched ? "expand" : ""}`}>
        <h1> The option to send hearts would be available from 11th February</h1>
        {/* <h1>Search</h1>
        {message}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="name" placeholder="Name" ref={register({})} />

          <input name="department" placeholder="Department" ref={register({})} />

          <input name="year" placeholder="Year" ref={register({})} />

          <button type="submit"> {isSearched ? <Icon.Search /> : "Pata Lago"} </button>
        </form>
        {isSearched && (
          <div className="results">
            {searchResult &&
              searchResult.map((user) => {
                return (
                  <UserCard
                    name={user.name}
                    nickname={user.nickname}
                    department={user.department}
                    year={user.year}
                    publicKey={user.public_key}
                  />
                );
              })}
          </div>
        )} */}
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
