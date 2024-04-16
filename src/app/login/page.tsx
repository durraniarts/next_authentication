"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import FieldForm from "@/components/FieldForm";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const route = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  async function onSignUp() {
    try {
      setProcessing(true);
      await axios
        .post("/api/user/login", user, { timeout: 5000 })
        .then((err: any) => console.log(err))
        .then(() => route.push("/profile"));
      toast.success("Successfully Signed Up");
    } catch (error: any) {
      console.log(error.message);
      toast.error(`${error.response.data.error}`);
    } finally {
      setProcessing(false);
    }
  }
  const forForm = {
    variant: "Login",
  };
  return (
    <div
      className={`flex flex-col w-auto m-auto justify-center items-center min-h-screen ${
        processing &&
        "after:w-full after:opacity-20 after:absolute after:h-full after:bg-slate-500"
      } `}
    >
      <Toaster position="top-center" reverseOrder={false} />
      {processing && (
        <div className="spinner-container absolute">
          <div className="loading-spinner"></div>
        </div>
      )}
      <FieldForm
        user={user}
        setUser={setUser}
        route={route}
        onSignUp={onSignUp}
        forForm={forForm}
        disabled={buttonDisabled}
      />
      <h2 className="  text-white mt-4">
        Not registered?{" "}
        <Link className=" underline" href={"/signup"}>
          SignUp
        </Link>
      </h2>
    </div>
  );
};

export default SignUp;
