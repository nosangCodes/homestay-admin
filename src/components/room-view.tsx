import { DetailedRoom } from "@/types";
import DataView from "./data-view";
import { Switch } from "./ui/switch";
import { formatDate } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import Chip from "./chip";

type Props = {
  data: DetailedRoom;
};

export default function RoomView({ data }: Props) {
  return (
    <ScrollArea className="pb-10">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-1 flex-col gap-y-4">
          <DataView label={"Title"}>
            <p>{data.title}</p>
          </DataView>
          <DataView label={"Description"}>
            <p>{data.description}</p>
          </DataView>
          <div className="flex gap-4 max-md:flex-wrap">
            <DataView label={"Rate per night"}>
              <p>{data.rate}</p>
            </DataView>
            <DataView label={"Under Maintenance"}>
              <Switch checked={data.underMaintenance} />
            </DataView>
          </div>
          <div className="flex gap-4 max-md:flex-wrap">
            <DataView label={"Created at"}>
              <p>{formatDate(data.createdAt)}</p>
            </DataView>
            <DataView label={"Last updated"}>
              <p>{formatDate(data.updatedAt)}</p>
            </DataView>
          </div>
          <DataView label="Facilities">
            <div className="flex flex-wrap gap-2">
              {data.facilities.length < 1 ? (
                <Chip label="No facilities" />
              ) : (
                data.facilities?.map((facility) => (
                  <Chip label={facility} key={facility} />
                ))
              )}
            </div>
          </DataView>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-zinc-500">Thumbnail</h3>
          <div className="rounded-sm overflow-hidden mx-auto h-[400px] lg:h-[300px] w-[400px] lg:w-[350px] relative">
            <img
              className="absolute inset-0 object-cover h-full w-full"
              src={data?.thumbnail?.url}
              alt={data?.thumbnail?.name}
            />
            {/* <img
              className="absolute inset-0 object-cover h-full w-full"
              src={
                "https://images.pexels.com/photos/17786579/pexels-photo-17786579/free-photo-of-nature-beach-sand-coast.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt={data?.thumbnailName?.name}
            /> */}
          </div>
        </div>
      </div>
      <div className="rounded-sm border border-zinc-200 mt-4 p-4 min-h-40">
        <h3 className="text-zinc-500">Room Images</h3>
        {data.images.length < 1 ? (
          <p className="text-zinc-300 text-center">No images available.</p>
        ) : (
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {data.images?.map((image) => (
              <img
                className="h-[400px] w-full md:w-[300px] object-cover"
                src={image.url}
                alt={image.name}
              />
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
