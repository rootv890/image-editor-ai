"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import { useSignUp } from "../hooks/use-sign-up";
import { Separator } from "@/components/ui/separator";
import Sep from "@/components/Sep";
import { IoWarning } from "react-icons/io5";

function SignUpCard() {
  const mutation = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onCredentialSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
          });
          console.log("Registered!");
        },
      }
    );
  };

  const onProviderSignUp = (provider: "google" | "github" | "discord") => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <section className="flex items-center justify-center h-screen  ">
      <div
        className="absolute inset-0"
        style={{
          // zIndex: -3,
          // backgroundColor: 'black',
          // opacity: 0.3,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4),rgba(0,0,0,0.8))",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/signup.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",

          // filter: 'blur(6px)',
          zIndex: -4,
        }}
      />
      <Card
        className="py-8 border-none shadow-lg max-md:mb-40   mx-auto flex justify-center flex-col items-center lg:h-fit px-12 w-fit   "
        style={{
          background: "rgba(5,5,5, 0.5)",
          backdropFilter: "blur(14px)",
        }}
      >
        <CardHeader className="px-0 pt-0 text-center flex items-center justify-center flex-col  ">
          <CardTitle className="text-white">Create an Account</CardTitle>
          <CardDescription className="text-balance  text-center text-slate-100 pt-2">
            Use your emaill or another <br /> service to continue
          </CardDescription>
        </CardHeader>
        {!!mutation.error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <IoWarning className="size-4" />
            <p>Please try again! something went wrong!</p>
          </div>
        )}

        <CardContent className="space-y-8 px-0 pb-0">
          <form onSubmit={onCredentialSignUp} className="space-y-2.5">
            <Input
              disabled={mutation.isPending}
              value={name}
              type="name"
              required
              placeholder="Full Name"
              className="sign-input"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              disabled={mutation.isPending}
              value={email}
              type="email"
              required
              placeholder="Email"
              className="sign-input "
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              disabled={mutation.isPending}
              value={password}
              minLength={3}
              maxLength={20}
              type="password"
              required
              placeholder="Password"
              className="sign-input "
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              disabled={mutation.isPending}
              type="submit"
              variant={"secondary"}
              className="w-full rounded-full hover:bg-blue-700 bg-blue-600 text-white transition-colors ease-in-out"
              size={"lg"}
            >
              Continue
            </Button>
          </form>

          <Sep />
          <div className="space-y-2.5 flex flex-col w-fit">
            <Button
              disabled={mutation.isPending}
              onClick={() => onProviderSignUp("github")}
              className="flex gap-3 items-center justify-center  text-sm px-8 py-6 rounded-full shadow-inner"
              variant={"outline"}
            >
              <FaGithub size={24} className="text-[#24292e]" /> Continue with
              Github
            </Button>
            <Button
              disabled={mutation.isPending}
              className="flex gap-3 items-center justify-center text-sm px-8 py-6 rounded-full  shadow-inner "
              variant={"outline"}
              onClick={() => onProviderSignUp("discord")}
            >
              <FaDiscord className="text-[#7289da]" size={24} /> Continue with
              Discord
            </Button>
            <Button
              disabled={mutation.isPending}
              className="flex gap-3 items-center justify-center text-sm px-8 py-6 rounded-full shadow-inner "
              variant={"outline"}
              onClick={() => onProviderSignUp("google")}
            >
              <FcGoogle size={24} /> Continue with Google
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an Account?
            </p>
            <Link href="/sign-in">
              <span className="text-blue-500 hover:underline">Sign In</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default SignUpCard;
