import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
  return (
    <div>
      Hello React! You are ready for heroku
      <section>
        <a href="https://calm-waters-80883.herokuapp.com/api/movies">
          https://calm-waters-80883.herokuapp.com/api/movies
        </a>
        <br />
      </section>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("index"));
