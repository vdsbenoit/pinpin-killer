const poolMissions = [
  ["Fais une high-five à ta victime.", "Fais une fist bump à ta victime.", "Fais baise-main à ta victime."],
  ["Demande à ta victime de réciter l'alphabet à l'envers. Si elle commence à le faire, la mission est accomplie.", "Demande à ta victime de compter à partir de 20 l'envers. Si elle commence à le faire, la mission est accomplie."],
  ["Ta victime doit dessiner un coeur", "Ta victime doit dessiner smiley", "Ta victime doit dessiner un mouton", "Ta victime doit dessiner un arbre", "Ta victime doit dessiner une fleur"],
  ["Ta victime doit citer 3 noms de couleurs différents", "Ta victime doit citer 3 noms de fruits différents", "Ta victime doit citer 3 noms de légumes différents", "Ta victime doit citer 3 acteurs/actrices différent.e.s", "Ta victime doit citer 3 noms de films", "Ta victime doit citer 3 noms de séries", "Ta victime doit citer 3 pays"],
  ["Tu dois te faire complimenter par ta victime", "Tu dois te faire insulter par ta victime"],
  ["Ta victime doit fabriquer un avion en papier ou un origami"],
  ["Fais réciter une phrase complexe à prononcer (du type les chaussettes de l'archiduchesse) à ta victime"],
  ["Ta victime doit te servir un verre"],
  ["Ta victime doit t'expliquer ce qu'elle a mangé au petit déjeuné", "Ta victime doit t'expliquer ce qu'elle a mangé à midi", "Ta victime doit t'expliquer ce qu'elle a mangé hier soir"],
  ["Ta victime doit twerker", "Ta victime doit mimer du hula hoop", "Ta victime doit faire la danse du robot", "Ta victime doit faire la macarena"],
  ["Ta victime doit essayer de toucher son nez avec sa langue"],
  ["Ta victime doit faire une pyramide avec de gobelet (au moins 3)"],
  ["Ta victime doit jouer au beer pong avec ou contre toi", "Ta victime doit jouer aux dés avec toi", "Ta victime doit jouer aux molkky avec ou contre toi"],
  ["Ta victime doit prendre une photo au photomaton avec toi"],
  ["Ta victime doit rester en équilibre sur un pied pendant 10 secondes"],
  ["GAGNE à pierre papier ciseaux contre ta victime"]
]

const finalMissions: any[] = [
  ["Ta victime doit mimer un instrument de musique."],
  ["Ta victime doit raconter une blague"],
  ["Ta victime doit imiter un animal pendant plus de 5 secondes (avec le son)"],
  ["Mange dans le plat / le sandwich de ta victime"],
  ["Ta victime doit faire tenir quelque chose en équilibre"],
  ["Ta victime doit faire des pompes", "Ta victime doit faire des adbos", "Ta victime doit faire une roue ou un cumulet", "Ta victime doit tourner sur soi-même 3x", "Ta victime doit essayer de toucher ses orteils sans plier ses genoux"],
  ["Echange de déguisement avec ta victime (ou propose lui un déguisement si elle n'en porte pas encore)"],
  ["Chante une chanson avec ta victime pendant 10 secondes"],
  ["Tu dois passer en dessous de ta victime"],
  ["Ta victime doit imiter le bruit d'une sirène (police, ambulance, etc)"]
]

export const getRandomPoolMissions = () => {
  const missionsCopy = JSON.parse(JSON.stringify(poolMissions)); // Deep copy the array
  const selectedMissions = [];

  while (selectedMissions.length < 10 && missionsCopy.length > 0) {
    const randomIndex = Math.floor(Math.random() * missionsCopy.length);
    const mission = missionsCopy[randomIndex];

    if (Array.isArray(mission)) {
      const subMissionIndex = Math.floor(Math.random() * mission.length);
      selectedMissions.push(mission[subMissionIndex]);
    } else {
      selectedMissions.push(mission);
    }

    missionsCopy.splice(randomIndex, 1); // Remove selected mission
  }

  return selectedMissions;
};

export const getFinalMissions = () => {
  const selectedMissions = [];
  let index = 0;

  while (selectedMissions.length < 10) {
    const mission = finalMissions[index];

    if (Array.isArray(mission)) {
      const subMissionIndex = Math.floor(Math.random() * mission.length);
      selectedMissions.push(mission[subMissionIndex]);
    } else {
      selectedMissions.push(mission);
    }
    index++
  }

  return selectedMissions;
};
