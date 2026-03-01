const SKILLS = [
  { id: 'barter',        name: 'Barter',          abbr: 'BAR', gov: 'charisma' },
  { id: 'energyWeapons', name: 'Energy Weapons',   abbr: 'EW',  gov: 'perception' },
  { id: 'explosives',    name: 'Explosives',       abbr: 'EXP', gov: 'perception' },
  { id: 'guns',          name: 'Guns',             abbr: 'GUN', gov: 'agility' },
  { id: 'lockpick',      name: 'Lockpick',         abbr: 'LCK', gov: 'perception' },
  { id: 'medicine',      name: 'Medicine',          abbr: 'MED', gov: 'intelligence' },
  { id: 'meleeWeapons',  name: 'Melee Weapons',    abbr: 'MEL', gov: 'strength' },
  { id: 'repair',        name: 'Repair',            abbr: 'REP', gov: 'intelligence' },
  { id: 'science',       name: 'Science',           abbr: 'SCI', gov: 'intelligence' },
  { id: 'sneak',         name: 'Sneak',             abbr: 'SNK', gov: 'agility' },
  { id: 'speech',        name: 'Speech',            abbr: 'SPH', gov: 'charisma' },
  { id: 'survival',      name: 'Survival',          abbr: 'SUR', gov: 'endurance' },
  { id: 'unarmed',       name: 'Unarmed',           abbr: 'UNA', gov: 'endurance' },
];

// Base skill = 2 + (2 * governing_stat) + ceil(luck / 2)
// Tag bonus: +15
// Skill points per level: 10 + floor(INT / 2)
