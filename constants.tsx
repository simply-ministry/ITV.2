
import React from 'react';
import type { CSharpScript, WorldFaction, KeyConcept, ObjectiveGoalGroup, Character, Antagonist, Weapon, Armor, Consumable, Item, EnemyAIArchetype, VoiceProfile } from './types';

// --- Icons ---

export const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.061.44z" />
  </svg>
);

export const FileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const SpeakerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);

export const StopIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
  </svg>
);

export const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </svg>
);

export const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);

export const PauseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
    </svg>
);

export const VolumeUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.805l-.74 2.476c-.435 1.456.637 2.969 2.163 2.969h1.777l4.5 4.5c.945.945 2.56.276 2.56-1.06V4.06zM18.563 7.84a.75.75 0 011.06 0 6.376 6.376 0 010 8.32.75.75 0 11-1.06-1.06 4.876 4.876 0 000-6.2.75.75 0 010-1.06z" />
        <path d="M20.685 5.717a.75.75 0 011.06 0 9.376 9.376 0 010 12.566.75.75 0 11-1.06-1.06 7.876 7.876 0 000-10.446.75.75 0 010-1.06z" />
    </svg>
);

export const VolumeOffIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.805l-.74 2.476c-.435 1.456.637 2.969 2.163 2.969h1.777l4.5 4.5c.945.945 2.56.276 2.56-1.06V4.06z" />
        <path d="M17.78 17.78a.75.75 0 001.06-1.06l-6.25-6.25a.75.75 0 00-1.06 1.06l6.25 6.25zM12.59 11.53l-1.06-1.06.53-.53 1.06 1.06-.53.53z" />
    </svg>
);

export const MicrophoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
);

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

// --- Data ---

export const CHARACTERS: Character[] = [
    {
        name: "Sky.ix",
        title: "The Bionic Goddess",
        archetype: "Tech-Support / Ranged DPS",
        description: "A brilliant xenolinguist fused with advanced cybernetics. She wields the Void Conduit Gauntlet and excels at hacking reality.",
        usd: "def Xform \"Sky_ix\" { ... }",
        strength: 6,
        dexterity: 8,
        defense: 5,
        vigor: 5,
        heart: 9,
        voidAffinity: 7,
        nexusAttunement: 10,
        oneiricResonance: 4,
        propheticClarity: 6,
        damageType: 'Energy',
        statGrowth: { primary: ['nexusAttunement', 'heart'], secondary: ['dexterity'] },
        fightingStyle: "Ranged / Tech",
        weapons: ["Void Gauntlet"],
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Sky_ix.png",
        skills: [{ name: "Void Step", description: "Teleports short distances.", effects: ["Evasion"] }],
        limitBreak: { name: "Singularity", description: "Creates a black hole." },
        spiritBreak: { name: "System Override", description: "Hacks enemies." },
        novaminaadFinisher: { name: "Digital Storm", description: "Unleashes a torrent of data." }
    },
    {
        name: "Aeron",
        title: "The Brave",
        archetype: "Tank / Warrior",
        description: "A noble, winged lion warrior from Aethelgard. He fights with honor and immense physical strength.",
        usd: "def Xform \"Aeron\" { ... }",
        strength: 9,
        dexterity: 5,
        defense: 9,
        vigor: 10,
        heart: 6,
        voidAffinity: 2,
        nexusAttunement: 3,
        oneiricResonance: 3,
        propheticClarity: 4,
        damageType: 'Physical',
        statGrowth: { primary: ['strength', 'defense'], secondary: ['vigor'] },
        fightingStyle: "Melee / Aerial",
        weapons: ["Greatsword"],
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Aeron.png",
        skills: [{ name: "Lion's Roar", description: "Taunts enemies.", effects: ["Aggro"] }],
        limitBreak: { name: "Aethelgard's Might", description: "Massive physical damage." }
    },
    {
        name: "Anastasia",
        title: "The Dreamer",
        archetype: "Mage / Support",
        description: "Trapped physically in the Dreamscape, she projects her power to heal and control the battlefield.",
        usd: "def Xform \"Anastasia\" { ... }",
        strength: 3,
        dexterity: 4,
        defense: 3,
        vigor: 4,
        heart: 10,
        voidAffinity: 5,
        nexusAttunement: 6,
        oneiricResonance: 10,
        propheticClarity: 8,
        damageType: 'Holy',
        statGrowth: { primary: ['heart', 'oneiricResonance'], secondary: ['propheticClarity'] },
        fightingStyle: "Magic / Psychic",
        weapons: ["Dream Staff"],
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Anastasia.png",
        skills: [{ name: "Oneiric Collapse", description: "Puts enemies to sleep.", effects: ["Sleep"] }],
        spiritBreak: { name: "Lucid Dream", description: "Controls reality." }
    },
    {
        name: "Reverie",
        title: "The Arcane Weaver",
        archetype: "Controller / Trickster",
        description: "A pragmatic, fairy-like figment of Anastasia's trauma. She uses glitch magic to disrupt enemies.",
        usd: "def Xform \"Reverie\" { ... }",
        strength: 4,
        dexterity: 9,
        defense: 4,
        vigor: 5,
        heart: 8,
        voidAffinity: 6,
        nexusAttunement: 8,
        oneiricResonance: 9,
        propheticClarity: 5,
        damageType: 'Energy',
        statGrowth: { primary: ['dexterity', 'oneiricResonance'], secondary: ['nexusAttunement'] },
        fightingStyle: "Magic / Stealth",
        weapons: ["Glitch Daggers"],
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Reverie.png",
        skills: [{ name: "Reality Shift", description: "Teleports behind enemy.", effects: ["Confusion"] }]
    },
    {
        name: "Micah",
        title: "The Unbreakable",
        archetype: "Tank / Geomancer",
        description: "A resilient urban teen who manipulates the earth. He uses seismic gauntlets for defense.",
        usd: "def Xform \"Micah\" { ... }",
        strength: 8,
        dexterity: 4,
        defense: 10,
        vigor: 9,
        heart: 5,
        voidAffinity: 3,
        nexusAttunement: 5,
        oneiricResonance: 4,
        propheticClarity: 3,
        damageType: 'Physical',
        statGrowth: { primary: ['defense', 'vigor'], secondary: ['strength'] },
        fightingStyle: "Melee / Defense",
        weapons: ["Seismic Gauntlets"],
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Micah.png",
        skills: [{ name: "Stone Aegis", description: "Raises defense.", effects: ["Defense Up"] }]
    },
    {
        name: "Zaia",
        title: "The Just",
        archetype: "Assassin / DPS",
        description: "Embodies absolute justice and precision. Wields dual blades and strikes from the shadows.",
        usd: "def Xform \"Zaia\" { ... }",
        strength: 7,
        dexterity: 10,
        defense: 4,
        vigor: 6,
        heart: 5,
        voidAffinity: 4,
        nexusAttunement: 6,
        oneiricResonance: 3,
        propheticClarity: 7,
        damageType: 'Physical',
        statGrowth: { primary: ['dexterity', 'strength'], secondary: ['propheticClarity'] },
        fightingStyle: "Melee / Speed",
        weapons: ["Dual Blades"],
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Zaia.png",
        skills: [{ name: "Shadow Step", description: "Instant movement.", effects: ["Speed Up"] }]
    },
    {
        name: "Cirrus",
        title: "The Dragon King",
        archetype: "Bruiser / Elemental",
        description: "Son of King Cyrus. Wields elemental dragon fire and immense physical power.",
        usd: "def Xform \"Cirrus\" { ... }",
        strength: 10,
        dexterity: 6,
        defense: 8,
        vigor: 8,
        heart: 7,
        voidAffinity: 5,
        nexusAttunement: 2,
        oneiricResonance: 3,
        propheticClarity: 4,
        damageType: 'Elemental',
        statGrowth: { primary: ['strength', 'heart'], secondary: ['defense'] },
        fightingStyle: "Melee / Magic",
        weapons: ["Dragon Claws"],
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Cirrus.png",
        skills: [{ name: "Draconic Breath", description: "AoE Fire damage.", effects: ["Burn"] }]
    },
    {
        name: "Ingris",
        title: "The Spirit of Rebirth",
        archetype: "Sustain / Melee",
        description: "A Phoenix Warrior who can cleanse corruption and rebirth from fatal damage.",
        usd: "def Xform \"Ingris\" { ... }",
        strength: 7,
        dexterity: 7,
        defense: 7,
        vigor: 8,
        heart: 8,
        voidAffinity: 1,
        nexusAttunement: 4,
        oneiricResonance: 6,
        propheticClarity: 5,
        damageType: 'Holy',
        statGrowth: { primary: ['heart', 'vigor'], secondary: ['strength'] },
        fightingStyle: "Melee / Healing",
        weapons: ["Phoenix Blade"],
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Ingris.png",
        skills: [{ name: "Phoenix Fire", description: "Cleanses allies.", effects: ["Cleanse"] }]
    },
    {
        name: "Kai",
        title: "The Tactical Seer",
        archetype: "Support / Oracle",
        description: "A child conduit of the Prophecy. Reveals enemy weaknesses and buffs allies.",
        usd: "def Xform \"Kai\" { ... }",
        strength: 2,
        dexterity: 3,
        defense: 3,
        vigor: 4,
        heart: 10,
        voidAffinity: 8,
        nexusAttunement: 5,
        oneiricResonance: 8,
        propheticClarity: 10,
        damageType: 'Energy',
        statGrowth: { primary: ['propheticClarity', 'heart'], secondary: ['voidAffinity'] },
        fightingStyle: "Magic / Support",
        weapons: ["Orb of Insight"],
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Kai.png",
        skills: [{ name: "Prophetic Glimpse", description: "Reveals stats.", effects: ["Scan"] }]
    },
    {
        name: "Otis (X)",
        title: "The Skywanderer",
        archetype: "Agile DPS / Scout",
        description: "Micah's father, struggling with corrupted memories. Uses void-kissed agility.",
        usd: "def Xform \"Otis\" { ... }",
        strength: 6,
        dexterity: 9,
        defense: 5,
        vigor: 6,
        heart: 4,
        voidAffinity: 8,
        nexusAttunement: 7,
        oneiricResonance: 2,
        propheticClarity: 3,
        damageType: 'Void',
        statGrowth: { primary: ['dexterity', 'voidAffinity'], secondary: ['nexusAttunement'] },
        fightingStyle: "Melee / Ranged",
        weapons: ["Void Rifle"],
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Otis.png",
        skills: [{ name: "Void Dash", description: "Quick movement.", effects: ["Speed Up"] }]
    }
];

export const ANTAGONISTS: Antagonist[] = [
    {
        name: "King Cyrus",
        title: "The Dragon King Invader",
        description: "Tyrannical ruler who seeks to consume reality. Wields dark dragon fire.",
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Cyrus.png",
        fightingStyle: "Brute Force / Magic",
        weapons: ["Dark Dragon Blade"]
    },
    {
        name: "Lucent",
        title: "The Lightweaver",
        description: "A manipulative mastermind using light to deceive and blind.",
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Lucent.png",
        fightingStyle: "Magic / Control",
        weapons: ["Light Staff"]
    },
    {
        name: "Delilah",
        title: "The Desolate",
        description: "Corrupted form of Ingris. Wields Voidfire and despair.",
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Delilah.png",
        fightingStyle: "Melee / Void Magic",
        weapons: ["Voidfire Blade"]
    },
    {
        name: "Kane",
        title: "The Usurper",
        description: "Aeron's rival brother. Seeks power at any cost.",
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Kane.png",
        fightingStyle: "Melee",
        weapons: ["Corrupted Greatsword"]
    },
    {
        name: "Nefarious",
        title: "The Void-Touched",
        description: "Ruler of the Shadow Dominion. A powerful sorcerer.",
        imageUrl: "https://storage.googleapis.com/aistudio-e-i-internal-proctoring-prod.appspot.com/public-assets/character-images/Nefarious.png",
        fightingStyle: "Magic",
        weapons: ["Shadow Scepter"]
    }
];

export const ITEMS = {
    weapons: [
        { name: "Void Gauntlet", description: "Channels void energy.", damage: 15, weapon_type: "Gauntlet", damageType: "Void", equippableBy: ["Sky.ix"] },
        { name: "Greatsword", description: "Heavy blade.", damage: 20, weapon_type: "Sword", damageType: "Physical", equippableBy: ["Aeron", "Kane"] },
        { name: "Dream Staff", description: "Weaves dreams.", damage: 10, weapon_type: "Staff", damageType: "Holy", equippableBy: ["Anastasia"] },
        { name: "Glitch Daggers", description: "Phase through armor.", damage: 12, weapon_type: "Dagger", damageType: "Energy", equippableBy: ["Reverie", "Zaia"] },
        { name: "Seismic Gauntlets", description: "Causes tremors.", damage: 18, weapon_type: "Gauntlet", damageType: "Physical", equippableBy: ["Micah"] }
    ] as Weapon[],
    armor: [
        { name: "Cybernetic Plating", description: "Enhances durability.", defense: 15, equippableBy: ["Sky.ix", "Otis (X)"] },
        { name: "Aethelgard Plate", description: "Heavy armor.", defense: 20, equippableBy: ["Aeron", "Kane", "Micah"] },
        { name: "Dreamweaver Robes", description: "Boosts magic.", defense: 5, equippableBy: ["Anastasia", "Kai"] },
        { name: "Stealth Suit", description: "Harder to hit.", defense: 8, equippableBy: ["Zaia", "Reverie"] }
    ] as Armor[],
    consumables: [
        { name: "Health Potion", description: "Restores 50 HP", amount: 50 },
        { name: "Mana Potion", description: "Restores 30 Mana", amount: 30 },
        { name: "Void Purge", description: "Removes corruption", amount: 0 }
    ] as Consumable[]
};

export const ENEMY_AI_ARCHETYPES: EnemyAIArchetype[] = [
    {
        name: "Void Drone",
        archetype: "Minion",
        description: "A mindless automaton corrupted by the Void.",
        coreBehavior: "Swarm",
        defense: 2,
        abilities: [{ name: "Laser", trigger: "OnSight", description: "Fires a weak laser.", damage: 5 }],
        reactions: ["Explode on death"],
        resourceManagement: "None",
        xpValue: 10
    },
    {
        name: "Shadow Knight",
        archetype: "Elite",
        description: "A fallen warrior of Aethelgard.",
        coreBehavior: "Aggressive",
        defense: 10,
        abilities: [{ name: "Slash", trigger: "Melee", description: "Heavy sword swing.", damage: 15 }],
        reactions: ["Block"],
        resourceManagement: "Stamina",
        xpValue: 50,
        weakness: "Holy"
    },
    {
        name: "Cyber-Lich",
        archetype: "Boss",
        description: "A fusion of necromancy and technology.",
        coreBehavior: "Tactical",
        defense: 20,
        abilities: [{ name: "Virus Upload", trigger: "Range", description: "DoT and slow.", damage: 10, effect: { type: "poison", chance: 1, duration: 5, potency: 5 } }],
        reactions: ["Teleport"],
        resourceManagement: "Mana",
        xpValue: 200,
        weakness: "Physical"
    }
];

export const INITIAL_VOICE_PROFILES: VoiceProfile[] = [
    { characterName: "Sky.ix", voiceName: "Kore", systemInstruction: "Analytical, calm, slightly robotic." },
    { characterName: "Aeron", voiceName: "Fenrir", systemInstruction: "Noble, deep, commanding." },
    { characterName: "Anastasia", voiceName: "Puck", systemInstruction: "Soft, dreamy, ethereal." },
    { characterName: "Reverie", voiceName: "Puck", systemInstruction: "Sharp, mischievous, quick." }, // Puck works for both
    { characterName: "Micah", voiceName: "Fenrir", systemInstruction: "Steady, grounded, protective." },
    { characterName: "Zaia", voiceName: "Kore", systemInstruction: "Focused, deadly, precise." },
    { characterName: "Cirrus", voiceName: "Fenrir", systemInstruction: "Arrogant, powerful, fiery." },
    { characterName: "Ingris", voiceName: "Kore", systemInstruction: "Warm, motherly, resilient." },
    { characterName: "Kai", voiceName: "Puck", systemInstruction: "Young, mysterious, wise." },
    { characterName: "Otis (X)", voiceName: "Charon", systemInstruction: "Conflicted, weary, intense." },
    { characterName: "King Cyrus", voiceName: "Charon", systemInstruction: "Tyrannical, booming, evil." },
    { characterName: "Lucent", voiceName: "Fenrir", systemInstruction: "Smooth, deceptive, manipulative." },
    { characterName: "Delilah", voiceName: "Kore", systemInstruction: "Twisted, despairing, mocking." },
    { characterName: "Kane", voiceName: "Charon", systemInstruction: "Aggressive, jealous, bitter." },
    { characterName: "Nefarious", voiceName: "Fenrir", systemInstruction: "Cold, calculating, sinister." }
];

export const WORLD_BUILDING_TABLE: WorldFaction[] = [
    { setting: 'ŁĪƝĈ', focus: 'Cyberpunk/Urban', implication: 'Dense, vertical level design.' },
    { setting: 'ÅẒ̌ŪŘẸ ĤĒĪĜĤṬ§', focus: 'Sky-Cities/Elite', implication: 'Platforming, aerial combat.' },
    { setting: 'AṬĤŸŁĞÅŘÐ', focus: 'Warrior/Mountains', implication: 'Open fields, strong enemies.' },
    { setting: 'ƁÅČ̣ĤÎŘØN̈', focus: 'Celestial/Fractured', implication: 'Gravity puzzles, weird geometry.' },
    { setting: 'Hydraustis Palare', focus: 'Underwater/Alien', implication: '3D movement, oxygen management.' },
    { setting: 'The Glimmering Depths', focus: 'Caves/Crystal', implication: 'Darkness, lighting puzzles.' },
    { setting: 'The Shadow Dominion', focus: 'Darkness/Fortress', implication: 'Stealth, boss rushes.' },
    { setting: 'The Dreamscape', focus: 'Surreal/Psychic', implication: 'Morphing terrain, illusion.' },
    { setting: 'ŤĤÊ VØĪĐ', focus: 'Digital/Entropy', implication: 'Corruption mechanics, timed runs.' },
    { setting: 'Lucent Labs', focus: 'Tech/Research', implication: 'Hacking minigames, sterile environments.' }
];

export const PAST_LOCATIONS_TABLE: WorldFaction[] = [
    { setting: "Onalym Spires", focus: "Pristine Technology", implication: "Pre-invasion peace." },
    { setting: "The Sky-Titan's Perch", focus: "Mythical Beasts", implication: "Giant boss battles." },
    { setting: "The Uncarved Peaks of Aethel", focus: "Raw Nature", implication: "Survival mechanics." },
    { setting: "The Celestial Orrery", focus: "Cosmic Magic", implication: "Star-based puzzles." },
    { setting: "The Sunken Kingdom of Palare", focus: "Ancient Civilization", implication: "Lore discovery." },
    { setting: "The Heart-Crystal Caves", focus: "Magical Source", implication: "Power-ups." },
    { setting: "The Sovereign Lands", focus: "Feudal War", implication: "Large scale battles." },
    { setting: "The Nascent Dream", focus: "Formless Magic", implication: "Creative building." },
    { setting: "The Great Chasm", focus: "Geological Scar", implication: "Platforming challenge." },
    { setting: "Ancient Lîŋq", focus: "Founding City", implication: "Historical quests." }
];

export const FUTURE_LOCATIONS_TABLE: WorldFaction[] = [
    { setting: "Ruins of ŁĪƝĈ", focus: "Post-Apocalyptic", implication: "Scavenging." },
    { setting: "Fallen Spires of ÅẒ̌ŪŘẸ", focus: "Crashed Cities", implication: "Vertical descent." },
    { setting: "Silent Peaks of AṬĤŸŁĞÅŘÐ", focus: "Frozen Wasteland", implication: "Cold mechanics." },
    { setting: "Void-Scarred Chasm", focus: "Total Corruption", implication: "High difficulty." },
    { setting: "The Crystal Graveyard", focus: "Depleted Magic", implication: "Resource scarcity." },
    { setting: "The Data-Tombs", focus: "Lost History", implication: "Information retrieval." },
    { setting: "The Nightmare Echo", focus: "Twisted Reality", implication: "Horror elements." }
];

export const KEY_CONCEPTS: KeyConcept[] = [
    { name: "Millenia", description: "Era of peace." },
    { name: "Magen", description: "Spiritual shield." },
    { name: "Void", description: "Digital entropy." },
    { name: "Nexus", description: "Dimensional hub." },
    { name: "Prophecy", description: "Destiny code." }
];

export const OBJECTIVE_GOALS: ObjectiveGoalGroup[] = [
    {
        id: '1',
        title: 'Initial Recon',
        goals: [{ id: '1a', description: 'Scout the perimeter.' }, { id: '1b', description: 'Report back.' }],
        reward: 'XP +100',
        priority: 'high'
    }
];

// --- CSharp Scripts ---

export const CINEMATICS_SCRIPTS: Record<string, CSharpScript> = {
    dreamscape: { fileName: "DreamscapeEncounter.cs", code: "// Dreamscape Encounter Code" },
    fractured: { fileName: "FracturedShardEncounter.cs", code: "// Fractured Shard Code" },
    glimmering: { fileName: "GlimmeringDepthsEncounter.cs", code: "// Glimmering Depths Code" },
    shadow: { fileName: "ShadowDominionEncounter.cs", code: "// Shadow Dominion Code" }
};

export const SCENE_MANAGEMENT_SCRIPTS: Record<string, CSharpScript> = {
    runtime: { fileName: "AsyncSceneLoader.cs", code: "// Async Loader Code" },
    editor: { fileName: "MultiSceneSetup.cs", code: "// Editor Setup Code" }
};

export const PHYSICS_SCRIPTS: Record<string, CSharpScript> = {
    advanced: { fileName: "AdvancedPhysics.cs", code: "// Advanced Physics Code" },
    collision: { fileName: "CollisionManager.cs", code: "// Collision Manager Code" },
    underwater: { fileName: "UnderwaterMovement.cs", code: "// Underwater Movement Code" }
};

export const CHARACTER_DATA_SCRIPTS: Record<string, CSharpScript> = {
    dataClass: { fileName: "CharacterData.cs", code: "// Character Data Code" },
    factory: { fileName: "CharacterFactory.cs", code: "// Factory Code" },
    jsonData: { fileName: "characters.json", code: "{}" }
};

export const ABILITIES_BASE_SCRIPT: CSharpScript = { fileName: "CharacterAbilitiesBase.cs", code: "// Base Abilities Code" };
export const ALLIANCE_POWER_SCRIPT: CSharpScript = { fileName: "AlliancePowerManager.cs", code: "// Alliance Power Code" };
export const MORAL_ALIGNMENT_SCRIPT: CSharpScript = { fileName: "MoralAlignment.cs", code: "// Moral Alignment Code" };

export const AI_COMPANION_SCRIPTS: Record<string, CSharpScript> = {
    omega: { fileName: "OmegaOneController.cs", code: "// Omega One Code" }
};

export const NETWORK_SCRIPTS: Record<string, CSharpScript> = {
    voidnet: { fileName: "VoidNetManager.cs", code: "// VoidNet Code" }
};

export const MYTH_SCRIPTS: Record<string, CSharpScript> = {
    prophecy: { fileName: "ProphecyEngine.cs", code: "// Prophecy Engine Code" }
};

export const NARRATIVE_SCRIPTS: Record<string, CSharpScript> = {
    director: { fileName: "AIDirector.cs", code: "// AI Director Code" }
};

export const VISUAL_SCRIPTS: Record<string, CSharpScript> = {
    corruption: { fileName: "VoidCorruptionShader.shader", code: "// Shader Code" }
};

export const UI_SCRIPTS: Record<string, CSharpScript> = {
    codex: { fileName: "CodexUI.cs", code: "// Codex UI Code" }
};

export const CHARACTER_CREATION_SCRIPTS: Record<string, CSharpScript> = {
    creator: { fileName: "CharacterCreator.cs", code: "// Creator Code" }
};

export const PYTHON_PHYSICS_SCRIPTS: Record<string, CSharpScript> = {
    py_physics: { fileName: "game_physics.py", code: "# Python Physics Code" }
};

// --- Mock Scripts for specific encounters ---
export const DREAMSCAPE_ENCOUNTER_SCRIPT: CSharpScript = CINEMATICS_SCRIPTS.dreamscape;
export const FRACTURED_SHARD_ENCOUNTER_SCRIPT: CSharpScript = CINEMATICS_SCRIPTS.fractured;
export const GLIMMERING_DEPTHS_ENCOUNTER_SCRIPT: CSharpScript = CINEMATICS_SCRIPTS.glimmering;
export const SHADOW_DOMINION_ENCOUNTER_SCRIPT: CSharpScript = CINEMATICS_SCRIPTS.shadow;

export const COMBAT_MANAGER_SCRIPT: CSharpScript = { fileName: "CombatManager.cs", code: "// Combat Manager Code" };
export const ENEMY_SCRIPT: CSharpScript = { fileName: "Enemy.cs", code: "// Enemy Code" };
export const HEALTH_COMPONENT_SCRIPT: CSharpScript = { fileName: "HealthComponent.cs", code: "// Health Code" };

// --- Functions ---

export const generateCharacterScripts = (): Record<string, CSharpScript> => {
    // Generate dummy scripts for all characters
    const scripts: Record<string, CSharpScript> = {};
    CHARACTERS.forEach(char => {
        scripts[char.name] = { fileName: `${char.name}Controller.cs`, code: `// Controller for ${char.name}` };
    });
    return scripts;
};

export const generateAntagonistScripts = (): Record<string, CSharpScript> => {
    // Generate dummy scripts for all antagonists
    const scripts: Record<string, CSharpScript> = {};
    ANTAGONISTS.forEach(ant => {
        scripts[ant.name] = { fileName: `${ant.name}AI.cs`, code: `// AI for ${ant.name}` };
    });
    return scripts;
};
