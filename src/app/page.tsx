"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({ _id: "", username: "" });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/user/myProfile");
        console.log(response.data.user._id);
        setData(response.data.user);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getData();
  }, []);
  return (
    <div className="flex flex-col m-auto justify-center min-h-screen items-center">
      <div className="flex justify-center items-center">
        <span className=" p-2 bg-orange-500 text-white rounded-md mr-2 ">
          Home
        </span>
        <Link
          href={"/profile"}
          className=" p-2 bg-orange-200 text-black rounded-md mr-2"
        >
          Profile
        </Link>
        <Link
          href={`/profile/${data._id}`}
          className=" p-2 bg-orange-200 text-black rounded-md mr-2"
        >
          User Profile
        </Link>
      </div>
    </div>
  );
}
