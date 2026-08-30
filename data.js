
const RANGE_DATA = {
  meta: {
    version: "2.0",
    note: "Prototype. Les données exactes doivent être validées avant usage stratégique."
  },

  "15|BTN|firstin": {
    label: "BTN • 15 BB • First in",
    status: "Partiellement validé",
    playedPct: "32,1 %",
    source: "Résumé public de range 15 BB BTN utilisé comme base de prototype.",
    warning: "Les fréquences exactes par combo ne sont pas toutes publiées. Les mains ci-dessous servent d’interface de travail et doivent être validées avant usage réel.",
    breakdown: { fold: 67.9, limp: 0, raise: 24.4, shove: 7.7 },
    hands: {
      "AA":{"action":"raise","freq":100},"KK":{"action":"raise","freq":100},"QQ":{"action":"raise","freq":100},
      "JJ":{"action":"raise","freq":100},"TT":{"action":"raise","freq":100},"99":{"action":"raise","freq":100},
      "88":{"action":"raise","freq":100},"77":{"action":"raise","freq":100},"66":{"action":"raise","freq":100},
      "55":{"action":"raise","freq":100},"44":{"action":"raise","freq":100},"33":{"action":"raise","freq":100},"22":{"action":"shove","freq":100},
      "AKs":{"action":"raise","freq":100},"AQs":{"action":"raise","freq":100},"AJs":{"action":"raise","freq":100},"ATs":{"action":"raise","freq":100},
      "A9s":{"action":"raise","freq":100},"A8s":{"action":"raise","freq":100},"A7s":{"action":"raise","freq":100},"A6s":{"action":"raise","freq":100},
      "A5s":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},"A4s":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},"A3s":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},
      "KQs":{"action":"raise","freq":100},"KJs":{"action":"raise","freq":100},"KTs":{"action":"raise","freq":100},"K9s":{"action":"raise","freq":100},
      "K8s":{"action":"raise","freq":100},"K7s":{"action":"raise","freq":100},"K6s":{"action":"raise","freq":100},"K5s":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},
      "QJs":{"action":"raise","freq":100},"QTs":{"action":"raise","freq":100},"Q9s":{"action":"raise","freq":100},"Q8s":{"action":"raise","freq":100},"Q7s":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},
      "JTs":{"action":"raise","freq":100},"J9s":{"action":"raise","freq":100},"J8s":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},
      "T9s":{"action":"raise","freq":100},"T8s":{"action":"raise","freq":100},"T7s":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},
      "98s":{"action":"raise","freq":100},"97s":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},
      "87s":{"action":"raise","freq":100},
      "AKo":{"action":"raise","freq":100},"AQo":{"action":"raise","freq":100},"AJo":{"action":"raise","freq":100},"ATo":{"action":"raise","freq":100},
      "A9o":{"action":"raise","freq":100},"A8o":{"action":"raise","freq":100},"A7o":{"action":"raise","freq":100},"A6o":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},
      "KQo":{"action":"raise","freq":100},"KJo":{"action":"raise","freq":100},"KTo":{"action":"raise","freq":100},"K9o":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},
      "QJo":{"action":"raise","freq":100},"QTo":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},
      "JTo":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"}
    }
  },

  "15|SB|firstin": {
    label: "SB • 15 BB • First in",
    status: "Partiellement validé",
    playedPct: "62,0 %",
    source: "Résumé public de range 15 BB SB utilisé comme base de prototype.",
    warning: "La répartition globale limp / raise / shove est connue, mais le détail exact par main reste à valider.",
    breakdown: { fold: 38.0, limp: 16.0, raise: 26.5, shove: 19.5 },
    hands: {
      "AA":{"action":"raise","freq":100},"KK":{"action":"raise","freq":100},"QQ":{"action":"raise","freq":100},"JJ":{"action":"raise","freq":100},"TT":{"action":"raise","freq":100},
      "99":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},"88":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},
      "77":{"action":"shove","freq":100},"66":{"action":"shove","freq":100},"55":{"action":"shove","freq":100},"44":{"action":"shove","freq":100},"33":{"action":"shove","freq":100},"22":{"action":"shove","freq":100},
      "AKs":{"action":"raise","freq":100},"AQs":{"action":"raise","freq":100},"AJs":{"action":"mixed","freq":100,"mix":"Raise / limp à valider"},"ATs":{"action":"mixed","freq":100,"mix":"Raise / limp à valider"},
      "A9s":{"action":"limp","freq":100},"A8s":{"action":"limp","freq":100},"A7s":{"action":"limp","freq":100},"A6s":{"action":"limp","freq":100},
      "KQs":{"action":"raise","freq":100},"KJs":{"action":"raise","freq":100},"KTs":{"action":"raise","freq":100},"K9s":{"action":"raise","freq":100},
      "QJs":{"action":"raise","freq":100},"QTs":{"action":"raise","freq":100},"JTs":{"action":"raise","freq":100},"T9s":{"action":"raise","freq":100},
      "98s":{"action":"limp","freq":100},"87s":{"action":"limp","freq":100},"76s":{"action":"limp","freq":100},
      "AKo":{"action":"raise","freq":100},"AQo":{"action":"raise","freq":100},"AJo":{"action":"raise","freq":100},"ATo":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},
      "A9o":{"action":"shove","freq":100},"A8o":{"action":"shove","freq":100},"A7o":{"action":"shove","freq":100},"A6o":{"action":"shove","freq":100},"A5o":{"action":"shove","freq":100},"A4o":{"action":"shove","freq":100},"A3o":{"action":"shove","freq":100},"A2o":{"action":"shove","freq":100},
      "KQo":{"action":"raise","freq":100},"KJo":{"action":"raise","freq":100},"KTo":{"action":"mixed","freq":100,"mix":"Raise / shove à valider"},"K9o":{"action":"shove","freq":100},"K8o":{"action":"shove","freq":100},"K7o":{"action":"shove","freq":100}
    }
  }
};
