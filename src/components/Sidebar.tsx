import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import { IoBodyOutline, IoCartOutline, IoCheckmarkOutline, IoCodeWorkingOutline, IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { auth } from "@/auth";

const menuItems = [
  {
    icon: <IoHomeOutline size={30} />,
    path: "/dashboard",
    title: "Dashboard",
  },
  {
    icon: <IoCheckmarkOutline size={30} />,
    path: "/dashboard/rest-todos",
    title: "Rest Todos",
  },
  {
    icon: <IoCheckmarkOutline size={30} />,
    path: "/dashboard/server-todos",
    title: "Server Todos",
  },
  {
    icon: <IoCodeWorkingOutline size={30} />,
    path: "/dashboard/cookies",
    title: "Cokies Todos",
  },
  {
    icon: <IoCartOutline size={30} />,
    path: "/dashboard/products",
    title: "Products Cart",
  },
  {
    icon: <IoBodyOutline size={30} />,
    path: "/dashboard/profile",
    title: "User profile",
  },
];

export const Sidebar = async() => {


  const session =await auth();
  if (!session) {
    return null;
  }

  return (
    <>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            {/* TODO: Next/Link hacia dashboard */}
            <Link href="/dashboard" title="home">
              {/* Next/Image */}
              <Image
                src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
                width={128}
                height={32}
                style={{ width: 128, height: 32 }}
                className="w-32"
                alt="tailus logo"
              />
            </Link>
          </div>

          <div className="mt-8 text-center">
            {/* Next/Image */}
            <Image
              src={ session.user?.image ?? "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp" }
              width={112}
              height={112}
              style={{ width: 112, height: 112 }}
              alt=""
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              { session.user?.name ?? "Bienvenido"}
            </h5>
            <span className="hidden text-gray-400 lg:block">Admin</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {menuItems.map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))}
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <IoLogOutOutline />
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
