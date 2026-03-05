import { Outlet, createRootRoute } from "@tanstack/react-router";
import { version } from "../../package.json";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        version: {version}
      </footer>
    </div>
  );
}
