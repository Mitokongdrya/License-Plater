// app/plates/page.tsx
import PlateList from "@/components/plates/PlateList";

export default function PlatesPage() {
  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        License Plate Index
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Check off each state as you spot their license plates!
      </p>
      <PlateList />
    </main>
  );
}
