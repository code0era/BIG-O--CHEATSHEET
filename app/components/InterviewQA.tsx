'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { questions, topics, type Difficulty } from '../questions';
import { getRating } from '../data';
import styles from './InterviewQA.module.css';

type Lang = 'cpp' | 'java';
type FontSize = 'sm' | 'md' | 'lg';
const fontSizeMap: Record<FontSize, string> = { sm: '0.72rem', md: '0.85rem', lg: '1rem' };
const diffColors: Record<Difficulty, string> = { Easy: '#22c55e', Medium: '#eab308', Hard: '#ef4444' };

interface Props { fontSize: FontSize; }

function QuestionRow({ q, index }: { q: typeof questions[0]; index: number }) {
    const [open, setOpen] = useState(false);
    const [lang, setLang] = useState<Lang>('cpp');
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-30px' });

    return (
        <motion.div ref={ref}
            className={styles.row}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.03, type: 'spring', stiffness: 200, damping: 24 }}>
            {/* Header row */}
            <motion.div className={styles.rowHeader} onClick={() => setOpen(!open)}
                whileHover={{ backgroundColor: 'rgba(99,102,241,0.06)' }}>
                <span className={styles.qNum}>#{q.id}</span>
                <span className={styles.qTitle}>{q.title}</span>
                <span className={styles.qTopic}>{q.topic}</span>
                <span className={styles.qDiff} style={{ color: diffColors[q.difficulty], borderColor: diffColors[q.difficulty] + '55' }}>
                    {q.difficulty}
                </span>
                <div className={styles.qBadges}>
                    <span className={`badge badge-${getRating(q.tc)}`}>{q.tc}</span>
                    <span className={`badge badge-${getRating(q.sc)}`}>{q.sc}</span>
                </div>
                <motion.span className={styles.qChevron}
                    animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>▼</motion.span>
            </motion.div>

            {/* Expanded panel */}
            <AnimatePresence>
                {open && (
                    <motion.div className={styles.panel}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}>
                        <div className={styles.panelInner}>
                            {/* Logic */}
                            <div className={styles.infoBlock}>
                                <span className={styles.infoLabel}>🧠 Logic</span>
                                <span className={styles.infoText}>{q.logic}</span>
                            </div>
                            {/* Tip */}
                            <div className={styles.infoBlock} style={{ background: 'rgba(251,191,36,0.07)', borderColor: 'rgba(251,191,36,0.2)' }}>
                                <span className={styles.infoLabel} style={{ color: '#fbbf24' }}>💡 Interview Tip</span>
                                <span className={styles.infoText}>{q.tip}</span>
                            </div>
                            {/* TC / SC */}
                            <div className={styles.tcRow}>
                                <div className={styles.tcCell}>
                                    <span className={styles.infoLabel}>⏱ Time</span>
                                    <span className={`badge badge-${getRating(q.tc)}`} style={{ fontSize: '0.82rem', padding: '4px 12px' }}>{q.tc}</span>
                                </div>
                                <div className={styles.tcCell}>
                                    <span className={styles.infoLabel}>📦 Space</span>
                                    <span className={`badge badge-${getRating(q.sc)}`} style={{ fontSize: '0.82rem', padding: '4px 12px' }}>{q.sc}</span>
                                </div>
                            </div>
                            {/* Lang tabs */}
                            <div className={styles.langTabs}>
                                {(['cpp', 'java'] as Lang[]).map(l => (
                                    <motion.button key={l}
                                        className={`${styles.langBtn} ${lang === l ? styles.langBtnActive : ''}`}
                                        onClick={() => setLang(l)}
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                                        {l === 'cpp' ? '⚙️ C++' : '☕ Java'}
                                    </motion.button>
                                ))}
                            </div>
                            {/* Code block */}
                            <AnimatePresence mode="wait">
                                <motion.pre key={lang} className={styles.code}
                                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
                                    <code>{q[lang]}</code>
                                </motion.pre>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function InterviewQA({ fontSize }: Props) {
    const [topic, setTopic] = useState('All');
    const [diff, setDiff] = useState<'All' | Difficulty>('All');
    const [search, setSearch] = useState('');
    const [view, setView] = useState<'list' | 'grid'>('list');

    const filtered = questions.filter(q =>
        (topic === 'All' || q.topic === topic) &&
        (diff === 'All' || q.difficulty === diff) &&
        (search === '' || q.title.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div style={{ fontSize: fontSizeMap[fontSize] }}>
            {/* Controls */}
            <div className={styles.controls}>
                {/* Search */}
                <input className={styles.search} placeholder="🔍 Search question..."
                    value={search} onChange={e => setSearch(e.target.value)} />
                {/* Topic filter */}
                <div className={styles.filterGroup}>
                    {topics.map(t => (
                        <motion.button key={t}
                            className={`${styles.filterBtn} ${topic === t ? styles.filterActive : ''}`}
                            onClick={() => setTopic(t)}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                            {t}
                        </motion.button>
                    ))}
                </div>
                {/* Difficulty filter */}
                <div className={styles.diffGroup}>
                    {(['All', 'Easy', 'Medium', 'Hard'] as ('All' | Difficulty)[]).map(d => (
                        <motion.button key={d}
                            className={`${styles.diffBtn} ${diff === d ? styles.diffActive : ''}`}
                            style={diff === d && d !== 'All' ? { borderColor: diffColors[d as Difficulty], color: diffColors[d as Difficulty] } : {}}
                            onClick={() => setDiff(d)}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                            {d}
                        </motion.button>
                    ))}
                </div>
                {/* Stats + view toggle */}
                <div className={styles.statsRow}>
                    <span className={styles.stats}>{filtered.length} questions</span>
                    <div className={styles.viewToggle}>
                        <motion.button className={`${styles.viewBtn} ${view === 'list' ? styles.viewBtnActive : ''}`} onClick={() => setView('list')} whileHover={{ scale: 1.05 }}>☰ List</motion.button>
                        <motion.button className={`${styles.viewBtn} ${view === 'grid' ? styles.viewBtnActive : ''}`} onClick={() => setView('grid')} whileHover={{ scale: 1.05 }}>⊞ Grid</motion.button>
                    </div>
                </div>
            </div>

            {/* Questions */}
            <AnimatePresence mode="wait">
                {view === 'list' ? (
                    <motion.div key="list" className={styles.list}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {filtered.map((q, i) => <QuestionRow key={q.id} q={q} index={i} />)}
                    </motion.div>
                ) : (
                    <motion.div key="grid" className={styles.grid}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {filtered.map((q, i) => (
                            <motion.div key={q.id} className={styles.gridCard}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(99,102,241,0.2)' }}>
                                <div className={styles.gcTop}>
                                    <span style={{ color: diffColors[q.difficulty], fontSize: '0.7rem', fontWeight: 700 }}>{q.difficulty}</span>
                                    <span className={styles.gcTopic}>{q.topic}</span>
                                </div>
                                <div className={styles.gcTitle}>#{q.id} {q.title}</div>
                                <div className={styles.gcLogic}>{q.logic}</div>
                                <div className={styles.gcBadges}>
                                    <span className={`badge badge-${getRating(q.tc)}`}>TC: {q.tc}</span>
                                    <span className={`badge badge-${getRating(q.sc)}`}>SC: {q.sc}</span>
                                </div>
                                <div className={styles.gcTip}>💡 {q.tip}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {filtered.length === 0 && (
                <motion.div className={styles.empty} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    No questions match your filters.
                </motion.div>
            )}
        </div>
    );
}
