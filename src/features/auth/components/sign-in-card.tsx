"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Sep from "@/components/Sep";
import { useSearchParams } from "next/navigation";
import { IoWarning } from "react-icons/io5";
function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useSearchParams();
  const error = params.get("error");

  const onCredentialSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
  };

  const onProviderSignIn = (provider: "google" | "github" | "discord") => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <section className="flex items-center justify-center h-screen ">
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
          backgroundImage: `url('/signin.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",

          // filter: 'blur(6px)',
          zIndex: -4,
        }}
      />
      <Card
        className="p-8 border-none shadow-lg max-md:mb-40   mx-auto flex justify-center flex-col items-center lg:h-fit   "
        style={{
          background: "rgba(5,5,5, 0.5)",
          backdropFilter: "blur(14px)",
        }}
      >
        <CardHeader className="px-0 pt-0 text-white text-center flex items-center justify-center flex-col  ">
          <CardTitle>Login to Continue</CardTitle>
          <CardDescription>
            Use your emaill or another service to continue
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <IoWarning className="size-4" />
            <p>Invalid Email Address</p>
          </div>
        )}
        <CardContent className="space-y-5 px-0 pb-0">
          <form onSubmit={onCredentialSignIn} className="space-y-2.5">
            <Input
              value={email}
              type="email"
              required
              placeholder="Email"
              className="sign-input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              value={password}
              type="password"
              required
              placeholder="Password"
              minLength={3}
              maxLength={20}
              className="sign-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant={"secondary"}
              className="w-full rounded-full hover:bg-blue-700 bg-blue-600 text-white transition-colors ease-in-out"
              size={"lg"}
            >
              Continue
            </Button>
          </form>
          <Sep />
          <div className="space-y-2 flex-col w-full flex items-center justify-center ">
            <Button
              onClick={() => onProviderSignIn("github")}
              className="flex gap-3 items-center justify-center text-sm px-8 py-6 rounded-full  shadow-inner flex-grow min-w-0"
              variant={"outline"}
            >
              <FaGithub size={24} className="text-[#24292e]" /> Continue with
              Github
            </Button>
            <Button
              className="flex gap-3 items-center justify-center text-sm px-8 py-6 rounded-full  shadow-inner flex-grow min-w-0 "
              variant={"outline"}
              onClick={() => onProviderSignIn("discord")}
            >
              <FaDiscord className="text-[#7289da]" size={24} /> Continue with
              Discord
            </Button>
            <Button
              className="flex gap-3 items-center justify-center text-sm px-8 py-6 rounded-full shadow-inner flex-grow min-w-0 "
              variant={"outline"}
              onClick={() => onProviderSignIn("google")}
            >
              <FcGoogle size={24} /> Continue with Google
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an Account?&nbsp;
            </p>
            <Link href="/sign-up">
              <span className="text-blue-500 hover:underline">Sign Up</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default SignInCard;
