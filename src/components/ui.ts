// Shared look for buttons, links and chips, so every page uses the same classes.
const button = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold";

// The main action: blue with charcoal text (6:1 contrast in both themes).
export const buttonPrimary = `${button} bg-accent text-on-accent hover:bg-accent-hover`;
// Second action on the page background.
export const buttonSecondary = `${button} border border-ink text-ink hover:bg-soft`;
// Second action on a dark band.
export const buttonOnDark = `${button} border border-white/50 text-white hover:border-accent hover:text-accent`;
// Charcoal button, used on the blue band.
export const buttonDark = `${button} bg-dark text-white hover:bg-dark-soft`;

// Text link with an arrow (the arrow is added by the caller).
export const linkArrow =
  "inline-flex min-h-11 items-center gap-2 font-semibold text-accent-text underline underline-offset-4 hover:no-underline";

// Small "Sample" label for projects.
export const chip =
  "inline-flex items-center rounded-full border border-line bg-surface px-3 py-0.5 text-sm font-semibold text-muted";
