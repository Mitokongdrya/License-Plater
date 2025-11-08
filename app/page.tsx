import Link from "next/link";
import "@/app/global.css";
import Navbar from "../components/layout/Navbar";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-5xl md:text-6xl font-bold text-center">Welcome to License Plater</h1>
      <p className="mt-2">
        When I was a child, my grandma gave me this flipboard game that encouraged me to record all of the different license plates I saw.
        I completed the entire US in less than six months, and it was a blast!
        This sparked a lifelong interest in license plates, and geography as a whole.
      </p>
      <p className="mt-4">
        Summer 2025, I found the original flipboard, and used it again to track plates.
        It was awesome, but it had some limitations including a cumbersome size and limited plate designs.
        The goal of this application is to help users track the United States license plates that they encounter.
      </p>
      <div className="mt-6">
        <p className="mb-4">
          This app is currently in active development. 
          If you'd like to use it and give feedback, please feel free to reach out!
          The current next steps include:
        </p>
        <ul className="list-disc list-inside">
          <li>Implement user authentication and profiles through a dataase</li>
          <li>Build out the plate matching form</li>
          <li>Add functionality to the map based on Plate Index data</li>
          <li>Implement a user-friendly dashboard for tracking plates</li>
          <li>Implement some head-to-head competition features</li>
        </ul>
      </div>
    </main>
  );
}