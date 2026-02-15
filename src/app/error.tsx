"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <h2 className="text-2xl mb-6">Something went wrong</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Do not worry, it is not your fault. Sometimes things just break.
          Let us try again!
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
