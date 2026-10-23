import { useEffect, useState } from "react";

export default function useActive(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setActive(x.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((i) => document.getElementById(i) && io.observe(document.getElementById(i)));
    return () => io.disconnect();
  }, []);
  return active;
}