import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-100 py-4 dark:bg-gray-800">
      <div className="container mx-auto text-center text-sm text-gray-600 dark:text-gray-300">
        &copy; {currentYear} RideTheHype. All rights reserved.
      </div>
    </footer>
  );
}
