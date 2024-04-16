"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldProps = {
  user: { username?: string; password: string; email: string };
  setUser: any;
  route: any;
  onSignUp: any;
  forForm: {
    variant: string;
  };
  disabled: boolean;
};

const FieldForm = ({
  user,
  setUser,
  route,
  onSignUp,
  forForm,
  disabled,
}: FieldProps) => {
  return (
    <>
      <Card className="sm:w-[350px] w-[280px]">
        <CardHeader>
          <CardTitle>{forForm.variant}</CardTitle>
          <CardDescription>
            {forForm.variant === "Sign Up" ? "SignUp" : "Login"} your Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  autoFocus
                  placeholder="@example.com"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                />
              </div>
              {forForm.variant === "Sign Up" && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="username "
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    value={user.username}
                  />
                </div>
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="Password"
                  placeholder="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  value={user.password}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => route.push("/")}>
            Back
          </Button>
          <Button onClick={onSignUp} disabled={disabled}>
            {forForm.variant === "Sign Up" ? "SignUp" : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default FieldForm;
