import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 px-6">
        <div className="text-8xl font-display font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-xl font-display font-semibold text-foreground">
          Page Not Found
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
