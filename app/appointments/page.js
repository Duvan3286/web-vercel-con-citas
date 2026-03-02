import AppointmentForm from "../../components/AppointmentForm";

export default function AppointmentsPage() {
  return (
    <div className="py-20 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-stone-700">
        Agendar Cita
      </h1>
      <AppointmentForm />
    </div>
  );
}
