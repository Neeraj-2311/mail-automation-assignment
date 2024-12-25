"use client"
import { CreateSchedule } from "@/components/createSchedule";
import { Navbar } from "@/components/navbar";
import { ScheduleList } from "@/components/scheduleList";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen md:h-screen pt-[60px]">
      <Navbar/>
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <div className="md:w-1/2 md:border-r md:border-gray-300 overflow-y-auto p-4 pb-10">
          <CreateSchedule/>
        </div>
        <div className="md:w-1/2 overflow-y-auto p-4">
          <ScheduleList/>
        </div>
      </div>
    </div>
  );
}