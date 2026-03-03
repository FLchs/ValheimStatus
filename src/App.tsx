import { useEffect } from "react";
import ServerCard from "./components/ServerCard";
import { m } from "./i18n/messages";
import { useLocale } from "./i18n/LocaleContext";

function App() {
  const { locale } = useLocale();

  useEffect(() => {
    // Update document title and lang attribute when locale changes
    document.title = m.page_title();
    document.documentElement.lang = locale;
  }, [locale]);

  return <ServerCard />;
}

export default App;
