import { fetchRooms } from "@/api";
import PageHeader from "@/components/page-header";
import TablePagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, textSlice } from "@/lib/utils";
import { Room } from "@/types";
import { useEffect, useState } from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";

export default function Rooms() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const pageSize = parseInt(searchParams.get("pageSize") ?? "20");
  const labels = [
    "",
    "Title",
    "Description",
    "Rate per night",
    "Under Maintenance",
    "CreatedAt",
  ];
  const [rooms, setRooms] = useState<Room[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchRooms(page, pageSize).then((res) => {
      const {
        rooms,
        metadata: { totalPages },
      } = res.data as {
        rooms: Room[];
        metadata: {
          totalPages: number;
        };
      };
      setTotalPages(totalPages);
      setRooms(rooms);
    });

    return () => {
      setRooms([]);
    };
  }, [page, pageSize]);

  const Action = () => {
    return (
      <Link to={"new"}>
        <Button size={"sm"} variant={"secondary"}>Add new</Button>
      </Link>
    );
  };
  return (
    <section className="my-3 rounded-sm mr-3 flex flex-col h-[calc(100vh-16px)]">
      <PageHeader actions={<Action />} label="Rooms" />
      <Table>
        <TableHeader className="sticky top-0 z-20">
          <TableRow className="hover:bg-transparent">
            {labels?.map((label, index) => (
              <TableHead className="text-white" key={index}>
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room, index) => (
            <TableRow
              key={room.id}
              className="hover:bg-zinc-800 hover:text-zinc-100"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Link
                  className="hover:underline cursor-pointer hover:text-indigo-600"
                  to={`${room.id}`}
                >
                  {room.title}
                </Link>
              </TableCell>
              <TableCell>{textSlice(room.description, 30)}</TableCell>
              <TableCell>{room.rate}</TableCell>
              <TableCell>
                <Switch
                  checked={room.underMaintenance}
                />
              </TableCell>
              <TableCell>{formatDate(room.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <TablePagination
          page={page}
          pageSize={pageSize}
          pages={totalPages}
          className="mt-auto bg-emerald-500 py-2"
        />
      )}
      <Outlet />
    </section>
  );
}
