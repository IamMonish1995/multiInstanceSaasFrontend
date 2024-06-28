"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import toast, { Toaster } from "react-hot-toast";

const AddInstanceForm = () => {
  const auth = useAuth() as any;
  const formSchema = z.object({
    name: z.string().min(4, {
      message: "Instance Name must be at least 4 characters.",
    }),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (auth.isLoading != true) {
        auth.setIsLoading(true);
        // toast.promise(
        //   createinstance({ name: values.name, orgId: auth.organizationData._id }),
        //   {
        //     loading: "Loading...",
        //     success: (data: any) => <b>{data}</b>,
        //     error: (err: any) => <b>{err}</b>,
        //   }
        // );
        auth.setIsLoading(false);
      }
    } catch (err) {
      auth.setIsLoading(false);
      console.log(err);
    }
  }
  return (
    <>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </>
  );
};

export default AddInstanceForm;
