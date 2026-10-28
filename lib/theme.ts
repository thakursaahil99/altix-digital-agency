/** Inline script for <head>: applies the saved/system theme before first paint (no flash). */
export const themeScript = `(function(){try{var t=localStorage.getItem("altix-theme");if(!t){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){}})()`;
