import { data } from "@/constants/constants";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 w-full px-4 lg:px-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
