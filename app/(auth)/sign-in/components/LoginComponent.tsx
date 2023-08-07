"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { Icons } from "@/components/ui/icons";
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
import { useRouter } from "next/navigation";
import { z } from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { CrossIcon, FingerprintIcon, PencilIcon } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import LoadingComponent from "@/components/LoadingComponent";

export function LoginComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  //State for dialog to be by opened and closed by DialogTrigger
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const router = useRouter();

  const formSchema = z.object({
    email: z.string().min(3).max(50),
    password: z.string().min(8).max(50),
  });

  type BillboardFormValues = z.infer<typeof formSchema>;

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Login with username(email)/password
  async function onSubmit(data: BillboardFormValues) {
    setIsLoading(true);
    try {
      const status = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
      if (status?.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: status.error,
        });
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
      router.push("/dashboard");
    }
  }

  async function onPasswordReset(email: string) {
    try {
      setIsLoading(true);
      await axios.post("/api/user/passwordReset", {
        email,
      });
      toast({
        title: "Success",
        description: "Password reset email has been sent.",
      });
    } catch (error) {
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong while resetting the password.",
        });
      }
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Přihlášení</CardTitle>
        <CardDescription>
          Přihlašte se za pomoci Vašich přístupových údajů:{" "}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center w-full ">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Heslo</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          disabled={isLoading}
                          placeholder="Heslo"
                          type={show ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span
                  className="flex px-4 pt-7 w-16"
                  onClick={() => setShow(!show)}
                >
                  <FingerprintIcon size={25} className="text-gray-400" />
                </span>
              </div>
            </div>
            <div className="grid gap-2 py-8">
              <Button
                disabled={isLoading}
                type="submit"
                className="flex gap-2 h-12"
              >
                <span
                  className={isLoading ? "px-3 py-2 animate-spin" : "hidden"}
                >
                  <Icons.spinner className="h-6 w-6" />
                </span>
                <span className={isLoading ? " " : "hidden"}>
                  Ověřování ...
                </span>
                <span className={isLoading ? "hidden" : ""}>Přihlásit</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-5">
        <div className="text-sm text-gray-500">
          Nemáte účet? Registrujte se{" "}
          <Link href={"/"} className="text-blue-500">
            zde
          </Link>
        </div>
        <div className="text-sm text-gray-500">
          Zapoměli jste heslo? Klikněte {/* Dialog start */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="text-blue-500">
              <span className="px-2">zde</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="p-5">Změna hesla</DialogTitle>
                <DialogDescription className="p-5">
                  Napište Vaši emailovou adresu spojenou s Vaším účtem.
                </DialogDescription>
              </DialogHeader>
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <div className="flex px-2 space-x-5 py-5">
                  <Input
                    type="email"
                    placeholder="name@domain.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    disabled={email === ""}
                    onClick={() => {
                      onPasswordReset(email);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              )}
              <DialogTrigger className="w-full text-right pt-5 ">
                <Button variant={"destructive"}>Zrušit</Button>
              </DialogTrigger>
            </DialogContent>
          </Dialog>
          {/* Dialog end */}
        </div>
      </CardFooter>
    </Card>
  );
}
