import { useEffect } from "react";
import ServerCard from "./components/ServerCard";
import { m } from "./i18n/messages";
import { getLocale } from "./i18n/runtime";

function App() {
  useEffect(() => {
    // Update document title and lang attribute based on current locale
    document.title = m.page_title();
    document.documentElement.lang = getLocale();
  }, []);

  return <ServerCard />;
}

export default App;
