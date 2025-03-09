"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export default function HomePage() {
  const [metadata, setMetadata] = useState("");

  const [userId, setUserId] = useState("");

  const session = useSessionContext();

  useEffect(() => {
    if (session !== undefined) {
      setUserId(session.userId);
    }
  }, [session]);

  // metadata
  async function getMetadata() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SUPERTOKENS_API_DOMAIN}/metadata`
      );

      if (response.status !== 200) {
        console.log("No data received from API");
        return;
      }

      console.log("RESPONSE from API origin: ", response);

      setMetadata(response.data.data);
      return;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Unauthorized access" + error.response);
        console.log("Unauthorized access");
      } else {
        alert("Error fetching metadata:" + error.message);
        console.log("Error: ", error.message);
      }
    }
  }

  return (
    <div>
      <h2>Home Page - NOT protected</h2>

      <section style={{ marginBottom: "20px" }} />

      <h4>User ID {userId ? userId : "No userId available yet."}</h4>

      <section style={{ marginBottom: "20px" }} />
      <h4>Metadata:</h4>
      <button onClick={getMetadata}>Get Metadata</button>
      {/* <div>{metadata?}</div> */}
      <div>
        {metadata
          ? `${metadata.first_name} ${metadata.last_name}`
          : "No metadata available yet!"}
      </div>

      <section style={{ marginBottom: "20px" }} />

      <button>
        <Link href="/about">Go to About (Protected)</Link>
      </button>
    </div>
  );
}
