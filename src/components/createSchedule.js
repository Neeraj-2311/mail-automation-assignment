"use client"
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import CreateModal from "./createModal";

const CreateScheduleContainer = () => {

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const checkHash = () => {
    if (window.location.hash === '#create-schedule') {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    checkHash();
  }, [pathname, searchParams]);

  return (
    <>
    <CreateModal isOpen={isModalOpen} onClose={() => router.back()}/>
    <div className="flex items-center mb-4">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-600 whitespace-nowrap mr-2">
        Create a Schedule
      </h2>
      <div className="flex-grow border-t-2 border-gray-300"></div>
    </div>
    <Link href={"#create-schedule"}>
      <div className="max-w-sm mx-auto">
        <button className="w-full bg-white border border-gray-300 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none">
          <h3 className="text-lg font-medium text-gray-700 mb-2">+ New Schedule</h3>
          <p className="text-gray-500">Click to create a new schedule.</p>
        </button>
      </div>
    </Link>
    </>
  );
};

export const CreateSchedule = () =>{
  return(
    <Suspense>
      <CreateScheduleContainer/>
    </Suspense>
  )
}