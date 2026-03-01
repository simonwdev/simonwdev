const SPECIAL_NAMES = ['Strength', 'Perception', 'Endurance', 'Charisma', 'Intelligence', 'Agility', 'Luck'];
const SPECIAL_ABBR = ['STR', 'PER', 'END', 'CHR', 'INT', 'AGI', 'LCK'];

const PERKS = {
  strength: [
    {
      name: "Warrior Monk", req: 1, ranks: [
        { level: 0, desc: "Punching attacks do 20% more damage to your opponent." },
        { level: 9, desc: "Punching attacks now do 40% more damage and can disarm your opponent." },
        { level: 18, desc: "Punching attacks now do 60% more damage. Unarmed Power Attacks have a chance to cripple limbs. Thorazine grants +50% sanity." },
        { level: 31, desc: "Punching attacks now do 80% more damage with increased crippling chance. Chems grant +50% sanity." },
        { level: 46, desc: "Punching attacks now do double damage. Criticals in V.A.T.S. will paralyze opponent." }
      ]
    },
    {
      name: "Big Leagues", req: 2, ranks: [
        { level: 1, desc: "Do 20% more melee weapon damage." },
        { level: 7, desc: "30% more melee damage and chance to disarm opponent." },
        { level: 15, desc: "40% more melee damage with increased disarm chance." },
        { level: 27, desc: "60% more melee weapon damage." },
        { level: 42, desc: "70% more damage with crippling chance." }
      ]
    },
    {
      name: "Armorer", req: 3, ranks: [
        { level: 0, desc: "Access to base level and Rank 1 armor mods; repair Raider Power Armor." },
        { level: 13, desc: "Access to Rank 2 armor mods; repair T45 Power Armor." },
        { level: 25, desc: "Access to Rank 3 armor mods; repair T51 Power Armor." },
        { level: 39, desc: "Access to Rank 4 armor mods; repair T60 Power Armor." }
      ]
    },
    {
      name: "Blacksmith", req: 4, ranks: [
        { level: 0, desc: "Access to base level and Rank 1 melee weapon mods." },
        { level: 16, desc: "Access to Rank 2 melee weapon mods." },
        { level: 29, desc: "Access to Rank 3 melee weapon mods." }
      ]
    },
    {
      name: "Heavy Gunner", req: 5, ranks: [
        { level: 0, desc: "Heavy guns are now 25% more accurate." },
        { level: 11, desc: "Heavy guns now have 50% better accuracy." },
        { level: 21, desc: "Heavy guns now have 75% better accuracy." },
        { level: 35, desc: "Heavy guns have a chance to stagger opponent." },
        { level: 47, desc: "Additional +20 to carry weight." }
      ]
    },
    {
      name: "Basher", req: 6, ranks: [
        { level: 0, desc: "Gun bashing does 25% more damage." },
        { level: 5, desc: "Gun bashing does 50% more damage and possibly cripples opponent." },
        { level: 14, desc: "Gun bashing does 75% more damage with increased crippling chance." },
        { level: 26, desc: "Gun bashing does double damage with increased crippling chance and may inflict Critical Hit." }
      ]
    },
    {
      name: "Steady Aim", req: 7, ranks: [
        { level: 0, desc: "Hip-fire accuracy is improved when firing any gun." },
        { level: 13, desc: "Hip-fire accuracy is improved even more when firing any gun." },
        { level: 24, desc: "Hip-fire damage is improved when firing any gun." }
      ]
    },
    {
      name: "Strong Back", req: 8, ranks: [
        { level: 0, desc: "Gain +10 to carry weight." },
        { level: 10, desc: "You now have +15 to carry weight." },
        { level: 20, desc: "When overencumbered, you can use Action Points to run." },
        { level: 30, desc: "Additional +20 carry weight; no damage from being overencumbered." },
        { level: 40, desc: "When overencumbered, running costs 50% less action points." }
      ]
    },
    {
      name: "Rooted", req: 9, ranks: [
        { level: 0, desc: "While standing still, gain +25 Damage Resistance and 25% more melee/unarmed damage." },
        { level: 22, desc: "While standing still, gain +50 Damage Resistance and 50% more melee/unarmed damage." },
        { level: 43, desc: "While standing still, may automatically disarm melee-wielding enemies." }
      ]
    },
    {
      name: "Pain Train", req: 10, ranks: [
        { level: 0, desc: "While wearing Power Armor, sprinting into enemies hurts and staggers them." },
        { level: 24, desc: "Sprinting into enemies in Power Armor causes severe damage and stronger stagger." },
        { level: 50, desc: "Sprinting causes massive damage and knockdown; impact landing inflicts more damage." }
      ]
    }
  ],
  perception: [
    {
      name: "Refractor", req: 1, ranks: [
        { level: 0, desc: "Instantly gain +10 Energy Resistance." },
        { level: 11, desc: "You now have +20 Energy Resistance." },
        { level: 21, desc: "You now have +30 Energy Resistance." },
        { level: 35, desc: "You now have +40 Energy Resistance." },
        { level: 42, desc: "You now have +50 Energy Resistance." }
      ]
    },
    {
      name: "Rifleman", req: 2, ranks: [
        { level: 0, desc: "Non-automatic rifles have 20% greater accuracy." },
        { level: 9, desc: "Non-automatic rifles have 40% better accuracy." },
        { level: 18, desc: "Non-automatic rifles are 60% more accurate with 20% greater range." },
        { level: 31, desc: "Non-automatic rifles are 80% more accurate; slight chance to cripple limb." },
        { level: 46, desc: "Non-automatic rifles have 50% greater range with higher crippling chance." }
      ]
    },
    {
      name: "Awareness", req: 3, ranks: [
        { level: 0, desc: "You can view target's specific damage resistances in V.A.T.S." },
        { level: 14, desc: "5% increase to hit chance and damage dealt to V.A.T.S. targets." }
      ]
    },
    {
      name: "Locksmith", req: 4, ranks: [
        { level: 0, desc: "Pick Advanced locks; all lock sweetspots are now larger." },
        { level: 7, desc: "Pick Expert locks; lock sweet spots are now even larger." },
        { level: 18, desc: "Pick Master locks; lock sweet spots are now much larger." },
        { level: 41, desc: "Lock sweet spots are twice as large; chance to find Bobby Pin on killed Feral Ghouls." }
      ]
    },
    {
      name: "Duck 'n Cover", req: 5, ranks: [
        { level: 0, desc: "Incoming explosive damage reduced by 25% while sneaking; craft explosives at Chemistry Station." },
        { level: 10, desc: "Incoming explosives do 50% less damage while sneaking; grenades gain throwing arc." },
        { level: 22, desc: "20% chance getting no damage from explosions; no longer trigger enemy mines." },
        { level: 34, desc: "40% chance getting no damage from explosions if sneaking and in Power Armor." }
      ]
    },
    {
      name: "Night Person", req: 6, ranks: [
        { level: 0, desc: "+2 to Intelligence and Perception between 6:00 PM and 6:00 AM." },
        { level: 25, desc: "+3 to Intelligence and Perception during night hours with night vision when sneaking." },
        { level: 37, desc: "30 extra health between 6:00 PM and 6:00 AM." }
      ]
    },
    {
      name: "Scoundrel", req: 7, ranks: [
        { level: 0, desc: "Picking pockets 30% easier; +5 carry weight." },
        { level: 6, desc: "Picking pockets 60% easier; can place live grenade in inventory; recruit special settlers." },
        { level: 17, desc: "Picking pockets 85% easier; can steal equipped weapons." },
        { level: 30, desc: "Picking pockets twice as easy; can steal equipped items." }
      ]
    },
    {
      name: "Sniper", req: 8, ranks: [
        { level: 0, desc: "Improved control and hold breath longer when aiming with scopes." },
        { level: 13, desc: "Non-automatic scoped rifles have chance of knocking down target." },
        { level: 26, desc: "Non-automatic scoped rifles gain +25% accuracy to head shots in V.A.T.S." }
      ]
    },
    {
      name: "Penetrator", req: 9, ranks: [
        { level: 0, desc: "In V.A.T.S. target enemy body parts blocked by cover with decreased accuracy." },
        { level: 28, desc: "In V.A.T.S. target blocked body parts with no accuracy decrease." }
      ]
    },
    {
      name: "Concentrated Fire", req: 10, ranks: [
        { level: 0, desc: "In V.A.T.S. every attack on same body part gains +10% accuracy." },
        { level: 26, desc: "In V.A.T.S. every attack on same body part gains +15% accuracy." },
        { level: 50, desc: "In V.A.T.S. every attack on same body part gains +20% accuracy and 20% more damage." }
      ]
    }
  ],
  endurance: [
    {
      name: "Toughness", req: 1, ranks: [
        { level: 0, desc: "Instantly gain +10 Damage Resistance." },
        { level: 9, desc: "You now have +20 Damage Resistance." },
        { level: 18, desc: "You now have +30 Damage Resistance." },
        { level: 31, desc: "You now have +40 Damage Resistance." },
        { level: 46, desc: "You now have +50 Damage Resistance." }
      ]
    },
    {
      name: "Hunter", req: 2, ranks: [
        { level: 0, desc: "You can now harvest meat from animals." },
        { level: 11, desc: "Harvest hides from animals; craft new items at Chemistry Station; cooked/grilled meats restore sanity." }
      ]
    },
    {
      name: "Life Giver", req: 3, ranks: [
        { level: 0, desc: "Instantly gain +20 maximum Health." },
        { level: 8, desc: "Instantly gain another +20 maximum Health." },
        { level: 20, desc: "Instantly gain another +20 maximum Health." }
      ]
    },
    {
      name: "Chem Resistant", req: 4, ranks: [
        { level: 0, desc: "You're 50% less likely to get addicted when consuming chems." },
        { level: 22, desc: "You gain complete immunity to chem addiction." }
      ]
    },
    {
      name: "Cannibal", req: 5, ranks: [
        { level: 0, desc: "Feast on mortal flesh to still your hunger!" },
        { level: 19, desc: "Eating Human, Ghoul or Super Mutant corpses restores Health." },
        { level: 38, desc: "Eating Human, Ghoul or Super Mutant corpses now restores more Health." }
      ]
    },
    {
      name: "Rad Resistant", req: 6, ranks: [
        { level: 0, desc: "Instantly grant +10 Radiation Resistance." },
        { level: 13, desc: "You now have +20 Radiation Resistance." },
        { level: 26, desc: "You now have +30 Radiation Resistance." },
        { level: 35, desc: "You now have +40 Radiation Resistance." }
      ]
    },
    {
      name: "Adamantium Skeleton", req: 7, ranks: [
        { level: 0, desc: "Your skeleton infused with indestructible metal, reducing limb damage by 30%." },
        { level: 13, desc: "Your limb damage is now reduced by 60%." },
        { level: 26, desc: "Your limb damage is now reduced by 90%." }
      ]
    },
    {
      name: "Lead Belly", req: 8, ranks: [
        { level: 0, desc: "Your digestive tract adjusted to Wasteland weirdness; take less radiation from eating/drinking." },
        { level: 6, desc: "You take even less radiation from eating or drinking." },
        { level: 17, desc: "You take no radiation from eating or drinking." }
      ]
    },
    {
      name: "Day Walker", req: 9, ranks: [
        { level: 0, desc: "Catch some rays! Gain +2 to Strength between 6:00 AM and 6:00 PM." },
        { level: 27, desc: "Sunlight regenerates your lost Health." },
        { level: 50, desc: "Gain +2 to Endurance between 6:00 AM and 6:00 PM." }
      ]
    },
    {
      name: "Ghoulish", req: 10, ranks: [
        { level: 0, desc: "Sure, you're still human \u2014 on the outside! Radiation now regenerates your lost Health." },
        { level: 24, desc: "Radiation now regenerates even more of your lost Health." },
        { level: 48, desc: "Radiation now regenerates even more of your lost Health." },
        { level: 50, desc: "Rad damage will now begin to slowly heal, restoring health in the process." }
      ]
    }
  ],
  charisma: [
    {
      name: "Wanderer", req: 1, ranks: [
        { level: 0, desc: "Take 5% less damage and +15 carry weight; can't use Settlement Menu. Craft portable Chemistry Station." },
        { level: 17, desc: "If you control no settlements, take 10% less damage and +20 carry weight. Craft portable Armor and Weapon Workbenches." },
        { level: 35, desc: "Earn 20% more XP from kills; +25 carry weight." },
        { level: 50, desc: "+25 action points, 20% greater range and accuracy for all weapons, +40% XP from kills." }
      ]
    },
    {
      name: "Lady Killer / Black Widow", req: 2, ranks: [
        { level: 0, desc: "Women/Men deal 25% less damage to you; easier to persuade in dialogue." },
        { level: 10, desc: "Women/Men now suffer +10% damage; easier to pacify with Intimidation perk." },
        { level: 20, desc: "Women/Men suffer +15% damage and much easier to persuade; even easier to pacify." }
      ]
    },
    {
      name: "Trader", req: 3, ranks: [
        { level: 0, desc: "You've mastered the art of the deal! Buying and selling prices at vendors are better." },
        { level: 20, desc: "Buying and selling prices at vendors are now much better." },
        { level: 41, desc: "You can now invest 500 caps total to raise store's buying capacity." }
      ]
    },
    {
      name: "K9 Trainer", req: 4, ranks: [
        { level: 0, desc: "Keep the dogs at bay! Dogs and wolves are less likely to cripple you." },
        { level: 9, desc: "Dogs and Wolves are much less likely to cripple your limbs." },
        { level: 20, desc: "When your dog holds an enemy there's a chance he'll cause them to bleed." },
        { level: 31, desc: "Run and dodge like an attack dog! Take 10% less damage from all animals and turrets." }
      ]
    },
    {
      name: "Animal Friend", req: 5, ranks: [
        { level: 0, desc: "Commune with beasts! With your gun, aim at any animal below your level and gain chance to pacify it." },
        { level: 12, desc: "When you successfully pacify an animal, you can incite it to attack." },
        { level: 28, desc: "When you successfully pacify an animal, you can give it specific commands." }
      ]
    },
    {
      name: "Intimidation", req: 6, ranks: [
        { level: 0, desc: "Time to show everyone who's boss! Aim at any human or ghoul opponent to pacify them and make them flee." },
        { level: 9, desc: "When pacified, you can incite them to attack using watered down Psycho or interrogate for information." },
        { level: 15, desc: "When pacified, you can equip them with detonatable collar and make them do your bidding; double XP from intimidations!" }
      ]
    },
    {
      name: "Party Boy / Girl", req: 7, ranks: [
        { level: 0, desc: "Nobody has a good time like you! Between 21:00 and 6:00 you can't get addicted to alcohol." },
        { level: 15, desc: "Most effects of alcohol are doubled." },
        { level: 37, desc: "Your Luck is increased by 3 while you're under the influence of alcohol." }
      ]
    },
    {
      name: "Inspirational", req: 8, ranks: [
        { level: 0, desc: "Because you lead by example, your companion does more damage in combat and hurt you for half damage." },
        { level: 19, desc: "Your companion resists more damage in combat; harmed by your attacks for half damage." },
        { level: 43, desc: "Your companion can carry more items." }
      ]
    },
    {
      name: "Wasteland Whisperer", req: 9, ranks: [
        { level: 0, desc: "Master the post-apocalypse! Aim at any Wasteland creature below your level to pacify it." },
        { level: 21, desc: "When you successfully pacify a Wasteland creature, you can incite it to attack." },
        { level: 49, desc: "When you successfully pacify a Wasteland creature, you can give it specific commands." }
      ]
    },
    {
      name: "Local Leader", req: 10, ranks: [
        { level: 0, desc: "As the ruler everyone turns to, you are able to establish supply lines between your workshop settlements." },
        { level: 14, desc: "You can build stores and workstations at workshop settlements." }
      ]
    }
  ],
  intelligence: [
    {
      name: "Dr. S. Yringer", req: 1, ranks: [
        { level: 0, desc: "You have 10% chance of finding Syringer ammo on killed humans and normal ghouls; quest target path displayed in V.A.T.S." },
        { level: 36, desc: "You now have 20% chance of finding Syringer ammo on killed humans and normal ghouls." }
      ]
    },
    {
      name: "Medic", req: 2, ranks: [
        { level: 0, desc: "Stimpaks restore 40 points Health; RadAway removes 40% radiation; Fungal Purge removes 50 radiation." },
        { level: 14, desc: "Stimpaks restore 50 Health; RadAway removes 60% radiation; Fungal Purge removes 100 radiation." },
        { level: 28, desc: "Stimpaks restore 60 Health; RadAway removes 80% radiation." },
        { level: 49, desc: "Stimpaks restore 70 Health; RadAway removes all radiation and work much more quickly." }
      ]
    },
    {
      name: "Gun Nut", req: 3, ranks: [
        { level: 0, desc: "Shoot first, kill first, with access to base level and Rank 1 ammo and gun mods crafting." },
        { level: 13, desc: "You gain access to Rank 2 ammo and gun mods crafting." },
        { level: 25, desc: "You gain access to Rank 3 ammo and gun mods crafting." },
        { level: 35, desc: "You gain access to Rank 4 ammo and gun mods crafting." }
      ]
    },
    {
      name: "Hacker", req: 4, ranks: [
        { level: 0, desc: "Knowledge of cutting-edge computer encryption allows you to hack Advanced terminals." },
        { level: 9, desc: "You can hack Expert terminals." },
        { level: 21, desc: "You can hack Master terminals." },
        { level: 33, desc: "When hacking, you never get locked out of a terminal when things go wrong." }
      ]
    },
    {
      name: "Scrapper", req: 5, ranks: [
        { level: 0, desc: "Waste not, want not! You can salvage uncommon components like screws, aluminum when scrapping weapons and armor." },
        { level: 23, desc: "You can salvage rare components like circuitry, nuclear material when scrapping weapons and armor." },
        { level: 40, desc: "You get more from salvaging." }
      ]
    },
    {
      name: "Science!", req: 6, ranks: [
        { level: 0, desc: "Take full advantage of advanced technology with access to base level and Rank 1 high-tech mods." },
        { level: 17, desc: "You gain access to Rank 2 high-tech mods." },
        { level: 28, desc: "You gain access to Rank 3 high-tech mods." },
        { level: 41, desc: "You gain access to Rank 4 high-tech mods." }
      ]
    },
    {
      name: "Chemist", req: 7, ranks: [
        { level: 0, desc: "Any chems you take last 50% longer." },
        { level: 16, desc: "Any chems you take now last twice as long." },
        { level: 32, desc: "Any chems you take now last an additional 150% longer." },
        { level: 45, desc: "Any chems you take now last an additional 200% longer." }
      ]
    },
    {
      name: "Robotics Expert", req: 8, ranks: [
        { level: 0, desc: "Machines will always serve humans. Hack a robot and gain chance to power it on/off or initiate self-destruct." },
        { level: 19, desc: "When you successfully hack a robot, you can incite it to attack." },
        { level: 44, desc: "When you successfully hack a robot, you can give it specific commands." }
      ]
    },
    {
      name: "Nuclear Physicist", req: 9, ranks: [
        { level: 0, desc: "You've learned to split the atom! Radiation weapons do 50% more damage and Fusion Cores last 25% longer." },
        { level: 14, desc: "Radiation weapons now do double damage and Fusion Cores last 50% longer." },
        { level: 26, desc: "Fusion Cores can be ejected from Power Armor like grenades and Fusion Cores last twice as long." }
      ]
    },
    {
      name: "Nerd Rage!", req: 10, ranks: [
        { level: 0, desc: "Genius. Is. ANGRY! When Health below 25%, time briefly slows and you gain +20 Damage Resistance and 20% more damage for 30 seconds." },
        { level: 31, desc: "You now gain +30 Damage Resistance and 30% more damage while Nerd Rage is in effect." },
        { level: 50, desc: "You now gain +40 Damage Resistance and 40% more damage while in effect; kills restore some lost Health." }
      ]
    }
  ],
  agility: [
    {
      name: "Gunslinger", req: 1, ranks: [
        { level: 0, desc: "Non-automatic pistols accuracy increased by 20%; shotguns accuracy increased by 15%." },
        { level: 7, desc: "Non-automatic pistols 40% more accurate and 10% greater range; shotguns 30% more accurate." },
        { level: 15, desc: "Non-automatic pistols 60% more accurate and 20% greater range; shotguns 45% more accurate and 20% greater range." },
        { level: 27, desc: "Non-automatic pistols 80% more accurate and disarm opponents; shotguns 60% more accurate and cripple opponents." },
        { level: 42, desc: "Non-automatic pistol attacks have much better chance to disarm; shotguns have higher chance to cripple." }
      ]
    },
    {
      name: "Commando", req: 2, ranks: [
        { level: 0, desc: "Rigorous combat training means automatic weapons are 20% more accurate." },
        { level: 11, desc: "Your automatic weapons now have 40% more accurate and 10% greater range." },
        { level: 21, desc: "Your automatic weapons now have 60% greater accuracy and 20% greater range." },
        { level: 35, desc: "Your automatic weapons are now 80% more accurate and gain chance to stagger opponents." },
        { level: 49, desc: "Your automatic weapons now have greater chance to stagger opponents." }
      ]
    },
    {
      name: "Sneak", req: 3, ranks: [
        { level: 0, desc: "Become whisper, become shadow. You are 20% harder to detect while sneaking." },
        { level: 5, desc: "You are now 30% harder to detect while sneaking and no longer trigger floor-based traps." },
        { level: 12, desc: "You are now 40% harder to detect while sneaking." },
        { level: 23, desc: "You are now 50% harder to detect while sneaking and running no longer adversely affects stealth." },
        { level: 38, desc: "Engaging stealth causes distant enemies to lose you." }
      ]
    },
    {
      name: "Mister Sandman", req: 4, ranks: [
        { level: 0, desc: "As an agent of death itself, you can instantly kill a sleeping person. Your silenced weapons do additional 15% sneak attack damage." },
        { level: 17, desc: "Your silenced weapons do an additional 30% sneak attack damage." },
        { level: 30, desc: "Your silenced weapons now do 50% more sneak attack damage." }
      ]
    },
    {
      name: "Action Boy / Girl", req: 5, ranks: [
        { level: 0, desc: "There's no time to waste! Your Action Points regenerate 25% faster." },
        { level: 18, desc: "Your Action Points now regenerate 50% faster." },
        { level: 38, desc: "Your Action Points now regenerate 75% faster." }
      ]
    },
    {
      name: "Moving Target", req: 6, ranks: [
        { level: 0, desc: "They can't hurt what they can't hit! Get +25 Damage Resistance and +25 Energy Resistance when you're sprinting." },
        { level: 24, desc: "You now get +50 Damage Resistance and +50 Energy Resistance when you're sprinting." },
        { level: 44, desc: "Sprinting costs 50% fewer Action Points." }
      ]
    },
    {
      name: "Ninja", req: 7, ranks: [
        { level: 0, desc: "Trained as a shadow warrior, your melee sneak attacks do 50% more damage." },
        { level: 16, desc: "One-handed melee sneak attacks do 2x normal damage." },
        { level: 33, desc: "Two-handed sneak attacks now also do 2x normal damage." }
      ]
    },
    {
      name: "Quick Hands", req: 8, ranks: [
        { level: 0, desc: "In combat, there's no time to hesitate. You can reload all guns faster." },
        { level: 28, desc: "Reloading guns costs no Action Points in V.A.T.S." },
        { level: 40, desc: "Quick and efficient. You gain 10 additional Action Points." }
      ]
    },
    {
      name: "Blitz", req: 9, ranks: [
        { level: 0, desc: "Find the gap and make the tackle! V.A.T.S. melee distance is increased significantly." },
        { level: 29, desc: "The farther the Blitz distance, the greater the damage." }
      ]
    },
    {
      name: "Gun-Fu", req: 10, ranks: [
        { level: 0, desc: "You've learned to apply ancient martial arts to gunplay! Do 25% more damage to your second V.A.T.S. target and beyond." },
        { level: 26, desc: "In V.A.T.S. you do 50% more damage to your third target and beyond." },
        { level: 50, desc: "In V.A.T.S. you instantly do a Critical Hit against your fourth target and beyond." }
      ]
    }
  ],
  luck: [
    {
      name: "Fortune Finder", req: 1, ranks: [
        { level: 0, desc: "You've learned to discover the Wasteland's hidden wealth and find more cash in containers." },
        { level: 5, desc: "You find even more cash in containers." },
        { level: 25, desc: "You find even more cash in containers." },
        { level: 40, desc: "You find even more cash; chance of enemies exploding in shower of money when you kill them." }
      ]
    },
    {
      name: "Scrounger", req: 2, ranks: [
        { level: 0, desc: "You know just how to scavenge to keep the fight going and find more ammunition in containers." },
        { level: 7, desc: "You find even more ammunition in containers." },
        { level: 24, desc: "You find even more ammunition in containers." },
        { level: 37, desc: "There is a chance to gain ammo when firing the last round in your clip." }
      ]
    },
    {
      name: "Bloody Mess", req: 3, ranks: [
        { level: 0, desc: "+5% bonus damage means enemies will sometimes explode into a gory red paste." },
        { level: 9, desc: "You now inflict +10% damage in combat." },
        { level: 31, desc: "You now inflict +15% damage in combat." },
        { level: 47, desc: "When an enemy explodes, nearby enemies may suffer the same fate." }
      ]
    },
    {
      name: "Mysterious Stranger", req: 4, ranks: [
        { level: 0, desc: "A strange figure has been stalking you lately. This Mysterious Stranger will appear occasionally in V.A.T.S. with deadly efficiency." },
        { level: 22, desc: "The Mysterious Stranger appears more often in V.A.T.S." },
        { level: 41, desc: "The Mysterious Stranger appears more often. When he kills an opponent, there is a chance your Critical meter gets filled." },
        { level: 49, desc: "The Mysterious Stranger appears more often; high chance to fill your Critical meter when he kills." }
      ]
    },
    {
      name: "Idiot Savant", req: 5, ranks: [
        { level: 0, desc: "You're not stupid! Just... different. Randomly receive 2x XP from any action; lower Intelligence = greater chance." },
        { level: 11, desc: "You now randomly receive 4x XP from any action; lower Intelligence = greater chance." },
        { level: 34, desc: "Randomly receiving bonus XP may trigger 3x XP for all kills for a short period; lower Intelligence = greater chance." }
      ]
    },
    {
      name: "Better Criticals", req: 6, ranks: [
        { level: 0, desc: "Advanced training for enhanced combat effectiveness! Criticals do 50% more extra damage." },
        { level: 15, desc: "Your criticals now do twice as much extra damage." },
        { level: 40, desc: "Your criticals now do 2.5x as much extra damage." }
      ]
    },
    {
      name: "Critical Banker", req: 7, ranks: [
        { level: 0, desc: "You're a patient battlefield tactician and can save a Critical Hit for V.A.T.S. when you need it most." },
        { level: 17, desc: "You can now save 2 Critical Hits for V.A.T.S. when you need them most." },
        { level: 43, desc: "You can now save 3 Critical Hits; banking a Critical has chance to save an additional Critical." },
        { level: 50, desc: "You can now save 4 Critical Hits for V.A.T.S. when you need them most." }
      ]
    },
    {
      name: "Grim Reaper's Sprint", req: 8, ranks: [
        { level: 0, desc: "Death becomes you! Any kill in V.A.T.S. has 15% chance to restore all Action Points." },
        { level: 19, desc: "Any kill in V.A.T.S. now has 25% chance to restore all Action Points." },
        { level: 46, desc: "Any kill in V.A.T.S. now has 35% chance to restore all Action Points and refill your Critical meter." }
      ]
    },
    {
      name: "Four Leaf Clover", req: 9, ranks: [
        { level: 0, desc: "Feeling lucky? You should! Each hit in V.A.T.S. has a chance of filling your Critical meter." },
        { level: 13, desc: "Each hit in V.A.T.S. now has an even better chance of filling your Critical meter." },
        { level: 32, desc: "Each hit in V.A.T.S. now has a very good chance of filling your Critical meter." },
        { level: 48, desc: "Each hit in V.A.T.S. now has an excellent chance of filling your Critical meter." }
      ]
    },
    {
      name: "Ricochet", req: 10, ranks: [
        { level: 0, desc: "What goes around comes around! An enemy's ranged attack will sometimes ricochet back and instantly kill them." },
        { level: 29, desc: "There's an increased chance that an enemy's shot will ricochet back and kill them." },
        { level: 50, desc: "When an enemy's shot ricochets back and kills them, there is a chance your Critical meter gets filled." }
      ]
    }
  ]
};

const NON_SPECIAL_PERKS = [
  {
    name: "Iron Lung", levelReq: 20, ranks: [
      { desc: "You are immune against the radioactive air on the surface." }
    ]
  },
  {
    name: "Communistic Wisdom", levelReq: 10, ranks: [
      { desc: "Greetings, Comrade! You gain +15% EXP, but get -5 Charisma. [Incompatible with Wanderer]" }
    ]
  },
  {
    name: "Coward", levelReq: 12, ranks: [
      { desc: "If you don't have more than 20 Damage/Energy Resistance, you get +1 Luck, +1 Agility, +1 Perception and 10% faster sprint." }
    ]
  },
  {
    name: "Sound of Mind", levelReq: 0, ranks: [
      { desc: "You are determined to stay sane. Above 90 sanity: +15% damage. Below: -15% damage. [Below level 11 only]" }
    ]
  },
  {
    name: "Loony Wanderer", levelReq: 10, ranks: [
      { desc: "+50% Sprinting Speed out of combat while insane; +25% limb damage. [Incompatible with Coward. No sneaking/Power Armor]" }
    ]
  },
  {
    name: "Fist of Frost", levelReq: 30, ranks: [
      { desc: "You have become one with the nuclear winter! Your unarmed attacks have chance of dealing bonus frost damage." },
      { desc: "If you block and attack with your fist, chance of freezing your attacker." }
    ]
  },
  {
    name: "Subway Runner", levelReq: 24, ranks: [
      { desc: "The subway system is your home. You move 25% faster while sneaking." }
    ]
  },
  {
    name: "On the Edge...", levelReq: 0, ranks: [
      { desc: "You are on the edge of (in)sanity! With sanity between -20 and 20: +30% damage against normal survivors only." }
    ]
  },
  {
    name: "Slayer of Metal Men", levelReq: 0, ranks: [
      { desc: "+30% damage with melee weapons against robots; 30% less damage from robots. [Below -100 sanity only]" }
    ]
  },
  {
    name: "VID-RH Implant", levelReq: 15, ranks: [
      { desc: "You are a cyborg! Or at least you think you are. 60 poison resistance and 10 radiation resistance; lose 50 energy resistance." }
    ]
  },
  {
    name: "Stealth Guy", levelReq: 13, ranks: [
      { desc: "You figured out how to reduce Stealth Boy energy consumption. +40% Stealth Boy duration." }
    ]
  },
  {
    name: "Isodoped", levelReq: 0, ranks: [
      { desc: "Thanks to your relationship with radiation: at 500 rads or higher you get criticals 20% faster." }
    ]
  },
  {
    name: "Killshot", levelReq: 25, ranks: [
      { desc: "You overclock your V.A.T.S. module; headshot accuracy in V.A.T.S. is increased by 5%." }
    ]
  },
  {
    name: "Hunter's Wisdom", levelReq: 16, ranks: [
      { desc: "Are you hunter or hunted? Damage Resistance and Energy Resistance of animals and sea creatures reduced by 25%." }
    ]
  },
  {
    name: "Steiner's Gate", levelReq: 23, ranks: [
      { desc: "El...Psy...Congroo! You don't get an intelligence debuff anymore if you are insane. [Insanity required]" }
    ]
  },
  {
    name: "Explorer", levelReq: 5, ranks: [
      { desc: "You love to explore! You now get x2 XP when finding new locations. [Incompatible with Wanderer]" },
      { desc: "You love to explore! You now get x3 XP when finding new locations. [Incompatible with Wanderer] (Lvl 25)" }
    ]
  }
];
