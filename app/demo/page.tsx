import { DefaultToggle } from "@/components/ui/demo";

export default function DemoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md rounded-xl border border-line bg-surface p-8 shadow-sm">
        <h1 className="mb-6 text-center text-xl font-semibold">Demo Theme Toggle</h1>
        <DefaultToggle />
      </div>
    </div>
  );
}
