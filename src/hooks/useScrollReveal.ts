import { useEffect } from "react";

function revealVisibleElements() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll<HTMLElement>(".reveal");

  if (reduced) {
    els.forEach((el) => el.classList.add("is-visible"));
    return () => {};
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  els.forEach((el) => {
    if (!el.classList.contains("is-visible")) {
      io.observe(el);
    }
  });

  return () => io.disconnect();
}

/** Run on every route so `.reveal` blocks become visible after client navigation. */
export function useScrollReveal(routeKey = "") {
  useEffect(() => {
    const cleanup = revealVisibleElements();
    return cleanup;
  }, [routeKey]);
}
