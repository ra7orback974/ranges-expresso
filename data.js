
const RANGE_DATA = {
  meta: {
    version: "2.1",
    methodology: "La matrice n'invente aucune répartition raise/shove/limp par main lorsque la source publique ne l'expose pas."
  },

  "15|BTN|firstin": {
    label: "BTN • 15 BB • First in",
    status: "Public vérifié",
    playedPct: "32,1 %",
    source: "preflopranges.app — BTN Open 15bb, Spin & Go 3-max.",
    warning: "Répartition globale exacte : shove 7,7 %, minraise 2 BB 24,4 %, fold 67,9 %. La source publique donne les mains jouées à 100 % et ≥50 %, mais pas le split exact raise/shove de chaque main.",
    breakdown: { fold: 67.9, limp: 0, raise: 24.4, shove: 7.7 },
    pure: "22+, A3s+, K5s+, Q7s+, J8s+, T7s+, 97s+, 87s+, A6o+, K9o+, QTo+, JTo+",
    fifty: "22+, A2s+, K5s+, Q7s+, J8s+, T7s+, 97s+, 86s+, 76s+, A5o+, K9o+, QTo+, JTo+, T9o+"
  },

  "15|SB|firstin": {
    label: "SB • 15 BB • First in",
    status: "Public vérifié",
    playedPct: "62,0 %",
    source: "preflopranges.app — SB Open 15bb, Spin & Go 3-max.",
    warning: "Répartition globale exacte : shove 19,5 %, raise 2,2 BB 26,5 %, limp 16 %, fold 38 %. Le résumé public ne révèle pas l'action exacte de chaque main.",
    breakdown: { fold: 38.0, limp: 16.0, raise: 26.5, shove: 19.5 },
    pure: "44-22, TT+, AQs+, K9s+, QTs, JTs+, T9s+, T7s, T4s, 97s+, 86s+, 76s+, AJo-A2o, KJo, K7o",
    fifty: "55-22, 77+, AQs+, A8s-A4s, A2s, K8s+, K6s-K3s, QTs+, Q7s-Q3s, J3s+, T6s+, T4s, 95s+, 85s+, 74s+, 63s+, 53s+, 43s+, A2o+, K5o+, Q8o+, J8o+, T8o+, 97o+, 87o+"
  }
};
