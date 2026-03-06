import { Outlet, createRootRoute } from "@tanstack/react-router";


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
        version: {import.meta.env.VITE_APP_VERSION || "dev"}
      </footer>
    </div>
  );
}
