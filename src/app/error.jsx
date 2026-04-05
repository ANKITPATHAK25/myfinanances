"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 px-6">
        <div className="text-6xl font-display font-bold text-destructive">
          Oops
        </div>
        <h1 className="text-xl font-display font-semibold text-foreground">
          Something went wrong
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          An unexpected error occurred. Please try again or refresh the page.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
