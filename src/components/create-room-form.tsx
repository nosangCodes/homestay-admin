import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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
import UploadFile from "./upload-file";
import { Button } from "./ui/button";
import FacilitySelector from "./facility-selecto";
import { useEffect } from "react";
import { fetchFacilities } from "@/api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import facilitiesState from "@/state/atom/facilities";
import { facilitiesValue } from "@/state/selectors/room";

export default function CreateRoomForm() {
  const setFacilities = useSetRecoilState(facilitiesState);
  const facilities = useRecoilValue(facilitiesValue);
  // fetch faciliries
  useEffect(() => {
    fetchFacilities()
      .then((res) => {
        setFacilities((prev) => ({
          ...prev,
          facilities: res.data,
        }));
      })
      .catch((err) => {
        console.error("error fetching facilities", err);
      });

    return () => {};
  }, [setFacilities]);

  const form = useForm({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      title: "",
      description: "",
      rate: 3000,
      underMaintenance: false,
      thumbnail: undefined,
      facilities: [0],
    },
  });

  useEffect(() => {
    const safeFacilities = facilities || [];
    if (safeFacilities.length > 0) {
      const ids = safeFacilities
        .filter((facility) => facility.id % 2 === 0)
        .map((facility) => facility.id);
      if (ids.length > 0) {
        form.setValue("facilities", ids);
      }
    }
  }, [facilities, form]);

  const onSubmit = (values: createRoomSchemaType) => {
    console.log("submitting...");
    console.log("submitted values", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-2 mb-3">
          <div className="flex flex-col gap-2 flex-1">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input autoFocus {...field} />
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
                    <Textarea {...field} />
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
                      <Input {...field} type="number" />
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
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="facilities"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facilities</FormLabel>
                  <FormControl>
                    <FacilitySelector
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="thumbnail"
            control={form.control}
            render={({ field }) => (
              <FormItem
                tabIndex={0}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input ring-offset-background w-[350px] h-[300px] flex flex-col gap-y-2 rounded-sm p-2"
              >
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <UploadFile
                    className="cursor-pointer hover:bg-zinc-800 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Upload One Image</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
