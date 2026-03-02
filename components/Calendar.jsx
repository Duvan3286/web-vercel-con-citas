// components/Calendar.jsx
"use client";

import { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

export default function Calendar({ onSelectDate }) {
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      setTimeout(() => {
        try {
          calendarRef.current.getApi().render();
        } catch (e) {}
      }, 100);
    }
  }, []);

  const hoyLocal = new Date().toLocaleDateString("en-CA"); // ← CORRECCIÓN CLAVE

  return (
    <div className="max-w-4xl mx-auto">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}

        dateClick={(info) => {
          onSelectDate(info.dateStr);
        }}

        validRange={{ start: hoyLocal }}

        height="auto"
      />
    </div>
  );
}
