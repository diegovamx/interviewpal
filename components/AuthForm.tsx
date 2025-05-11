"use client";

import Image from "next/image";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";


const authFormSchema = (type: FormType) => { 
  return z.object({
    name: type === "sign-up" ? z.string().min(3).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3).max(50),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });


  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
   try {
    if (type === "sign-up") {
      console.log("Sign up values: ", values);
      toast.success("Sign up successful!");
    } else{
      console.log("Sign in values: ", values);
      toast.success("Sign in successful!");
    }
   } catch (error) {
      console.log("Error: ", error);
      toast.error(`Something went wrong: ${error}`);
   }
    console.log(values);
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice Job Interviews with AI.</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && <p>Name</p>}
            <p>Email</p>
            <p>password</p>

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "Not a member?" : "Already a member?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary-100 ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
