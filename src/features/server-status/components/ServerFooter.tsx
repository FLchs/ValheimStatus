import { m } from "#/i18n/messages";
import { LanguageSwitcher } from "#/components/LanguageSwitcher";
import { ThemeSwitcher } from "#/components/ThemeSwitcher";

export function ServerFooter() {
  return (
    <div className="mt-6 pt-4 border-t border-stone-700/30 text-center">
      <p className="text-xs text-parchment/30">
        {m.designed_by()}{" "}
        <span className="text-amber-500/70 font-medium">François Lachèse</span>
      </p>
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  );
}
