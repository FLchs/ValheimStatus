import { LanguageSwitcher } from "#/components/LanguageSwitcher";
import { ThemeSwitcher } from "#/components/ThemeSwitcher";

interface AppFooterProps {
  showHelpText?: boolean;
  showGithubLink?: boolean;
  helpText?: React.ReactNode;
}

export function AppFooter({
  showHelpText = false,
  showGithubLink = true,
  helpText,
}: AppFooterProps) {
  return (
    <div className="mt-6 pt-4 border-t border-stone-700/30 text-center">
      {showHelpText && helpText && (
        <div className="text-xs text-parchment/40 mb-4 flex flex-col gap-4">
          {helpText}
        </div>
      )}
      <ThemeSwitcher />
      <LanguageSwitcher />
      {showGithubLink && (
        <a
          href="https://github.com/FLchs/ValheimStatus"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-parchment/30 hover:text-amber-500/70 transition-colors mt-3 py-2 block font-mono"
        >
          github.com/FLchs/ValheimStatus
        </a>
      )}
    </div>
  );
}
