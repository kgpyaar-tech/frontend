import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth, loginForm } from "../hooks/Auth";
import illus from "../images/illus.svg";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  let auth = useAuth();
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: loginForm) => {
    setIsLoading(true);
    console.log("Submitted Form Data: ", data);

    auth?.login(data, () => {
      setIsLoading(false);
      console.log("login succex");
      history.push("/dashboard");
    });
  };

  return (
    <div className="authform login">
      <div className="illus">
        <img src={illus} alt="Chora Chori Gup Chup Gup Chup" />
      </div>
      <div className="form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="email"
            placeholder="KGP Email"
            ref={register({
              required: true,
              pattern: /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){5,}@(kgpian.)?iitkgp.ac.in$/i,
            })}
          />
          {errors.email?.type === "required" && <p>This field is required</p>}
          {errors.email?.type === "pattern" && <p>IITKGP email-id only</p>}

          <input name="password" placeholder="Password" type="password" ref={register({ required: true })} />
          {errors.password && <p>This field is required</p>}

          <input type="submit" value="Let me in" disabled={isLoading} />
        </form>
      </div>
    </div>
  );
}

// Register.propTypes = {};

export default Login;
