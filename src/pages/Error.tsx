import { useEffect } from "react";

const ErrorPage = () => {
  useEffect(() => {
    console.error("An error occurred");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-xl text-gray-600 mb-4">An error occurred</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;