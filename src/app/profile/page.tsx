"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const page = () => {
  const route = useRouter();
  const [update, setUpdate] = useState<any>({});

  const [updated, setChanges] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/user/myProfile");
        // console.log(response.data.user._id);
        setUpdate(response.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/user/logout").then((err: any) => console.log(err));
      toast.success("Successfully logged out");
      route.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(`${error.response.data.error}`);
    }
  };

  const getUserDetails = async () => {
    console.log(update?.user?._id);
    route.push(`/profile/${update?.user?._id}`);
  };

  const updateUserProfile = async () => {
    console.log(updated);
    try {
      let response = await axios.patch("/api/user/updateUserProfile", {
        userId: update?.user?._id,
        username: updated,
      });
      console.log(response);

      toast.success("Successfully updated");
    } catch (error: any) {
      console.log(error.message);
      toast.error(`${error.response.data.error}`);
    }
  };

  return (
    <div className="flex flex-col gap-5 m-auto justify-center min-h-screen items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className=" text-4xl p-2 bg-orange-500 text-black rounded-md">
        {update?.user?.username}
      </h1>
      <div className="flex gap-3">
        <Button onClick={logout} className=" bg-red-500">
          Logout
        </Button>
        <Button onClick={getUserDetails}>User Info</Button>
        {/* <Button onClick={updateUserUsername}>Update User Info</Button> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue={`@${update?.user?.username}`}
                  className="col-span-3"
                  onChange={(e) => setChanges(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={updateUserProfile}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default page;
