const PERK_CATEGORIES = [
  { id: 'combat',   name: 'Combat',   color: '#d06050' },
  { id: 'survival', name: 'Survival', color: '#d4943c' },
  { id: 'utility',  name: 'Utility',  color: '#50a0d0' },
  { id: 'crafting', name: 'Crafting', color: '#50a080' },
  { id: 'social',   name: 'Social',   color: '#d0b040' },
  { id: 'stealth',  name: 'Stealth',  color: '#9070b0' },
];

const DUST_PERKS = [
  // === COMBAT ===
  {
    id: 'actionBoyGirl',
    name: 'Action Boy/Girl',
    category: 'combat',
    ranks: 2,
    levelReq: [0, 0],
    requirements: { special: { agility: 6 } },
    descriptions: [
      '+15 Action Points, AP regenerates 2% slower.',
      '+30 Action Points total, AP regenerates 4% slower.'
    ]
  },
  {
    id: 'adamantiumSkeleton',
    name: 'Adamantium Skeleton',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['Limbs receive 50% damage, lose 3 DT.']
  },
  {
    id: 'andStayBack',
    name: 'And Stay Back',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { guns: 70 } },
    descriptions: ['Shotguns have a 10% chance per pellet to knock enemies back.']
  },
  {
    id: 'atomic',
    name: 'Atomic!',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { endurance: 6 } },
    descriptions: ['Under radiation: +25% run/attack speed, +25% STR. AP regeneration decreases with radiation.']
  },
  {
    id: 'betterCriticals',
    name: 'Better Criticals',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { perception: 6, luck: 6 } },
    descriptions: ['+50% critical damage, -25% critical chance.']
  },
  {
    id: 'blackWidow',
    name: 'Black Widow / Confirmed Bachelor',
    category: 'social',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['+10% damage vs. opposite gender, -10% vs. same gender.']
  },
  {
    id: 'bloodyMess',
    name: 'Bloody Mess',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['+5% damage; inflict 200 Sanity damage to self.']
  },
  {
    id: 'burdenToBear',
    name: 'Burden to Bear',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { strength: 6, endurance: 6 } },
    descriptions: ['+10 lbs. carry weight.']
  },
  {
    id: 'centerOfMass',
    name: 'Center of Mass',
    category: 'combat',
    ranks: 1,
    levelReq: [14],
    requirements: { skills: { guns: 70 } },
    descriptions: ['+15% torso damage in V.A.T.S.']
  },
  {
    id: 'cherchezLaFemme',
    name: 'Cherchez la Femme / Lady Killer',
    category: 'social',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['+10% damage vs. females, -10% vs. males.']
  },
  {
    id: 'cloudKiller',
    name: 'Cloud Killer',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['+10% DR and damage vs. Marked Men.']
  },
  {
    id: 'commando',
    name: 'Commando',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['+25% V.A.T.S. accuracy with two-handed guns; -25% with one-handed.']
  },
  {
    id: 'concentratedFire',
    name: 'Concentrated Fire',
    category: 'combat',
    ranks: 1,
    levelReq: [18],
    requirements: { skills: { energyWeapons: 60, guns: 60 } },
    descriptions: ['+5% accuracy per subsequent attack on same body part in V.A.T.S.']
  },
  {
    id: 'cowboy',
    name: 'Cowboy',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { guns: 45, meleeWeapons: 45 } },
    descriptions: ['+25% damage with revolvers, lever-action guns, dynamite, knives, hatchets; -25% pistol/SMG damage.']
  },
  {
    id: 'eyeForEye',
    name: 'Eye for Eye',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['+10% damage per crippled limb you have.']
  },
  {
    id: 'fightThePower',
    name: 'Fight the Power!',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['+2 DT, +10% crit chance vs. NCR armor; -5% crit vs. others.']
  },
  {
    id: 'finesse',
    name: 'Finesse',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { agility: 7 } },
    descriptions: ['+5% crit chance, -5% crit damage.']
  },
  {
    id: 'grimReapersSpirit',
    name: "Grim Reaper's Spirit",
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['+20 AP on V.A.T.S. kill; AP regenerates 50% slower.']
  },
  {
    id: 'grunt',
    name: 'Grunt',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { guns: 45, explosives: 45 } },
    descriptions: ['+25% damage with 9mm/.45/5.56mm, service rifles, assault carbines, marksman carbines, frag grenades, grenade rifles; -25% revolver/lever-action.']
  },
  {
    id: 'gunslinger',
    name: 'Gunslinger',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['+25% V.A.T.S. accuracy with one-handed guns; -25% with two-handed.']
  },
  {
    id: 'hobbler',
    name: 'Hobbler',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { perception: 7 } },
    descriptions: ['+25% leg hit chance in V.A.T.S.; limbs 5% more vulnerable.']
  },
  {
    id: 'laserCommander',
    name: 'Laser Commander',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { energyWeapons: 50 } },
    descriptions: ['+15% laser damage, +10% laser crit chance; -15% non-laser weapon damage.']
  },
  {
    id: 'livingAnatomy',
    name: 'Living Anatomy',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { medicine: 70 } },
    descriptions: ['+5% damage vs. humans and non-feral ghouls; view health and DT.']
  },
  {
    id: 'meltdown',
    name: 'Meltdown',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { energyWeapons: 90 } },
    descriptions: ['Energy weapon kills cause a harmful corona; chain reaction possible.']
  },
  {
    id: 'mysteriousStranger',
    name: 'Mysterious Stranger',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { charisma: 7 } },
    descriptions: ['10% chance a stranger finishes your V.A.T.S. target.']
  },
  {
    id: 'nerdRage',
    name: 'Nerd Rage!',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { intelligence: 5 }, skills: { science: 50 } },
    descriptions: ['Below 20% health: +15 DT, STR becomes 10.']
  },
  {
    id: 'nervesOfSteel',
    name: 'Nerves of Steel',
    category: 'combat',
    ranks: 1,
    levelReq: [26],
    requirements: { special: { agility: 7 } },
    descriptions: ['+20% AP regeneration.']
  },
  {
    id: 'ninja',
    name: 'Ninja',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { meleeWeapons: 80, sneak: 80 } },
    descriptions: ['+15% melee/unarmed crit chance; +25% sneak attack crit damage.']
  },
  {
    id: 'paralyzingPalm',
    name: 'Paralyzing Palm',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { unarmed: 70 } },
    descriptions: ['Chance of a special V.A.T.S. strike that paralyzes for 30 seconds; unarmed only.']
  },
  {
    id: 'piercingStrike',
    name: 'Piercing Strike',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { unarmed: 70 } },
    descriptions: ['Melee/unarmed attacks ignore 15 DT on targets.']
  },
  {
    id: 'plasmaSpaz',
    name: 'Plasma Spaz',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { energyWeapons: 70 } },
    descriptions: ['-20% AP cost for plasma weapons.']
  },
  {
    id: 'precisionDetonation',
    name: 'Precision Detonation',
    category: 'combat',
    ranks: 3,
    levelReq: [0, 0, 0],
    requirements: { skills: { explosives: 50 } },
    descriptions: [
      '+20% explosive damage, -10% range.',
      '+40% explosive damage, -20% range.',
      '+60% explosive damage, -30% range.'
    ]
  },
  {
    id: 'purifier',
    name: 'Purifier',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { unarmed: 50, meleeWeapons: 50 }, rads: { max: 200 } },
    descriptions: ['+50% melee/unarmed damage vs. Centaurs, Nightstalkers, and mutated creatures.']
  },
  {
    id: 'pyromaniac',
    name: 'Pyromaniac',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { explosives: 60 } },
    descriptions: ['+50% fire-based weapon damage.']
  },
  {
    id: 'slayer',
    name: 'Slayer',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { agility: 7 }, skills: { meleeWeapons: 90, unarmed: 90 } },
    descriptions: ['+30% melee/unarmed attack speed; +100% gun spread.']
  },
  {
    id: 'sniper',
    name: 'Sniper',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { agility: 6, perception: 6 }, skills: { sneak: 50, guns: 70 } },
    descriptions: ['-15% rifle spread, +15% range; -15% attack speed.']
  },
  {
    id: 'splashDamage',
    name: 'Splash Damage',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { explosives: 70 } },
    descriptions: ['+25% explosive area of effect.']
  },
  {
    id: 'sprayAndPray',
    name: 'Spray and Pray',
    category: 'combat',
    ranks: 1,
    levelReq: [22],
    requirements: {},
    descriptions: ['-75% weapon damage to companions.']
  },
  {
    id: 'stonewall',
    name: 'Stonewall',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { endurance: 8, strength: 8 } },
    descriptions: ['+5 DT vs. melee/unarmed; cannot be knocked down.']
  },
  {
    id: 'superSlam',
    name: 'Super Slam',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { strength: 6 }, skills: { meleeWeapons: 45 } },
    descriptions: ['Melee/unarmed attacks have a chance to knock targets down.']
  },
  {
    id: 'theProfessional',
    name: 'The Professional',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { guns: 70, energyWeapons: 70, sneak: 70 } },
    descriptions: ['Sneak attack crits +20% with pistols/revolvers, SMGs, and one-handed energy weapons.']
  },
  {
    id: 'tribalHunter',
    name: 'Tribal Hunter',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['+15% damage vs. tribals; +25% V.A.T.S. accuracy vs. tribals.']
  },
  {
    id: 'unstoppableForce',
    name: 'Unstoppable Force',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { strength: 7 }, skills: { meleeWeapons: 90 } },
    descriptions: ['+300% damage through enemy blocks with melee/unarmed weapons.']
  },

  // === SURVIVAL ===
  {
    id: 'cannibal',
    name: 'Cannibal',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { sanity: { max: 250 } },
    descriptions: ['In sneak mode, eat human corpses to sate hunger; lose Sanity.']
  },
  {
    id: 'ghastlyScavenger',
    name: 'Ghastly Scavenger',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { perkReq: ['cannibal'] },
    descriptions: ['In sneak mode, eat Super Mutant and Ghoul corpses for HP; lose Sanity.']
  },
  {
    id: 'entomologist',
    name: 'Entomologist',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { intelligence: 4 }, skills: { survival: 45 } },
    descriptions: ['+50% damage vs. mutated insects.']
  },
  {
    id: 'fastMetabolism',
    name: 'Fast Metabolism',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { medicine: 65 } },
    descriptions: ['+20% health restored from Stimpaks.']
  },
  {
    id: 'homeOnTheRange',
    name: 'Home on the Range',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { survival: 70 } },
    descriptions: ['Sleep at campfires with full sleep benefits.']
  },
  {
    id: 'hunter',
    name: 'Hunter',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { survival: 30 } },
    descriptions: ['+75% crit damage vs. animals; -25% crit damage vs. others.']
  },
  {
    id: 'irradiatedBeauty',
    name: 'Irradiated Beauty',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { endurance: 6 }, rads: { min: 800 } },
    descriptions: ['Sleeping removes all rads (Hardcore: -100 rads).']
  },
  {
    id: 'leadBelly',
    name: 'Lead Belly',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { endurance: 5 }, skills: { survival: 40 } },
    descriptions: ['-50% radiation from food and water.']
  },
  {
    id: 'lifeGiver',
    name: 'Life Giver',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { endurance: 6 }, skills: { medicine: 50 } },
    descriptions: ['+30 HP.']
  },
  {
    id: 'mileInTheirShoes',
    name: 'Mile in Their Shoes',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { survival: 25 } },
    descriptions: ["Nightstalker Squeezin's grant +1 PER, +5 poison resistance, +5 sneak."]
  },
  {
    id: 'oldWorldGourmet',
    name: 'Old World Gourmet',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { endurance: 6 }, skills: { survival: 45 } },
    descriptions: ['+15% addiction resistance; +50% health from snack foods; alcohol gives health.']
  },
  {
    id: 'radAbsorption',
    name: 'Rad Absorption',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { endurance: 7 }, rads: { min: 900 } },
    descriptions: ['Radiation slowly decreases over time.']
  },
  {
    id: 'radChild',
    name: 'Rad Child',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { survival: 70 } },
    descriptions: ['Regenerate 2 HP/second per 200 rads; +25% radiation intake.']
  },
  {
    id: 'radFree',
    name: 'Rad Free',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { endurance: 5 }, skills: { survival: 40 } },
    descriptions: ['+25% radiation resistance; +100% radiation inflicted.']
  },
  {
    id: 'roughinIt',
    name: "Roughin' It",
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { survival: 100 } },
    descriptions: ['Sleeping outside grants Well Rested benefits.']
  },
  {
    id: 'solarPowered',
    name: 'Solar Powered',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { endurance: 7 }, rads: { min: 900 } },
    descriptions: ['Sunlight: +2 STR, slow health regeneration.']
  },
  {
    id: 'themsGoodEatin',
    name: "Them's Good Eatin'",
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { survival: 55 } },
    descriptions: ['Killed creatures have 50% chance to drop Thin Red Paste or Blood Sausage.']
  },
  {
    id: 'toughness',
    name: 'Toughness',
    category: 'combat',
    ranks: 2,
    levelReq: [0, 0],
    requirements: { special: { endurance: 7 } },
    descriptions: ['+3 DT, -5% run speed.', '+6 DT total, -10% run speed.']
  },
  {
    id: 'travelLight',
    name: 'Travel Light',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { survival: 45 } },
    descriptions: ['+10% run speed in light armor or no armor.']
  },
  {
    id: 'tribalWisdom',
    name: 'Tribal Wisdom',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { survival: 85 } },
    descriptions: ['Limbs take -50% animal damage; +25% poison resistance; eat insects while sneaking.']
  },

  // === UTILITY ===
  {
    id: 'alertness',
    name: 'Alertness',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { perception: 6 }, specialMax: { perception: 9 } },
    descriptions: ['When crouched: +2 PER, -2 Damage Resistance.']
  },
  {
    id: 'animalFriend',
    name: 'Animal Friend',
    category: 'utility',
    ranks: 2,
    levelReq: [0, 0],
    requirements: { special: { charisma: 6 }, skills: { survival: 45 } },
    descriptions: [
      "Animals don't attack; deal 5% less damage to animals.",
      'Animals aid in combat; deal 10% less damage to animals.'
    ]
  },
  {
    id: 'comprehension',
    name: 'Comprehension',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { intelligence: 4 } },
    descriptions: ['+1 permanent skill point from books; +20 temp skill points from magazines.']
  },
  {
    id: 'educated',
    name: 'Educated',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { intelligence: 6 }, skills: { science: 30 } },
    descriptions: ['+2 skill points per level up.']
  },
  {
    id: 'explorer',
    name: 'Explorer',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { survival: 65 } },
    descriptions: ['+10% walk speed.']
  },
  {
    id: 'falseAuthority',
    name: 'False Authority',
    category: 'social',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { charisma: 8 } },
    descriptions: ['Most NCR enemies ignore you.']
  },
  {
    id: 'fortuneFinder',
    name: 'Fortune Finder',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { luck: 7 } },
    descriptions: ['Find more bottle caps in containers.']
  },
  {
    id: 'heavyweight',
    name: 'Heavyweight',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { endurance: 7, strength: 7 } },
    descriptions: ['Weapons weighing more than 10 lbs. have their weight halved.']
  },
  {
    id: 'hereAndNow',
    name: 'Here and Now',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['Instantly level up again.']
  },
  {
    id: 'intenseTraining',
    name: 'Intense Training',
    category: 'utility',
    ranks: 10,
    levelReq: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    requirements: {},
    descriptions: [
      'Add 1 point to any SPECIAL attribute.',
      'Add 1 point to any SPECIAL attribute (2 total).',
      'Add 1 point to any SPECIAL attribute (3 total).',
      'Add 1 point to any SPECIAL attribute (4 total).',
      'Add 1 point to any SPECIAL attribute (5 total).',
      'Add 1 point to any SPECIAL attribute (6 total).',
      'Add 1 point to any SPECIAL attribute (7 total).',
      'Add 1 point to any SPECIAL attribute (8 total).',
      'Add 1 point to any SPECIAL attribute (9 total).',
      'Add 1 point to any SPECIAL attribute (10 total).'
    ]
  },
  {
    id: 'lessonsLearned',
    name: 'Lessons Learned',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { intelligence: 8 }, skills: { survival: 65 } },
    descriptions: ['+1% XP per player level.']
  },
  {
    id: 'mathWrath',
    name: 'Math Wrath',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { science: 70 } },
    descriptions: ['-10% AP cost for all V.A.T.S. attacks.']
  },
  {
    id: 'nightPerson',
    name: 'Night Person',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['At night: +2 INT and PER (max 10).']
  },
  {
    id: 'packrat',
    name: 'Packrat',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { intelligence: 5 }, skills: { barter: 70 } },
    descriptions: ['Items weighing 2 lbs. or less weigh half as much.']
  },
  {
    id: 'quickDraw',
    name: 'Quick Draw',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { agility: 5 } },
    descriptions: ['Draw/holster weapons 50% faster; +5% gun spread.']
  },
  {
    id: 'rapidReload',
    name: 'Rapid Reload',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { agility: 5 }, skills: { guns: 30 } },
    descriptions: ['+25% reload speed for all guns.']
  },
  {
    id: 'retention',
    name: 'Retention',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { intelligence: 5 } },
    descriptions: ['Skill magazine bonuses last 3x longer.']
  },
  {
    id: 'scrounger',
    name: 'Scrounger',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { luck: 10 } },
    descriptions: ['Find considerably more ammunition in containers.']
  },
  {
    id: 'strongBack',
    name: 'Strong Back',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { strength: 7, endurance: 7 } },
    descriptions: ['+15 lbs. carry weight.']
  },
  {
    id: 'swiftLearner',
    name: 'Swift Learner',
    category: 'utility',
    ranks: 3,
    levelReq: [0, 0, 0],
    requirements: { special: { intelligence: 4 } },
    descriptions: ['+10% total XP.', '+20% total XP.', '+30% total XP.']
  },
  {
    id: 'tag',
    name: 'Tag!',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['Select a fourth tag skill and instantly gain +15 points in it.']
  },
  {
    id: 'voraciousReader',
    name: 'Voracious Reader',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { intelligence: 7 } },
    descriptions: ['Damaged books become blank magazines that you can copy.']
  },
  {
    id: 'walkerInstinct',
    name: 'Walker Instinct',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { perception: 7 }, skills: { survival: 60 } },
    descriptions: ['Outdoors: +1 PER and +1 AGL.']
  },
  {
    id: 'weaponHandling',
    name: 'Weapon Handling',
    category: 'utility',
    ranks: 1,
    levelReq: [0],
    requirements: { specialMax: { strength: 9 } },
    descriptions: ['Weapon STR requirements reduced by 2; draw speed -10%.']
  },

  // === CRAFTING ===
  {
    id: 'certifiedTech',
    name: 'Certified Tech',
    category: 'crafting',
    ranks: 1,
    levelReq: [0],
    requirements: { skillsExact: { science: 50 } },
    descriptions: ['+25% crit chance vs. robots; find more components.']
  },
  {
    id: 'chemResistant',
    name: 'Chem Resistant',
    category: 'crafting',
    ranks: 1,
    levelReq: [16],
    requirements: { skills: { medicine: 60 } },
    descriptions: ['50% less likely to get addicted to chems.']
  },
  {
    id: 'chemist',
    name: 'Chemist',
    category: 'crafting',
    ranks: 1,
    levelReq: [14],
    requirements: { skills: { medicine: 60 } },
    descriptions: ['Chems and Stimpaks last twice as long.']
  },
  {
    id: 'computerWhiz',
    name: 'Computer Whiz',
    category: 'crafting',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { intelligence: 7 }, skills: { science: 70 } },
    descriptions: ['One extra terminal hacking attempt before lockout.']
  },
  {
    id: 'handLoader',
    name: 'Hand Loader',
    category: 'crafting',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { repair: 70 } },
    descriptions: ['2x case/hull recovery; all hand load ammo recipes unlocked.']
  },
  {
    id: 'inShiningArmor',
    name: 'In Shining Armor',
    category: 'crafting',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { repair: 20, science: 70 } },
    descriptions: ['+5 DT vs. energy weapons in metal armor; +2 DT with reflective eyewear.']
  },
  {
    id: 'juryRigging',
    name: 'Jury Rigging',
    category: 'crafting',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { intelligence: 6 }, skills: { repair: 100 } },
    descriptions: ['Repair items using similar items from the same category.']
  },
  {
    id: 'junkRounds',
    name: 'Junk Rounds',
    category: 'crafting',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { luck: 6 }, skills: { repair: 65 } },
    descriptions: ['Craft ammunition from scrap metal and tin cans.']
  },
  {
    id: 'madBomber',
    name: 'Mad Bomber',
    category: 'crafting',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { repair: 45, explosives: 45 } },
    descriptions: ['Access to special explosives recipes at workbenches.']
  },
  {
    id: 'nukaChemist',
    name: 'Nuka Chemist',
    category: 'crafting',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { science: 90 } },
    descriptions: ['Special Nuka-Cola recipes at workbenches.']
  },
  {
    id: 'roboticsExpert',
    name: 'Robotics Expert',
    category: 'crafting',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { science: 70 } },
    descriptions: ['+25% damage vs. robots; shut them down by sneaking up.']
  },
  {
    id: 'sierraMadreMartini',
    name: 'Sierra Madre Martini',
    category: 'crafting',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { survival: 35 } },
    descriptions: ['Campfire recipe: +75 HP, +4 END, +2 STR; 15% addiction chance.']
  },
  {
    id: 'vigilantRecycler',
    name: 'Vigilant Recycler',
    category: 'crafting',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { science: 70 } },
    descriptions: ['100% recovery of energy weapon ammo; efficient recycling recipes.']
  },

  // === STEALTH ===
  {
    id: 'broadDaylight',
    name: 'Broad Daylight',
    category: 'stealth',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { sneak: 80 } },
    descriptions: ['No sneak penalty for using Pip-Boy light.']
  },
  {
    id: 'friendOfTheNight',
    name: 'Friend of the Night',
    category: 'stealth',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { perception: 6 }, skills: { sneak: 30 } },
    descriptions: ['Eyes adapt to low-light conditions.']
  },
  {
    id: 'infiltrator',
    name: 'Infiltrator',
    category: 'stealth',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { perception: 7 }, skills: { lockpick: 70 } },
    descriptions: ['One extra lock-picking attempt before breaking.']
  },
  {
    id: 'lightStep',
    name: 'Light Step',
    category: 'stealth',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { perception: 6, agility: 6 }, skills: { sneak: 75 } },
    descriptions: ['Floor traps and mines will not trigger when you walk over them.']
  },
  {
    id: 'misterSandman',
    name: 'Mister Sandman',
    category: 'stealth',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { sneak: 60 } },
    descriptions: ['In sneak mode, silently kill sleeping humans and ghouls.']
  },
  {
    id: 'runNGun',
    name: "Run 'n Gun",
    category: 'stealth',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { guns: 45, energyWeapons: 45 } },
    descriptions: ['-50% spread with one-handed ranged while walking; -5% movement speed.']
  },
  {
    id: 'silentRunning',
    name: 'Silent Running',
    category: 'stealth',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { agility: 6 }, skills: { sneak: 60 } },
    descriptions: ['Running no longer breaks sneak.']
  },
  {
    id: 'tunnelRunner',
    name: 'Tunnel Runner',
    category: 'stealth',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { agility: 8 }, skills: { sneak: 75 } },
    descriptions: ['+25% sneak movement speed in light armor.']
  },

  // === SOCIAL / SANITY / SPECIAL ===
  {
    id: 'communisticWisdom',
    name: 'Communistic Wisdom',
    category: 'social',
    ranks: 1,
    levelReq: [0],
    requirements: { insanity: true },
    descriptions: ['+10% XP; items cost 1,000x more.']
  },
  {
    id: 'coward',
    name: 'Coward',
    category: 'social',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { agility: 6 }, sanity: { min: 250 } },
    descriptions: ['Light armor: +10% run speed, -25% enemy crit chance; -25% damage always.']
  },
  {
    id: 'ferocousLoyalty',
    name: 'Ferocious Loyalty',
    category: 'social',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { charisma: 6 } },
    descriptions: ['Below 50% HP, companions gain +50 DR.']
  },
  {
    id: 'friendlyTribal',
    name: 'Friendly Tribal',
    category: 'social',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { charisma: 6, luck: 6 } },
    descriptions: ['10% chance a tribal companion incapacitates your V.A.T.S. target.']
  },
  {
    id: 'ghostHunter',
    name: 'Ghost Hunter',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['Permanently kill Ghost People (required to kill them).']
  },
  {
    id: 'heaveHo',
    name: 'Heave, Ho!',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { strength: 7 }, skills: { explosives: 30 } },
    descriptions: ['+50% thrown weapon velocity and range.']
  },
  {
    id: 'hitTheDeck',
    name: 'Hit the Deck',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { explosives: 70 } },
    descriptions: ['+25 DT vs. explosives.']
  },
  {
    id: 'justLuckyImAlive',
    name: "Just Lucky I'm Alive",
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { special: { luck: 6 }, sanity: { min: -249, max: 249 } },
    descriptions: ['+4 Luck for 3 minutes after combat when below 25% health.']
  },
  {
    id: 'kingArthur',
    name: 'King Arthur',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { insanity: true },
    descriptions: ['+25% melee damage.']
  },
  {
    id: 'revolverTraining',
    name: 'Revolver Training',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['Revolvers: less spread, 2x crit chance.']
  },
  {
    id: 'semiAutoTraining',
    name: 'Semi-Auto Training',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: {},
    descriptions: ['Non-revolver pistols: less spread, 2x crit chance.']
  },
  {
    id: 'shotgunTraining',
    name: 'Shotgun Training',
    category: 'combat',
    ranks: 1,
    levelReq: [0],
    requirements: { skills: { guns: 45 } },
    descriptions: ['Shotguns ignore +10 enemy DT; -5% other weapon damage.']
  },
  {
    id: 'soundOfMind',
    name: 'Sound of Mind',
    category: 'social',
    ranks: 1,
    levelReq: [0],
    requirements: { sanity: { min: 250 } },
    descriptions: ['Reset karma, +10% damage; +10 HP per 100 sanity; immune to crits.']
  },
  {
    id: 'theScurrier',
    name: 'The Scurrier',
    category: 'survival',
    ranks: 1,
    levelReq: [0],
    requirements: { insanity: true },
    descriptions: ['+50% run speed; +50% limb damage taken.']
  },
];
