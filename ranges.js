// Données de démonstration.
// Structure prévue pour accueillir ensuite les ranges exactes par profondeur.
window.RANGE_DATA = {
  "15": {
    BTN_OPEN: {
      raise: ["22+", "A2s+", "K5s+", "Q7s+", "J7s+", "T7s+", "97s+", "87s", "76s", "65s", "A7o+", "K9o+", "Q9o+", "J9o+", "T9o"],
      call: [],
      mixed: ["K4s", "Q6s", "J6s", "T6s", "86s", "A6o", "K8o"]
    },
    SB_OPEN: {
      raise: ["22+", "A2s+", "K2s+", "Q4s+", "J5s+", "T6s+", "96s+", "86s+", "75s+", "65s", "54s", "A2o+", "K7o+", "Q8o+", "J8o+", "T8o+", "98o"],
      call: [],
      mixed: ["Q3s", "J4s", "T5s", "85s", "64s", "K6o", "Q7o", "J7o"]
    },
    BB_VS_BTN: {
      raise: ["88+", "ATs+", "AJo+", "KQs"],
      call: ["22-77", "A2s-A9s", "K6s+", "Q8s+", "J8s+", "T8s+", "97s+", "87s", "76s", "65s", "A8o-ATo", "K9o+", "Q9o+", "J9o+", "T9o"],
      mixed: ["A5o-A7o", "K8o", "Q8o", "J8o", "86s", "75s"]
    },
    BB_VS_SB: {
      raise: ["77+", "A9s+", "ATo+", "KJs+", "KQo"],
      call: ["22-66", "A2s-A8s", "K2s+", "Q5s+", "J6s+", "T6s+", "96s+", "86s+", "75s+", "65s", "54s", "A2o-A9o", "K7o+", "Q8o+", "J8o+", "T8o+", "98o"],
      mixed: ["K6o", "Q7o", "J7o", "T7o", "87o", "64s"]
    }
  }
};
