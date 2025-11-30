
import React, { useState, useEffect, useCallback, useRef } from 'react';

// Components
import { Header } from './components/Header';
import { Card } from './components/Card';
import { CharacterShowcase } from './components/CharacterShowcase';
import { LoreExplorer } from './components/LoreExplorer';
import { WorldMap } from './components/WorldMap';
import { ReputationTracker } from './components/Milehigh.world-main/ReputationTracker';
import { IntelLogger } from './components/IntelLogger';
import { MissionControl } from './components/MissionControl';
import { LiveConversation } from './components/LiveConversation';
import { CombatStatusDisplay } from './components/CombatStatusDisplay';
import { EnemyEncounter } from './components/EnemyEncounter';
import { CombatLog } from './components/CombatLog';
import { ObjectiveGoals } from './components/ObjectiveGoals';
import { ProductionHub } from './components/ProductionHub';
import { ThreatDetector } from './components/ThreatDetector';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer';
import { TimeTravelAnimation } from './components/Milehigh.world-main/TimeTravelAnimation';
import { ImageGenerator } from './components/ImageGenerator';
import { OmegaOneCompanion } from './components/OmegaOneCompanion';
import { Inventory } from './components/Inventory';

// Constants and Types
import { 
    CHARACTERS, 
    ITEMS, 
    ENEMY_AI_ARCHETYPES, 
    INITIAL_VOICE_PROFILES 
} from './constants';
import { INITIAL_LORE_CONTEXT } from './services/geminiService';

import type { 
    Item, Reputation, MissionGenerationResponse, 
    CombatLogEntry, LogEntryType, PlayerState, ActiveEffect, 
    EnemyAIArchetype, StatBoosts, Scenario, EnemyActionState, Weapon, Armor 
} from './types';

// Services and Utils
import { initAudio, playSound } from './utils/soundService';

const LEVEL_XP_BASE = 1000;

export const App: React.FC = () => {
    // State Management
    const [intelLog, setIntelLog] = useState<string[]>([]);
    const loreContext = `${INITIAL_LORE_CONTEXT}\n\n--- OMEGA.ONE MEMORY CORE UPDATES ---\n${intelLog.join('\n\n')}`;
    
    // Track the latest significant event for Omega.one to react to
    const [lastGameEvent, setLastGameEvent] = useState<string | null>(null);

    const [reputation, setReputation] = useState<Reputation>({
        'Ɲōvəmîŋāđ Alliance': 50,
        "Cirrus's Trust": 40,
        'AṬĤŸŁĞÅŘÐ Honor': 30,
        'ÅẒ̌ŪŘẸ ĤĒĪĜĤṬ§ Authority': 20,
        'Hydraustis Palare Collective': 15,
        'ŁĪƝĈ Underground': 25,
        "The Void's Grasp": 10,
    });
    
    const [combatLog, setCombatLog] = useState<CombatLogEntry[]>([]);
    
    const [playerState, setPlayerState] = useState<PlayerState>(() => {
        try {
            const savedState = localStorage.getItem('playerState_mhw');
            return savedState ? JSON.parse(savedState) : {
                health: 100,
                mana: 100,
                rage: 0,
                alliance: 0,
                level: 1,
                experience: 0,
                skillPoints: 1,
                selectedCharacterName: CHARACTERS[0].name,
                activeEffects: [],
                currentTimePeriod: 'present',
                moralAlignment: 0,
                statBoosts: { strength: 0, dexterity: 0, defense: 0, vigor: 0, heart: 0, voidAffinity: 0, nexusAttunement: 0, oneiricResonance: 0, propheticClarity: 0 },
                equippedItems: {},
                difficulty: 'normal',
                winStreak: 0,
            };
        } catch {
            return {
                health: 100, mana: 100, rage: 0, alliance: 0, level: 1, experience: 0, skillPoints: 1,
                selectedCharacterName: CHARACTERS[0].name, activeEffects: [], currentTimePeriod: 'present',
                moralAlignment: 0,
                statBoosts: { strength: 0, dexterity: 0, defense: 0, vigor: 0, heart: 0, voidAffinity: 0, nexusAttunement: 0, oneiricResonance: 0, propheticClarity: 0 },
                equippedItems: {}, difficulty: 'normal', winStreak: 0,
            };
        }
    });

    // Level up tracking
    const prevLevelRef = useRef(playerState.level);

    useEffect(() => {
        localStorage.setItem('playerState_mhw', JSON.stringify(playerState));
    }, [playerState]);

    // Make inventory mutable state
    const [inventory, setInventory] = useState<Item[]>(() => [
        ...ITEMS.weapons, ...ITEMS.armor, ...ITEMS.consumables
    ]);

    // Combat State
    const [currentEnemy, setCurrentEnemy] = useState<EnemyAIArchetype | null>(null);
    const [enemyHealth, setEnemyHealth] = useState(100);
    const [enemyMaxHealth, setEnemyMaxHealth] = useState(100);
    const [enemyActiveEffects] = useState<ActiveEffect[]>([]);
    const [currentTurn, setCurrentTurn] = useState<'player' | 'enemy' | 'processing' | 'none'>('none');
    
    // Animation States
    const [enemyAction, setEnemyAction] = useState<EnemyActionState>('idle');
    const [activeBreakEffect, setActiveBreakEffect] = useState<string | null>(null);
    const [isWeaknessHit, setIsWeaknessHit] = useState(false);
    const [playerAnimation, setPlayerAnimation] = useState('');
    
    // UI/FX State
    const [timeTravelEffect] = useState<'to_past' | 'to_present' | 'to_future' | null>(null);

    // Mission State
    const [currentMission, setCurrentMission] = useState<MissionGenerationResponse | null>(null);
    const [missionHistory, setMissionHistory] = useState<MissionGenerationResponse[]>([]);

    // Audio State
    const [isAudioInitialized, setIsAudioInitialized] = useState(false);
    const [musicState] = useState({ isPlaying: false, track: 'classical' as const, isMuted: false });

    // Callbacks & Handlers
    const log = useCallback((message: string, type: LogEntryType, icon?: string) => {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        setCombatLog(prev => [{ type, message, timestamp, icon }, ...prev].slice(100));
    }, []);

    const addIntelToLog = useCallback((intel: string) => {
        setIntelLog(prev => [...prev, intel]);
        log(`New intel added to Omega.one memory core.`, 'intel');
        setLastGameEvent(`User injected new intelligence: "${intel.substring(0, 50)}..."`);
    }, [log]);
    
    const updateReputation = useCallback((faction: string, change: number) => {
        setReputation(prev => {
            const newScore = Math.max(0, Math.min(100, (prev[faction] || 0) + change));
            log(`Reputation with ${faction} changed by ${change}. New score: ${newScore}`, 'reputation');
            return { ...prev, [faction]: newScore };
        });
    }, [log]);

    const addMissionToHistory = useCallback((mission: MissionGenerationResponse) => {
        setMissionHistory(prev => [...prev, mission]);
        setLastGameEvent(`Mission Accepted: ${mission.mission.substring(0, 50)}...`);
    }, []);

    const handleScenarioGenerated = (scenario: Scenario) => {
        log(`New scenario generated: "${scenario.objective}"`, 'system');
        setLastGameEvent(`Simulation Generated: ${scenario.objective}`);
    };

    const triggerPlayerAnim = (anim: string) => {
        setPlayerAnimation(anim);
        setTimeout(() => setPlayerAnimation(''), 1200); // Allow slightly longer for heavy flashes
    };

    // Level Up Effect
    useEffect(() => {
        if (playerState.level > prevLevelRef.current) {
            triggerPlayerAnim('level-up-screen-flash');
            playSound('level_up');
            log(`LEVEL UP! You reached level ${playerState.level}.`, 'xp', '⚡');
            setLastGameEvent(`Player ascended to Level ${playerState.level}. Power metrics increasing.`);
            prevLevelRef.current = playerState.level;
        }
    }, [playerState.level, log]);

    const handleEnemyTurn = useCallback(() => {
        if (!currentEnemy || enemyHealth <= 0) return;
        
        const actionType = Math.random() > 0.3 ? 'attack' : 'cast';
        
        if (actionType === 'attack') {
            setEnemyAction('attacking');
            playSound('enemy_attack_lunge');
            setTimeout(() => {
                const damage = 10 + Math.floor(Math.random() * 10);
                setPlayerState(prev => ({ 
                    ...prev, 
                    health: Math.max(0, prev.health - damage),
                    rage: Math.min(100, prev.rage + 15) // Taking damage builds rage
                }));
                playSound('enemy_attack_hit');
                triggerPlayerAnim('animate-player-damage');
                log(`${currentEnemy.name} attacks you for ${damage} damage.`, 'damage');
                
                setEnemyAction('idle');
                setCurrentTurn('player');
            }, 600);
        } else {
            setEnemyAction('casting');
            playSound('enemy_cast');
            setTimeout(() => {
                const damage = 5 + Math.floor(Math.random() * 5);
                setPlayerState(prev => ({ ...prev, health: Math.max(0, prev.health - damage) }));
                triggerPlayerAnim('animate-player-damage'); // Minor shake
                log(`${currentEnemy.name} casts a dark spell!`, 'status_effect');
                
                setEnemyAction('idle');
                setCurrentTurn('player');
            }, 1000);
        }
    }, [currentEnemy, enemyHealth, log]);

    // Automatically trigger enemy turn
    useEffect(() => {
        if (currentTurn === 'enemy' && currentEnemy && enemyHealth > 0) {
            const timer = setTimeout(handleEnemyTurn, 800);
            return () => clearTimeout(timer);
        }
    }, [currentTurn, currentEnemy, enemyHealth, handleEnemyTurn]);

    // Player Actions
    const handleAttack = useCallback(() => {
        if (currentTurn !== 'player' || !currentEnemy) return;

        setCurrentTurn('processing');
        const damage = 20 + Math.floor(Math.random() * 10);
        const isCrit = Math.random() > 0.85;
        const finalDamage = isCrit ? Math.floor(damage * 1.5) : damage;
        const isWeakness = currentEnemy.weakness ? Math.random() > 0.8 : false;

        playSound(isCrit ? 'player_attack_hit' : 'player_attack_swing');
        setEnemyAction('taking_damage');
        
        // Always trigger a slight lunge, but check for crit/weakness for special effects
        triggerPlayerAnim('animate-player-attack');
        
        if (isWeakness) {
            setIsWeaknessHit(true);
            playSound('player_attack_hit'); // Extra sound for impact
        }

        log(`You hit ${currentEnemy.name} for ${finalDamage} damage!${isCrit ? ' (CRITICAL)' : ''}`, isCrit ? 'critical_damage' : 'damage');

        const newHealth = Math.max(0, enemyHealth - finalDamage);
        setEnemyHealth(newHealth);
        
        setPlayerState(prev => ({
            ...prev,
            rage: Math.min(100, prev.rage + 10),
            alliance: Math.min(100, prev.alliance + 5),
            experience: prev.experience + 10
        }));

        setTimeout(() => {
            setEnemyAction('idle');
            setIsWeaknessHit(false);
            if (newHealth <= 0) {
                log(`${currentEnemy.name} defeated!`, 'xp');
                playSound('enemy_defeated');
                setCurrentTurn('none');
                setPlayerState(p => ({ ...p, winStreak: p.winStreak + 1 }));
                setLastGameEvent(`Combat victory against ${currentEnemy.name}. Threat eliminated.`);
            } else {
                setCurrentTurn('enemy');
            }
        }, 600);
    }, [currentTurn, currentEnemy, enemyHealth, log, playerState]);

    const handleTakeDamage = useCallback((damage: number) => {
        triggerPlayerAnim('animate-player-damage');
        playSound('enemy_attack_hit');
        setPlayerState(prev => ({ 
            ...prev, 
            health: Math.max(0, prev.health - damage),
            rage: Math.min(100, prev.rage + damage) 
        }));
        log(`System simulated ${damage} damage to player.`, 'damage');
    }, [log]);

    const handleFindEncounter = useCallback(() => {
        const randomEnemy = ENEMY_AI_ARCHETYPES[Math.floor(Math.random() * ENEMY_AI_ARCHETYPES.length)];
        setCurrentEnemy(randomEnemy);
        // Scale enemy health based on level (simplified)
        const maxHp = randomEnemy.defense * 20 + (playerState.level * 10);
        setEnemyHealth(maxHp);
        setEnemyMaxHealth(maxHp);
        setEnemyAction('idle');
        setCurrentTurn('player');
        log(`Encountered ${randomEnemy.name}!`, 'system');
        playSound('ui_button_click');
        setLastGameEvent(`Hostile entity detected: ${randomEnemy.name}. Combat protocols initiated.`);
    }, [playerState.level, log]);

    const handleLoot = useCallback(() => {
        setCurrentEnemy(null);
        setPlayerState(p => ({ ...p, experience: p.experience + 50 })); // Bonus XP
        log("Loot claimed. Area clear.", 'system');
        playSound('crafting_success');
    }, [log]);

    const handleUseRageBurst = useCallback(() => {
        if (playerState.rage < 100 || !currentEnemy) return;
        
        setCurrentTurn('processing');
        setActiveBreakEffect('RAGE BURST');
        // Use the full screen flash animation
        triggerPlayerAnim('rage-burst-flash');
        playSound('rage_burst');
        log('UNLEASHED RAGE BURST!', 'critical_damage');
        setLastGameEvent(`Rage Burst unleashed on ${currentEnemy.name}. Excessive force authorized.`);
        
        setPlayerState(p => ({ ...p, rage: 0 }));
        
        setTimeout(() => {
            const damage = 80;
            setEnemyAction('taking_damage');
            const newHealth = Math.max(0, enemyHealth - damage);
            setEnemyHealth(newHealth);
            log(`Rage Burst dealt ${damage} massive damage!`, 'critical_damage');
            
            setTimeout(() => {
                setActiveBreakEffect(null);
                setEnemyAction('idle');
                if (newHealth <= 0) {
                    log(`${currentEnemy.name} obliterated!`, 'xp');
                    playSound('enemy_defeated');
                    setCurrentTurn('none');
                    setPlayerState(p => ({ ...p, winStreak: p.winStreak + 1 }));
                    setLastGameEvent(`Enemy obliterated by Rage Burst.`);
                } else {
                    setCurrentTurn('enemy');
                }
            }, 1000);
        }, 1200);
    }, [playerState.rage, currentEnemy, enemyHealth, log]);

    const handleUseSpiritBreak = useCallback(() => {
        if (playerState.mana < 100 || !currentEnemy) return;
        
        setCurrentTurn('processing');
        setActiveBreakEffect('SPIRIT BREAK');
        
        // Sky.ix special animation
        if (playerState.selectedCharacterName === 'Sky.ix') {
             triggerPlayerAnim('quantum-collapse-flash');
        } else {
             triggerPlayerAnim('spirit-break-flash');
        }
        
        playSound('spirit_break');
        log('CHANNELING SPIRIT BREAK!', 'mana');
        
        setPlayerState(p => ({ ...p, mana: 0 }));
        
        setTimeout(() => {
            const damage = 100;
            setEnemyAction('taking_damage');
            const newHealth = Math.max(0, enemyHealth - damage);
            setEnemyHealth(newHealth);
            log(`Spirit Break dealt ${damage} magical damage!`, 'critical_damage');
            
            setTimeout(() => {
                setActiveBreakEffect(null);
                setEnemyAction('idle');
                if (newHealth <= 0) {
                    log(`${currentEnemy.name} purified!`, 'xp');
                    playSound('enemy_defeated');
                    setCurrentTurn('none');
                    setPlayerState(p => ({ ...p, winStreak: p.winStreak + 1 }));
                    setLastGameEvent(`Enemy purified via Spirit Break.`);
                } else {
                    setCurrentTurn('enemy');
                }
            }, 1000);
        }, 1200);
    }, [playerState.mana, playerState.selectedCharacterName, currentEnemy, enemyHealth, log]);

    const handleUseAllianceBreak = useCallback(() => {
        if (playerState.alliance < 100 || !currentEnemy) return;
        
        setCurrentTurn('processing');
        setActiveBreakEffect('ALLIANCE FINISHER');
        triggerPlayerAnim('alliance-finisher-flash'); // Uses a longer, brighter animation
        playSound('alliance_finisher');
        log('ALLIANCE CONVERGENCE INITIATED!', 'critical_damage');
        
        setPlayerState(p => ({ ...p, alliance: 0 }));
        
        setTimeout(() => {
            const damage = 200; // Insta-kill for most non-bosses
            setEnemyAction('taking_damage');
            const newHealth = Math.max(0, enemyHealth - damage);
            setEnemyHealth(newHealth);
            log(`The Ɲōvəmîŋāđ strike as one for ${damage} damage!`, 'critical_damage');
            
            setTimeout(() => {
                setActiveBreakEffect(null);
                setEnemyAction('idle');
                if (newHealth <= 0) {
                    log(`${currentEnemy.name} annihilated by Alliance power!`, 'xp');
                    playSound('enemy_defeated');
                    setCurrentTurn('none');
                    setPlayerState(p => ({ ...p, winStreak: p.winStreak + 1 }));
                    setLastGameEvent(`Total annihilation via Alliance Convergence.`);
                } else {
                    setCurrentTurn('enemy');
                }
            }, 1500);
        }, 2000); // Longer buildup
    }, [playerState.alliance, currentEnemy, enemyHealth, log]);
    
    const onSpendPoint = (stat: keyof StatBoosts) => {
        if (playerState.skillPoints > 0) {
            setPlayerState(p => ({
                ...p,
                skillPoints: p.skillPoints - 1,
                statBoosts: { ...p.statBoosts, [stat]: p.statBoosts[stat] + 1 }
            }));
            log(`Allocated skill point to ${stat}.`, 'system');
            playSound('ui_button_click');
        }
    };

    // Item Interaction Handler
    const handleUseItem = useCallback((item: Item) => {
        // Basic logic for item effects based on name matching
        if (item.name.includes("Health")) {
            setPlayerState(p => ({ ...p, health: Math.min(100, p.health + 50) }));
            playSound('item_use_potion');
            log(`${playerState.selectedCharacterName} used ${item.name}. Recovered health.`, 'heal');
        } else if (item.name.includes("Mana")) {
            setPlayerState(p => ({ ...p, mana: Math.min(100, p.mana + 30) }));
            playSound('item_use_potion');
            log(`${playerState.selectedCharacterName} used ${item.name}. Recovered mana.`, 'mana');
        } else if (item.name.includes("Void Purge")) {
             // In a real game, this would remove debuffs. For now, we just log it.
             playSound('item_use_potion');
             log(`${playerState.selectedCharacterName} used ${item.name}. Cleansed corruption.`, 'status_effect');
        }
        
        // Remove item from inventory (assuming single use for now, or basic stack decrement if we tracked IDs)
        setInventory(prev => {
            const index = prev.findIndex(i => i.name === item.name);
            if (index > -1) {
                const newInv = [...prev];
                newInv.splice(index, 1);
                return newInv;
            }
            return prev;
        });
    }, [log, playerState.selectedCharacterName]);

    // Dummy handlers for equipping items in the Inventory view (logic is mainly in CombatStatusDisplay currently)
    const handleEquipItem = useCallback((item: Weapon | Armor) => {
        // This logic could update playerState.equippedItems
        log(`Equipped ${item.name}. (Logic handled in Combat Status for now)`, 'system');
    }, [log]);


    // Initialize audio on first user interaction
    useEffect(() => {
        const initialize = async () => {
            if (!isAudioInitialized) {
                try {
                    await initAudio();
                    setIsAudioInitialized(true);
                } catch (error) {
                    console.error("Audio could not be initialized by user gesture:", error);
                }
            }
        };
        window.addEventListener('click', initialize, { once: true });
        return () => window.removeEventListener('click', initialize);
    }, [isAudioInitialized]);


    return (
        <div className={`p-4 md:p-8 ${playerAnimation}`} onClick={() => !isAudioInitialized && initAudio().then(() => setIsAudioInitialized(true))}>
            {timeTravelEffect && <TimeTravelAnimation travelDirection={timeTravelEffect} />}
            <Header />
            
            <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                {/* Omega.one Companion Card - Prominently Placed */}
                <div className="lg:col-span-2 xl:col-span-3 2xl:col-span-4">
                    <OmegaOneCompanion 
                        loreContext={loreContext}
                        latestEvent={lastGameEvent}
                    />
                </div>

                <Card title="Character Dossier" index={0} isCollapsible={true} headerGlow>
                    <CharacterShowcase />
                </Card>

                <Card title="Reputation & Faction Standing" index={1} isCollapsible={true}>
                    <ReputationTracker reputation={reputation} />
                </Card>

                <Card title="Verse Topography" index={2} isCollapsible={true}>
                    <WorldMap currentTimePeriod={playerState.currentTimePeriod} />
                </Card>

                <Card title="Lore Archives" index={3} isCollapsible={true}>
                    <LoreExplorer loreContext={loreContext} currentTimePeriod={playerState.currentTimePeriod} />
                </Card>

                <Card title="Mission Control" index={4} isCollapsible={true} startCollapsed={true}>
                    <MissionControl 
                        loreContext={loreContext}
                        addIntelToLog={addIntelToLog}
                        updateReputation={updateReputation}
                        voiceProfiles={INITIAL_VOICE_PROFILES}
                        currentMission={currentMission}
                        setCurrentMission={setCurrentMission}
                        missionHistory={missionHistory}
                        addMissionToHistory={addMissionToHistory}
                    />
                </Card>
                
                <Card title="Live Comms" index={5} isCollapsible={true} startCollapsed={true}>
                    <LiveConversation loreContext={loreContext} onNewIntel={addIntelToLog} voiceProfiles={INITIAL_VOICE_PROFILES} />
                </Card>

                <Card title="Objective Tracker" index={6} isCollapsible={true} startCollapsed={true}>
                    <ObjectiveGoals loreContext={loreContext} currentTimePeriod={playerState.currentTimePeriod} />
                </Card>

                <Card title="Production Hub" index={7} isCollapsible={false} className="xl:col-span-2 2xl:col-span-3">
                    <ProductionHub 
                        loreContext={loreContext}
                        voiceProfiles={INITIAL_VOICE_PROFILES}
                        onNewIntel={addIntelToLog}
                        currentTimePeriod={playerState.currentTimePeriod}
                        onScenarioGenerated={handleScenarioGenerated}
                    />
                </Card>
                
                <div className="space-y-8 xl:col-span-2 2xl:col-span-1">
                    <Card title="Combat Encounter" index={8}>
                        <EnemyEncounter 
                            currentEnemy={currentEnemy} 
                            enemyHealth={enemyHealth}
                            enemyMaxHealth={enemyMaxHealth}
                            selectedCharacter={CHARACTERS.find(c => c.name === playerState.selectedCharacterName)!}
                            playerState={playerState}
                            setPlayerState={setPlayerState}
                            onAttack={handleAttack}
                            onTakeDamage={handleTakeDamage}
                            onFindEncounter={handleFindEncounter}
                            onLoot={handleLoot}
                            onUseRageBurst={handleUseRageBurst}
                            onUseSpiritBreak={handleUseSpiritBreak}
                            onUseAllianceBreak={handleUseAllianceBreak}
                            activeBreakEffect={activeBreakEffect}
                            enemyAction={enemyAction}
                            enemyActiveEffects={enemyActiveEffects}
                            enemyEffectIndicator={null}
                            isPlayerDefeated={playerState.health <= 0}
                            onRetryCombat={() => { setPlayerState(p => ({...p, health: 100})); setEnemyHealth(enemyMaxHealth); setEnemyAction('idle'); setCurrentTurn('player'); }}
                            onLoadGame={() => { setPlayerState(p => ({...p, health: 100, rage: 0, mana: 100})); setCurrentEnemy(null); setCurrentTurn('none'); }}
                            currentTurn={currentTurn}
                            isWeaknessHit={isWeaknessHit}
                            cooldownTimers={{}}
                        />
                    </Card>

                    <Card title="Player Status" index={9}>
                        <CombatStatusDisplay
                            playerState={playerState}
                            setPlayerState={setPlayerState}
                            experienceForNextLevel={LEVEL_XP_BASE * playerState.level}
                            playerEffectIndicator={null}
                            inventory={inventory}
                            onEquipItem={() => {}}
                            onUnequipItem={() => {}}
                            isPlayerTurn={currentTurn === 'player'}
                            onSpendPoint={onSpendPoint}
                            cooldownTimers={{}}
                            selectedCharacter={CHARACTERS.find(c => c.name === playerState.selectedCharacterName)!}
                        />
                    </Card>
                    
                    <Card title="Inventory" index={10}>
                         <Inventory 
                            items={inventory} 
                            onUseItem={handleUseItem} 
                            onEquipItem={handleEquipItem} 
                            isPlayerTurn={true} // Inventory always usable out of combat or during turn
                            playerState={playerState}
                         />
                    </Card>
                </div>

                 <Card title="Combat Log" index={11} isCollapsible={true} startCollapsed={true}>
                    <CombatLog log={combatLog} />
                </Card>

                <Card title="Intel Injection" index={12} isCollapsible={true} startCollapsed={true}>
                    <IntelLogger addIntelToLog={addIntelToLog} />
                </Card>
                
                <Card title="Background Music" index={13} isCollapsible={true} startCollapsed={true}>
                    <BackgroundMusicPlayer
                         musicState={musicState}
                         onPlayPause={() => { /* Placeholder */ }}
                         onSwitchTrack={() => { /* Placeholder */ }}
                         onMuteToggle={() => { /* Placeholder */ }}
                    />
                </Card>

                <Card title="Threat Detector" index={14} isCollapsible={true} startCollapsed={true}>
                    <ThreatDetector loreContext={loreContext} />
                </Card>

                <Card title="Dream Canvas" index={15} isCollapsible={true} startCollapsed={true}>
                    <ImageGenerator />
                </Card>
            </main>
        </div>
    );
}
