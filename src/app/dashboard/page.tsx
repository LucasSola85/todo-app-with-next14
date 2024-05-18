import { auth } from "@/auth";
import { WidgetItem } from "@/components";
import { redirect } from "next/navigation";


export const metadata = {
 title: 'Bienvenidos a App Todo',
 description: 'Bienvenidos a App Todo',
};

export default async function DashboardPage() {


  const session = await auth();
  if (!session) return redirect("/api/auth/signin");


  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
      <WidgetItem title="Users Logged">
        <div className="flex flex-1 flex-col">
          <span><b>Username: </b>{ session.user?.name }</span>
          <span><b>Email: </b>{ session.user?.email }</span>
        </div>
      </WidgetItem>
      
    </div>
  );
}
