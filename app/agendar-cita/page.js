"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Calendar = dynamic(() => import("../../components/Calendar"), { ssr: false });
const AvailableSlots = dynamic(() => import("../../components/AvailableSlots"), { ssr: false });

export default function AgendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <main className="min-h-screen py-16 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Agendar Cita</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Calendar onSelectDate={(d) => setSelectedDate(d)} />
          </div>

          <div>
            <AvailableSlots date={selectedDate} />
          </div>
        </div>
      </div>
    </main>
  );
}
