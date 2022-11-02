import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Camp: React.FC = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, desc };
      await fetch(`http://localhost:3000/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Create Campsite</h1>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Title"
            type="text"
            value={name}
          />
          <textarea
            cols={50}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            rows={8}
            value={desc}
          />
          <input
            disabled={!name || !desc}
            type="submit"
            value="Create"
          />
          <a
            className="back"
            href="#"
            onClick={() => Router.push("/")}
          >
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Camp;
