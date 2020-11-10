import React from "react";
import Layout from "../components/Layout";

export default function Newsletter(): JSX.Element {
  return (
    <Layout>
      <h1>Join My Newsletter</h1>
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input
            className="input is-medium"
            type="text"
            placeholder="Email Address"
          />
        </p>
        <p className="control">
          <button className="button is-primary is-medium">Join</button>
        </p>
      </div>
    </Layout>
  );
}
