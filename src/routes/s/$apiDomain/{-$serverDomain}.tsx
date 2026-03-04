import { createFileRoute } from "@tanstack/react-router";

import { ConfigProvider } from "../../../context/ConfigContext";
import App from "../../../App";

export const Route = createFileRoute("/s/$apiDomain/{-$serverDomain}")({
  component: RouteComponent,
});

function RouteComponent() {
  const { apiDomain, serverDomain } = Route.useParams();

  return (
    <ConfigProvider apiDomain={apiDomain} serverDomain={serverDomain}>
      <App />
    </ConfigProvider>
  );
}
