import React, { useState } from "react";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-3 top-2 fixed">
      <button className="" onClick={() => setOpen(true)}>
        🛒
      </button>

      <div
        className={`${
          !open && "hidden"
        }  min-h-screen w-full fixed top-14 left-0 right-0`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`${
          open ? "w-96 mt-16" : "w-0"
        } bg-cyan-400 fixed top-1/2 right-0 transition-all duration-300`}
      >
        <div className={`${!open && "hidden"} pt-3`}>
          <button
            className="ml-4 text-white mb-14"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2">
            Link 1
          </div>
          <div className="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2">
            Link 2
          </div>
          <div className="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2">
            Link 3
          </div>
          <div className="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2">
            Link 4
          </div>
          <div className="text-center text-white text-xl hover:bg-orange-400 cursor-pointer py-3 mb-2">
            Link 5
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
