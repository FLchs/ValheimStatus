import { useEffect } from "react";
import ServerCard from "./components/ServerCard";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { m } from "./paraglide/messages.js";
import { getLocale } from "./paraglide/runtime.js";

function App() {
  useEffect(() => {
    // Update document title and lang attribute based on current locale
    document.title = m.page_title();
    document.documentElement.lang = getLocale();
  }, []);

  return (
    <>
      <LanguageSwitcher />
      <ServerCard />
    </>
  );
}

export default App;
