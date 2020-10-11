import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
  return (
    <div>
      Hello React! You are ready for heroku
      <section>
        <a href="/api/movies">Sample api query</a>
      </section>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("index"));
