import { TabBar } from "@/components";
import { cookies } from "next/headers";


export const metadata = {
 title: 'Cookie Page',
 description: 'Cookie Page',
};

export default function CookiePage() {

  const cookieStore = cookies();
  const currentTab = cookieStore.get('currentTab')?.value ?? '1';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

      <div className="flex flex-col">

        <span className="text-3xl mb-4">Tabs</span>

        <TabBar currentTab={ +currentTab }/>

      </div>

    </div>
  );
}
