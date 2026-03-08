import { LanguageSwitcher } from "#/components/LanguageSwitcher";
import { ThemeSwitcher } from "#/components/ThemeSwitcher";

export function ServerFooter() {
  return (
    <div className="mt-6 pt-4 border-t border-stone-700/30 text-center">
      <ThemeSwitcher />
      <LanguageSwitcher />
      <a 
        href="https://github.com/FLchs/ValheimStatus" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xs text-parchment/30 hover:text-amber-500/70 transition-colors mt-3 py-2 block font-mono"
      >
        github.com/FLchs/ValheimStatus
      </a>
    </div>
  );
}
