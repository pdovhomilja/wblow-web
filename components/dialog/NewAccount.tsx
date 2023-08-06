"use client";

import LoadingComponent from "@/components/LoadingComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

const NewAccountDialog = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Název společnosti musí obsahovat minimálně 2 znaky",
    }),
    email: z.string().email({ message: "Formát emailu není správný" }),
    phone: z
      .string()
      .min(9, { message: "Telefonní číslo není správné" })
      .max(15, { message: "Telefonní číslo není správné" }),
  });

  type NewAccountFormValues = z.infer<typeof formSchema>;

  const form = useForm<NewAccountFormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  //Actions

  const onSubmit = async (data: NewAccountFormValues) => {
    setIsLoading(true);
    try {
      await axios.post(`/api/register`, data);

      toast({
        title: "Success",
        description: `New account: ${data.name}, byl úspěně vytvořen.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data,
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="px-2">Registrace</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="p-2">
            Registrace do aplikace Wblow
          </DialogTitle>
          <DialogDescription className="p-2">
            Aplikace je zdarma k otestování na 30 dní. Po uplynutí této doby je
            třeba si zakoupit předplatné.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className="flex w-full ">
            {/*     <pre>
              <code>{JSON.stringify(form.watch(), null, 2)}</code>
              <code>{JSON.stringify(form.formState.errors, null, 2)}</code>
            </pre> */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="h-full w-full space-y-3"
              >
                <div className="flex flex-col space-y-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Název společnosti</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="Wblow s.r.o."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="jmeno@domena.cz"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefon</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="+420 123 456 789"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full justify-end space-x-2 pt-2">
                  <Button type="submit">Registrovat</Button>
                  <DialogTrigger asChild>
                    <Button variant={"destructive"}>Zavřít</Button>
                  </DialogTrigger>
                </div>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountDialog;
