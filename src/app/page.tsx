"use client";

import Link from "next/link";
// import { useState } from "react";
// import axios from "axios";

export default function HomePage() {
  // const [metadata, setMetadata] = useState({});

  // metadata
  // async function getMetadata() {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_SUPERTOKENS_API_DOMAIN}/metadata`
  //     );

  //     if (response.status !== 200) {
  //       console.log("No data received from API");
  //       return;
  //     }

  //     console.log("RESPONSE from API origin: ", response);

  //     setMetadata(response.data.data);
  //     return;
  //   } catch (error) {
  //     alert("Error fetching metadata:" + error);
  //     console.log("Error: ", error);
  //   }
  // }

  return (
    <div>
      <h2>Home Page - NOT protected</h2>

      <section style={{ marginBottom: "20px" }} />

      <section style={{ marginBottom: "20px" }} />
      {/* <h4>Metadata:</h4>
      <button onClick={getMetadata}>Get Metadata</button> */}
      {/* <div>{metadata?}</div> */}
      {/* <div>
        {metadata
          ? `${metadata?.first_name} ${metadata?.last_name}`
          : "No metadata available yet!"}
      </div> */}

      <section style={{ marginBottom: "20px" }} />

      <button>
        <Link href="/about">Go to About (Protected)</Link>
      </button>
    </div>
  );
}
