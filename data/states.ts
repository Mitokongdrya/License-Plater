// data/states.ts
export const states = [
  {
    code: "CA",
    name: "California",
    image: "/images/CA.png",
    plates: [
      { id: 1, name: "Standard", image: "/plates/CA.png" },
      { id: 2, name: "Legacy", image: "/plates/CA-legacy.png" },
      { id: 3, name: "Yosemite", image: "/plates/CA-yosemite.png" },
    ],
  },
  {
    code: "OR",
    name: "Oregon",
    image: "/images/OR.jpg",
    plates: [
      { id: 1, name: "Standard", image: "/plates/OR.jpg" },
      { id: 2, name: "Crater Lake", image: "/plates/OR-crater.png" },
    ],
  },
  // ...more states
];


// // data/states.ts
// export const states = [
//   { code: "CA", name: "California", image: "/plates/CA.png" },
//   { code: "OR", name: "Oregon", image: "/plates/OR.png" },
//   { code: "TX", name: "Texas", image: "/plates/TX.png" },
//   { code: "WA", name: "Washington", image: "/plates/WA.png" },
//   // ... add the rest
// ];
