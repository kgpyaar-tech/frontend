import React from "react";
import illus from "../images/illus.svg";

function Home() {
  return (
    <div className="home">
      <div className="illus">
        <img src={illus} alt="Chora Chori Gup Chup Gup Chup" />
      </div>
      <div className="content">
        <h1>Why use KGPyaar?</h1>
        <ul>
          <li>We respect your privacy </li>
          <li>Cryptographically secure app</li>
          <li>Encrypted data on client-side</li>
          <li>Server unaware of your selections</li>
        </ul>

        <a href="https://bit.ly/KGPyaar-Doc" rel="noreferrer noopener" target="_blank">
          Detailed Docs
        </a>
        <a href="https://bit.ly/KGPyaar-FAQ" rel="noreferrer noopener" target="_blank">
          FAQs
        </a>
      </div>
    </div>
  );
}

export default Home;
