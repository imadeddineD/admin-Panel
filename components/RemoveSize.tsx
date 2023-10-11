"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveSize({ id } : any ) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/size?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }

  };

  return (
        <button onClick={removeTopic} className='flex gap-2 bg-red-800 text-white px-4 py-1 rounded-md duration-200 shadow-sm hover:bg-red-700'>
            <div className="text-red-400">
                <HiOutlineTrash size={20} />   
            </div>
        </button>
  );
}
