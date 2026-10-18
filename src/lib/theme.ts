export const THEME_STORAGE_KEY = "theme";

// Inlined in <head> so it runs before first paint: resolves the saved choice
// (or the OS setting when there is none) to data-theme on <html>, then keeps
// it in sync with OS changes and with other tabs.
export const themeScript = `(function(){var d=document.documentElement,m=matchMedia("(prefers-color-scheme: dark)");function a(){var t;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}d.dataset.theme=t==="light"||t==="dark"?t:m.matches?"dark":"light"}a();m.addEventListener("change",a);addEventListener("storage",a)})()`;
