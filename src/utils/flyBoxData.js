// flyBoxData.js
export function getUniqueBaits(cards = []) {
  const baitSet = new Set();

  cards.forEach((card) => {
    (card.catches || []).forEach((c) => {
      if (c.bait && c.bait.trim()) {
        baitSet.add(c.bait.trim());
      }
    });
  });

  return Array.from(baitSet).sort((a, b) =>
    a.localeCompare(b, "de", { sensitivity: "base" })
  );
}
