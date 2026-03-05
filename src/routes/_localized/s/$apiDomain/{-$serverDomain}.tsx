import { createFileRoute } from "@tanstack/react-router";

import { ConfigProvider, ServerCard } from "../../../../features/server-status";
import { useLocale } from "../../../../i18n/LocaleContext";

export const Route = createFileRoute("/_localized/s/$apiDomain/{-$serverDomain}")({
  component: RouteComponent,
});

function RouteComponent() {
  const { apiDomain, serverDomain } = Route.useParams();
  useLocale() // Subscribe to locale changes

  return (
    <ConfigProvider apiDomain={apiDomain} serverDomain={serverDomain}>
      <ServerCard />
    </ConfigProvider>
  );
}
