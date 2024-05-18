'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";


export default function ProfilePage() {
  
  const session = useSession();
  const  {data} = session;


  return (
    <div className="mx-auto right-0 mt-2 w-60">
      <div className="bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
          <Image
            src={ data?.user?.image || "/profile.png"}
            width={60}
            height={60}
            className="rounded-full"
            alt="profile-image"
          />
          <p className="pt-2 text-lg font-semibold text-gray-50">{ data?.user?.name ?? 'No name' }</p>
          <p className="text-sm text-gray-100">{ data?.user?.name ?? 'No email' }</p>
          <div className="mt-5">
            <a className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100">
              Role: { 'No role' }
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
