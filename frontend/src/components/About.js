import React from "react";
import ankit from "../images/ankit.png";

const About = () => {
  return (
    <div className="container">
      <h1 className="p-3">About</h1>
      <div className="card" style={{ width: "25rem" }}>
        <img src={ankit} className="card-img-top p-4" alt="..." />
        <div className="card-body">
        <h2>Ankit Kumar Sinha</h2>
          <p className="card-text">
          A growing full stack web developer, who specializes in building web
            applications for the best digital experiences. I am keenly focused
            on building impactful products which can create value in people's
            lives. Skilled in HTML, CSS, JavaScript, ExpressJs, PHP, Wordpress,
            Postman, ReactJS, MongoDB, MySQL and nodeJs. I'm looking forward to
            opportunities that will help me grow so that I keep contributing my
            part in this beautiful field of technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
