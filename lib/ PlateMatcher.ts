

// export type Plate = {
//   id: number;
//   state: string;
//   name: string;
//   background: string;
//   textColor: string;
//   themes: string[];
//   region: string; // "west", "south", etc.
// };

// export type PlateQuery = {
//   background?: string;
//   textColor?: string;
//   region?: string;
//   state?: string;
//   themes?: string[]; // user-selected symbols
//   confidence?: {
//     background?: number;
//     textColor?: number;
//     themes?: number;
//   };
// };

// const SIMILAR_COLORS = {
//   white: ["cream", "off-white", "light gray"],
//   blue: ["navy", "light blue"],
//   red: ["maroon", "dark red"],
//   green: ["forest", "lime"],
// };

// function isSimilarColor(a: string | undefined, b: string | undefined) {
//   if (!a || !b) return false;
//   return SIMILAR_COLORS[a]?.includes(b) || SIMILAR_COLORS[b]?.includes(a);
// }

// function scorePlate(plate: Plate, q: PlateQuery) {
//   let score = 0;

//   // Background color
//   if (q.background) {
//     const weight = q.confidence?.background ?? 1;
//     if (plate.background === q.background) score += 3 * weight;
//     else if (isSimilarColor(plate.background, q.background)) score += 1 * weight;
//   }

//   // Text color
//   if (q.textColor) {
//     const weight = q.confidence?.textColor ?? 1;
//     if (plate.textColor === q.textColor) score += 3 * weight;
//     else if (isSimilarColor(plate.textColor, q.textColor)) score += 1 * weight;
//   }

//   // Region / State
//   if (q.state && plate.state === q.state) score += 4;
//   else if (q.region && plate.region === q.region) score += 2;

//   // Themes (icons / symbols)
//   if (q.themes?.length) {
//     const weight = q.confidence?.themes ?? 1;
//     q.themes.forEach(theme => {
//       if (plate.themes.includes(theme)) score += 4 * weight;
//     });
//   }

//   return score;
// }

// export function findPlates(plates: Plate[], query: PlateQuery) {
//   return plates
//     .map(plate => ({
//       plate,
//       score: scorePlate(plate, query),
//     }))
//     .filter(item => item.score > 0) // discard no-match plates
//     .sort((a, b) => b.score - a.score)
//     .slice(0, 10); // top results
// }
