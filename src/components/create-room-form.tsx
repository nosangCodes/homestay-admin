import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRoomSchema, createRoomSchemaType } from "@/pages/auth/schemas";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { useEffect } from "react";
import UploadFile from "./upload-file";

type Props = {};

export default function CreateRoomForm({}: Props) {
  const form = useForm({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      title: "",
      description: "",
      rate: 0,
      underMaintenance: false,
      facilities: [],
      thumbnail: undefined,
    },
  });

  const onSubmit = (values: createRoomSchemaType) => {
    console.log(values);
  };

  useEffect(() => {}, [form]);
  console.log(form.getValues());

  return (
    <Form {...form}>
      <form className="" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-2 flex-1">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input className="text-zinc-800" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="text-zinc-800" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-x-2 items-center">
              <FormField
                name="rate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Rate per night</FormLabel>
                    <FormControl>
                      <Input
                        className="text-zinc-800"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="underMaintenance"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Under Maintenance</FormLabel>
                    <FormControl>
                      <Switch
                        className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-zinc-800"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            name="thumbnail"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" border w-[350px] flex flex-col gap-y-2 border-zinc-200 rounded-sm p-2">
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <UploadFile
                    className="cursor-pointer hover:bg-zinc-800 transition-colors"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <div className="">
            <h3>Thumnail</h3>
            <UploadFile />
          </div> */}
        </div>
      </form>
    </Form>
  );
}

// onDrop={(e) => {
//     e.preventDefault();
//     handleImages(e.dataTransfer.files);
//   }}
//   onDragOver={(e) => e.preventDefault()}
