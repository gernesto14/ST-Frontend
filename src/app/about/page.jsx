"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  SessionAuth,
  useSessionContext,
} from "supertokens-auth-react/recipe/session";
import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import { AccessDeniedScreen } from "supertokens-auth-react/recipe/session/prebuiltui";

import { signOut } from "supertokens-auth-react/recipe/session";
import Link from "next/link";

export default function AboutPage() {
  const [data, setData] = useState({});
  const [cookies, setCookies] = useState({});
  const [protectedData, setProtectedData] = useState({});
  const [metadata, setMetadata] = useState("");
  const [test, setTest] = useState("");

  const router = useRouter();
  const { userId } = useSessionContext();

  useEffect(() => {
    const getOrigin = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SUPERTOKENS_API_DOMAIN}/test`
        );
        // console.log("RESPONSE from API origin: ", data);

        setData(data);
      } catch (error) {
        console.error("Error fetching test:", error);
      }
    };

    getOrigin();
  }, []);

  async function onLogout() {
    await signOut();
    window.location.href = "/auth"; // or redirect to wherever the login page is
  }

  async function testProtectedRoute() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SUPERTOKENS_API_DOMAIN}/like-comment`,
        {
          userId: userId,
        }
      );

      console.log("RESPONSE from API origin: ", data);
    } catch (error) {
      console.error("Error fetching test:", error);
    }
  }

  // metadata
  async function getMetadata() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SUPERTOKENS_API_DOMAIN}/metadata`
      );
      console.log("RESPONSE from API origin: ", data);

      setMetadata(data.data);
    } catch (error) {
      alert("Error fetching metadata:" + error.message);
      console.error("Error fetching test:", error.message);
    }
  }

  async function getTest() {
    try {
      const response = await axios.get("http://localhost:5000/test");
      console.log("RESPONSE from API origin: ", response);
      setTest(response.status);
    } catch (error) {
      console.error("Error fetching test");
    }
  }
  return (
    <SessionAuth
      onSessionExpired={() => {
        router.push("/");
      }}
      // accessDeniedScreen={AccessDeniedScreen}
    >
      <div>
        <h1>About Page PROTECTED</h1>

        <section style={{ marginBottom: "20px" }} />
        <button>
          <Link href="/">Home</Link>
        </button>

        <section style={{ marginBottom: "20px" }} />
        <h5>User Agent: </h5>
        <div>{data && data["user-agent"]}</div>

        <section style={{ marginBottom: "20px" }} />
        <h5>Session:</h5>
        <div>Session: {userId}</div>

        <section style={{ marginBottom: "20px" }} />
        <button onClick={testProtectedRoute}>Test Protected Route</button>

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
        <h4>Test:</h4>
        <button onClick={getTest}>Get Test</button>
        <h5>{test}</h5>

        <section style={{ marginBottom: "20px" }} />
        <h5>Display Cookies:</h5>
        {/* make the test to display wrap */}
        <div
          style={{
            display: "block", // Change to block to allow wrapping
            maxWidth: "100%",
            maxHeight: "200px", // Set a maximum height for the div
            overflowY: "auto", // Enable vertical scrolling
            overflowX: "hidden", // Prevent horizontal scrolling
            wordWrap: "break-word", // Ensure long words break to the next line
            whiteSpace: "pre-wrap", // Preserve whitespace and wrap text
          }}
        >
          {data.cookie}
        </div>

        <section style={{ marginBottom: "40px" }} />
        <h5>Logout:</h5>
        <button onClick={onLogout}>Logout</button>
      </div>
    </SessionAuth>
  );
}
