import CreateRoomForm from "@/components/create-room-form";
import PageHeader from "@/components/page-header";

export default function CreateRoom() {

  // fetch faciliris
  return (
    <section className="my-3 rounded-sm mr-3 flex flex-col h-[calc(100vh-16px)]">
      <PageHeader label="New Room" />
      <CreateRoomForm />
    </section>
  );
}
