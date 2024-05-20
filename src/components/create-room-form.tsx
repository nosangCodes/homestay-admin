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
import FacilitySelector from "./facility-selector";
import { useEffect } from "react";
import { fetchFacilities } from "@/api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import facilitiesState from "@/state/atom/facilities";
import { facilitiesValue } from "@/state/selectors/room";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { DetailedRoom, FileLinkObject } from "@/types";
import { useNavigate } from "react-router-dom";

type CreateRoomFormProps = {
  data?: DetailedRoom;
  edit?: boolean;
  id?: string;
};

export default function CreateRoomForm({
  data,
  edit,
  id,
}: CreateRoomFormProps) {
  const navigate = useNavigate();

  // const refreshPage = () => {
  //   navigate(0);
  // };

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
    reValidateMode: "onBlur",
    defaultValues: {
      title: data?.title ?? "",
      description: data?.description ?? "",
      rate: data?.rate ?? 0,
      underMaintenance: data?.underMaintenance ?? false,
      facilities: data?.facilityIds ?? [0],
      thumbnail: data?.thumbnail ? [data.thumbnail] : undefined,
      images: Array.isArray(data?.images) ? data?.images : undefined,
    },
  });

  console.log("watching...", form.watch())

  const isLoading = form.formState.isLoading || form.formState.isSubmitting;

  useEffect(() => {
    const safeFacilities = facilities || [];
    if (safeFacilities.length > 0 && !edit) {
      const ids = safeFacilities
        .filter((facility) => facility.id % 2 === 0)
        .map((facility) => facility.id);
      if (ids.length > 0) {
        form.setValue("facilities", ids);
      }
    }
  }, [edit, facilities, form]);

  const onSubmit = async (values: createRoomSchemaType) => {
    console.log("submitting....", values);
    const formData = new FormData();
    const {
      description,
      title,
      facilities,
      rate,
      underMaintenance,
      images,
      thumbnail,
    } = values;

    formData.append("title", title);
    formData.append("description", description);
    formData.append("rate", JSON.stringify(rate));
    formData.append("underMaintenance", JSON.stringify(underMaintenance));
    
    console.log("🚀 ~ onSubmit ~ thumbnail:", thumbnail)
    
    if (thumbnail?.[0] instanceof File) {
      formData.append("thumbnail", thumbnail[0]);
    }

    const removedImages: number[] = [];

    for (const image of images as (File | FileLinkObject)[]) {
      if (image instanceof File) {
        formData.append("image", image);
      } else if (edit && image.id && image.removed) {
        removedImages.push(image.id);
      }
    }

    if (removedImages?.length > 0) {
      for (const [index, removedImageId] of removedImages.entries()) {
        formData.append(
          `removedImages[${index}][id]`,
          JSON.stringify(removedImageId)
        );
      }
    }

    for (const [index, facility] of facilities.entries()) {
      formData.append(`facilities[${index}][id]`, JSON.stringify(facility));
    }

    let res: Response;

    if (edit && id) {
      res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/room/${id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
    } else {
      res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/room`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
    }

    if (!res.ok) {
      toast.error("Something went wrong! Please try again.");
      return;
    }

 await res.json();
    toast.success(`Room has been ${edit ? "updated" : "created"}.`);
    if (!edit) {
      form.reset();
    } else if (id) {
      navigate(`/rooms/${id}`);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-2 mb-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col gap-2 flex-1">
            <FormField
              disabled={isLoading}
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
              disabled={isLoading}
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
                disabled={isLoading}
                name="rate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Rate per night</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
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
              disabled={isLoading}
              name="facilities"
              control={form.control}
              render={({ field }) => (
                <FormItem
                  tabIndex={0}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input ring-offset-background rounded-sm p-2"
                >
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
            disabled={isLoading}
            name="thumbnail"
            control={form.control}
            render={({ field }) => (
              <FormItem
                tabIndex={0}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input ring-offset-background w-full md:w-[350px] sm:h-[390px] flex flex-col gap-y-2 rounded-sm p-2"
              >
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <UploadFile
                    className="cursor-pointer min-h-[250px] hover:bg-zinc-800/25  transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Upload One Image</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          disabled={isLoading}
          name={"images"}
          control={form.control}
          render={({ field }) => (
            <FormItem
              tabIndex={0}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input ring-offset-background rounded-sm p-2 min-h-[200px] w-full flex flex-col"
            >
              <FormLabel>Room Images</FormLabel>
              <FormControl>
                <UploadFile
                  {...field}
                  multiple
                  className="cursor-pointer hover:bg-zinc-800/25 transition-colors"
                />
              </FormControl>
              <FormDescription>Atleast One Image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="my-2" type="submit">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : edit ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Form>
  );
}
