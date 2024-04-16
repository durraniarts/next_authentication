"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Profile = ({ params }: any) => {
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
  // console.log(data);
  return (
    <div className="flex m-auto justify-center min-h-screen items-center">
      <h2 className="text-white">
        <span className=" p-2 bg-orange-500 text-black rounded-md mr-2">
          {data._id}
          <hr />
          {data.username}
        </span>
        Profile
      </h2>
    </div>
  );
};

export default Profile;
