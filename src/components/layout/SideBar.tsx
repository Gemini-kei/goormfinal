"use client";

import { useState } from "react";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside>
      <div
        className={`flex ${isOpen ? "w-64" : "w-16"} bg-gray-800 text-white h-screen transition-width duration-300`}
      >
        <div className="flex flex-col justify-start w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-gray-700 hover:bg-gray-600"
          >
            {isOpen ? "<<" : ">>"}
          </button>
          
          <div className="flex flex-col space-y-4 p-4">
            <h2 className="text-lg font-bold">그룹 목록</h2>
            <ul>
              <li className="hover:bg-gray-700 p-2 rounded">그룹1</li>
              <li className="hover:bg-gray-700 p-2 rounded">
                그룹2
              </li>
              <li className="hover:bg-gray-700 p-2 rounded">그룹3</li>
            </ul>
          </div>

        </div>
      </div>

    </aside>
  );
}
