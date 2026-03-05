import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useLocale } from "../i18n/LocaleContext";
import { m } from "../i18n/messages";
import { useEffect } from "react";

export const Route = createFileRoute("/_localized")({
  component: LocaleLayout,
});

function LocaleLayout() {
  const { locale } = useLocale();

  useEffect(() => {
    document.title = m.page_title();
    document.documentElement.lang = locale;
  }, [locale]);

  return <Outlet />;
}

