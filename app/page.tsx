'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { getRating, sortingAlgorithms, searchingAlgorithms, dataStructures } from './data';
import InterviewQA from './components/InterviewQA';
import styles from './page.module.css';

// ─── Types ─────────────────────────────────────────────────────────────────────
type ViewMode = 'grid' | 'table';
type FontSize = 'sm' | 'md' | 'lg';
const fontSizeMap: Record<FontSize, string> = { sm: '0.75rem', md: '0.875rem', lg: '1.05rem' };

// ─── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ value, delay = 0 }: { value: string; delay?: number }) {
  const rating = getRating(value);
  return (
    <motion.span
      className={`badge badge-${rating}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.15, y: -2 }}
    >
      {value}
    </motion.span>
  );
}

// ─── Legend ────────────────────────────────────────────────────────────────────
function Legend() {
  const items = [
    { label: 'Excellent', cls: 'badge-excellent' },
    { label: 'Good', cls: 'badge-good' },
    { label: 'Fair', cls: 'badge-fair' },
    { label: 'Bad', cls: 'badge-bad' },
    { label: 'Horrible', cls: 'badge-horrible' },
  ];
  return (
    <motion.div className={styles.legend}
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      {items.map(it => <span key={it.label} className={`badge ${it.cls}`}>{it.label}</span>)}
    </motion.div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={styles.sectionHeader}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, type: 'spring' }}>
      <span className={styles.sectionIcon}>{icon}</span>
      <div>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionSubtitle}>{subtitle}</p>
      </div>
    </motion.div>
  );
}

// ─── View Toggle + Font Controls ───────────────────────────────────────────────
function ViewControls({
  view, setView, fontSize, setFontSize, showToggle = true
}: {
  view: ViewMode; setView: (v: ViewMode) => void;
  fontSize: FontSize; setFontSize: (f: FontSize) => void;
  showToggle?: boolean;
}) {
  const sizes: FontSize[] = ['sm', 'md', 'lg'];
  return (
    <div className={styles.viewControls}>
      {/* Font size */}
      <div className={styles.controlGroup}>
        <span className={styles.controlLabel}>Font</span>
        {sizes.map(s => (
          <motion.button key={s}
            className={`${styles.controlBtn} ${fontSize === s ? styles.controlBtnActive : ''}`}
            onClick={() => setFontSize(s)}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}>
            {s === 'sm' ? 'A−' : s === 'md' ? 'A' : 'A+'}
          </motion.button>
        ))}
      </div>
      {/* View toggle */}
      {showToggle && (
        <div className={styles.controlGroup}>
          <motion.button
            className={`${styles.controlBtn} ${view === 'grid' ? styles.controlBtnActive : ''}`}
            onClick={() => setView('grid')}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
            title="Card / Grid View">
            ⊞ Grid
          </motion.button>
          <motion.button
            className={`${styles.controlBtn} ${view === 'table' ? styles.controlBtnActive : ''}`}
            onClick={() => setView('table')}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
            title="Table View">
            ☰ Table
          </motion.button>
        </div>
      )}
    </div>
  );
}

// ─── Big-O Graph ───────────────────────────────────────────────────────────────
function BigOGraph({ fontSize }: { fontSize: FontSize }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const curves = [
    { label: 'O(1)', color: '#22c55e', points: '0,200 400,200' },
    { label: 'O(log n)', color: '#84cc16', points: '0,200 50,170 120,150 250,135 400,125' },
    { label: 'O(n)', color: '#eab308', points: '0,200 400,20' },
    { label: 'O(n log n)', color: '#f97316', points: '0,200 80,150 180,90 280,40 360,10' },
    { label: 'O(n²)', color: '#ef4444', points: '0,200 80,180 150,130 210,70 260,20' },
    { label: 'O(2ⁿ)', color: '#a855f7', points: '0,200 120,195 200,160 260,90 300,20' },
  ];
  return (
    <motion.div ref={ref} className={styles.graphCard}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }} style={{ fontSize: fontSizeMap[fontSize] }}>
      <div className={styles.graphTitle}>Big-O Complexity Chart</div>
      <div className={styles.graphWrap}>
        <svg viewBox="0 0 440 220" className={styles.graphSvg} preserveAspectRatio="xMidYMid meet">
          {[50, 100, 150, 200].map(y => <line key={y} x1="0" y1={y} x2="440" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />)}
          {[100, 200, 300, 400].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />)}
          {curves.map((c, i) => (
            <motion.polyline key={c.label} points={c.points} fill="none" stroke={c.color} strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: i * 0.15 + 0.3, duration: 1, ease: 'easeOut' }} />
          ))}
          {curves.map((c) => {
            const pts = c.points.split(' '); const last = pts[pts.length - 1].split(',');
            return <motion.text key={c.label + 'l'} x={Number(last[0]) + 4} y={Number(last[1])} fill={c.color}
              fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.5 }}>{c.label}</motion.text>;
          })}
          <line x1="0" y1="200" x2="440" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="0" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <text x="200" y="215" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif">Elements (n)</text>
          <text x="-90" y="10" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif" transform="rotate(-90)">Operations</text>
        </svg>
      </div>
      <div className={styles.graphLegend}>
        {curves.map(c => (
          <span key={c.label} className={styles.graphLegendItem}>
            <span className={styles.graphLegendDot} style={{ background: c.color }} />
            <span className="mono" style={{ color: c.color, fontSize: '0.75rem' }}>{c.label}</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Sort/Search Card ──────────────────────────────────────────────────────────
type AlgoCardData = { name: string; best: string; average: string; worst: string; space: string; notes: string; stable?: boolean; requirement?: string };

function AlgoCard({ algo, index, accent = '#6366f1' }: { algo: AlgoCardData; index: number; accent?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} className={styles.algoCard}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 200, damping: 22 }}
      whileHover={{ y: -4, scale: 1.02, boxShadow: `0 12px 40px ${accent}40` }}
      onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
      <div className={styles.cardTop}>
        <div className={styles.cardName}>{algo.name}</div>
        {algo.stable !== undefined && (
          <motion.span style={{ color: algo.stable ? 'var(--excellent)' : 'var(--bad)', fontSize: '0.7rem', fontWeight: 700 }}
            animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, delay: index * 0.1 }}>
            {algo.stable ? '✓ Stable' : '✗ Unstable'}
          </motion.span>
        )}
        {algo.requirement && <span className={styles.cardReq}>{algo.requirement}</span>}
      </div>
      <div className={styles.cardGrid}>
        <div className={styles.cardCell}><span className={styles.cellLabel}>Best</span><Badge value={algo.best} delay={index * 0.04} /></div>
        <div className={styles.cardCell}><span className={styles.cellLabel}>Avg</span><Badge value={algo.average} delay={index * 0.04 + 0.05} /></div>
        <div className={styles.cardCell}><span className={styles.cellLabel}>Worst</span><Badge value={algo.worst} delay={index * 0.04 + 0.1} /></div>
        <div className={styles.cardCell}><span className={styles.cellLabel}>Space</span><Badge value={algo.space} delay={index * 0.04 + 0.15} /></div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className={styles.cardNote}
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            💡 {algo.notes}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className={styles.cardHint}
        animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}>
        {open ? '▲ collapse' : '▼ tap for notes'}
      </motion.div>
    </motion.div>
  );
}

// ─── Sort/Search Table View ────────────────────────────────────────────────────
function AlgoTable({ data, fontSize }: { data: AlgoCardData[]; fontSize: FontSize }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} className={styles.tableWrap}
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }} style={{ fontSize: fontSizeMap[fontSize] }}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Algorithm</th>
              <th className={styles.th}>Best TC</th>
              <th className={styles.th}>Avg TC</th>
              <th className={styles.th}>Worst TC</th>
              <th className={styles.th}>Space SC</th>
              <th className={styles.th}>Info</th>
            </tr>
          </thead>
          <tbody>
            {data.map((algo, i) => (
              <motion.tr key={algo.name} className={styles.tr}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(99,102,241,0.08)' }}>
                <td className={styles.tdName}>
                  {algo.name}
                  {algo.stable !== undefined && (
                    <span style={{ marginLeft: 6, fontSize: '0.65em', color: algo.stable ? 'var(--excellent)' : 'var(--bad)' }}>
                      {algo.stable ? '✓' : '✗'}
                    </span>
                  )}
                  {algo.requirement && <span style={{ marginLeft: 6, fontSize: '0.65em', color: 'var(--accent3)' }}>[{algo.requirement}]</span>}
                </td>
                <td className={styles.td}><Badge value={algo.best} delay={i * 0.04} /></td>
                <td className={styles.td}><Badge value={algo.average} delay={i * 0.04 + 0.05} /></td>
                <td className={styles.td}><Badge value={algo.worst} delay={i * 0.04 + 0.1} /></td>
                <td className={styles.td}><Badge value={algo.space} delay={i * 0.04 + 0.15} /></td>
                <td className={styles.td} style={{ fontSize: '0.72em', color: 'var(--text-secondary)', maxWidth: 200 }}>{algo.notes}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ─── DS Card (for grid view of data structures) ────────────────────────────────
function DSCard({ ds, index }: { ds: typeof dataStructures[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} className={styles.algoCard}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 200, damping: 22 }}
      whileHover={{ y: -4, scale: 1.02, boxShadow: '0 12px 40px rgba(6,182,212,0.25)' }}>
      <div className={styles.cardTop}>
        <div className={styles.cardName}>{ds.name}</div>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
          <span style={{ color: 'var(--accent3)' }}>SC {ds.space}</span>
        </span>
      </div>
      <div style={{ marginBottom: 8, fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.06em' }}>AVERAGE</div>
      <div className={styles.cardGrid}>
        <div className={styles.cardCell}><span className={styles.cellLabel}>Access</span><Badge value={ds.accessAvg} delay={index * 0.04} /></div>
        <div className={styles.cardCell}><span className={styles.cellLabel}>Search</span><Badge value={ds.searchAvg} delay={index * 0.04 + 0.04} /></div>
        <div className={styles.cardCell}><span className={styles.cellLabel}>Insert</span><Badge value={ds.insertAvg} delay={index * 0.04 + 0.08} /></div>
        <div className={styles.cardCell}><span className={styles.cellLabel}>Delete</span><Badge value={ds.deleteAvg} delay={index * 0.04 + 0.12} /></div>
      </div>
      <div style={{ margin: '12px 0 8px', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.06em' }}>WORST</div>
      <div className={styles.cardGrid}>
        <div className={styles.cardCell}><span className={styles.cellLabel}>Access</span><Badge value={ds.accessWorst} delay={index * 0.04 + 0.16} /></div>
        <div className={styles.cardCell}><span className={styles.cellLabel}>Search</span><Badge value={ds.searchWorst} delay={index * 0.04 + 0.2} /></div>
        <div className={styles.cardCell}><span className={styles.cellLabel}>Insert</span><Badge value={ds.insertWorst} delay={index * 0.04 + 0.24} /></div>
        <div className={styles.cardCell}><span className={styles.cellLabel}>Delete</span><Badge value={ds.deleteWorst} delay={index * 0.04 + 0.28} /></div>
      </div>
    </motion.div>
  );
}

// ─── DS Table ──────────────────────────────────────────────────────────────────
function DSTable({ fontSize }: { fontSize: FontSize }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const cols = ['Access', 'Search', 'Insert', 'Delete'];
  return (
    <motion.div ref={ref} className={styles.tableWrap}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }} style={{ fontSize: fontSizeMap[fontSize] }}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th} rowSpan={2}>Data Structure</th>
              <th className={styles.thGroup} colSpan={4}>Time Complexity — Average</th>
              <th className={styles.thGroup} colSpan={4}>Time Complexity — Worst</th>
              <th className={styles.th} rowSpan={2}>Space<br />Worst</th>
            </tr>
            <tr>{[...cols, ...cols].map((c, i) => <th key={i} className={styles.thSub}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {dataStructures.map((ds, i) => (
              <motion.tr key={ds.name} className={styles.tr}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.07 }}
                whileHover={{ backgroundColor: 'rgba(99,102,241,0.08)' }}>
                <td className={styles.tdName}>{ds.name}</td>
                {[ds.accessAvg, ds.searchAvg, ds.insertAvg, ds.deleteAvg, ds.accessWorst, ds.searchWorst, ds.insertWorst, ds.deleteWorst].map((v, j) => (
                  <td key={j} className={styles.td}><Badge value={v} delay={i * 0.07 + j * 0.02} /></td>
                ))}
                <td className={styles.td}><Badge value={ds.space} delay={i * 0.07 + 0.2} /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ─── Tab Config ────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'graph', label: '📈 Big-O Graph' },
  { id: 'sort', label: '🔀 Sorting' },
  { id: 'search', label: '🔍 Searching' },
  { id: 'ds', label: '🧱 Data Structures' },
  { id: 'qa', label: '🎯 Interview Q&A' },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState('graph');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [fontSize, setFontSize] = useState<FontSize>('md');

  // Reset to grid when switching tabs
  const handleTab = (id: string) => { setActiveTab(id); setViewMode('grid'); };

  const sortData: AlgoCardData[] = sortingAlgorithms.map(a => ({ ...a, requirement: undefined }));
  const searchData: AlgoCardData[] = searchingAlgorithms.map(a => ({ ...a, stable: undefined }));

  return (
    <div className={styles.page}>
      {/* Hero */}
      <motion.header className={styles.hero}
        initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <motion.div className={styles.heroGlow}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 5 }} />
        <motion.div className={styles.heroTag}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          Algorithm Complexity Cheat Sheet
        </motion.div>
        <motion.h1 className={styles.heroTitle}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Big-O <span className={styles.heroAccent}>Cheat Sheet</span>
        </motion.h1>
        <motion.p className={styles.heroSub}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          Interactive animated cheat sheet for Time &amp; Space Complexities — Sorting, Searching &amp; Data Structures
        </motion.p>
        <Legend />
      </motion.header>

      {/* Tab Nav */}
      <motion.nav className={styles.tabNav}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        {TABS.map(tab => (
          <motion.button key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => handleTab(tab.id)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            {tab.label}
            {activeTab === tab.id && <motion.div className={styles.tabUnderline} layoutId="tabUnderline" />}
          </motion.button>
        ))}
      </motion.nav>

      {/* Main */}
      <main className={styles.main}>
        <AnimatePresence mode="wait">

          {/* BIG-O GRAPH */}
          {activeTab === 'graph' && (
            <motion.section key="graph"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}>
              <ViewControls view={viewMode} setView={setViewMode} fontSize={fontSize} setFontSize={setFontSize} showToggle={false} />
              <BigOGraph fontSize={fontSize} />
              <div className={styles.complexityGrid}>
                {[
                  { label: 'O(1)', desc: 'Constant — Best possible', r: 'excellent' },
                  { label: 'O(log n)', desc: 'Logarithmic — Excellent', r: 'excellent' },
                  { label: 'O(n)', desc: 'Linear — Acceptable', r: 'good' },
                  { label: 'O(n log n)', desc: 'Linearithmic — Fair for sorting', r: 'fair' },
                  { label: 'O(n²)', desc: 'Quadratic — Avoid for n > 10k', r: 'bad' },
                  { label: 'O(2ⁿ)', desc: 'Exponential — Avoid at all costs', r: 'horrible' },
                ].map((item, i) => (
                  <motion.div key={item.label} className={styles.complexityCard}
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, type: 'spring' }} whileHover={{ scale: 1.05, y: -4 }}
                    style={{ fontSize: fontSizeMap[fontSize] }}>
                    <span className={`badge badge-${item.r} ${styles.complexityBadge}`} style={{ fontSize: '1rem', padding: '6px 14px' }}>{item.label}</span>
                    <p className={styles.complexityDesc}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* SORTING */}
          {activeTab === 'sort' && (
            <motion.section key="sort"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}>
              <SectionHeader icon="🔀" title="Sorting Algorithms" subtitle="Click cards to reveal notes · TC = Time · SC = Space" />
              <ViewControls view={viewMode} setView={setViewMode} fontSize={fontSize} setFontSize={setFontSize} />
              <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                  <motion.div key="sort-grid" className={styles.cardGrid3}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                    style={{ fontSize: fontSizeMap[fontSize] }}>
                    {sortData.map((a, i) => <AlgoCard key={a.name} algo={a} index={i} />)}
                  </motion.div>
                ) : (
                  <motion.div key="sort-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <AlgoTable data={sortData} fontSize={fontSize} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )}

          {/* SEARCHING */}
          {activeTab === 'search' && (
            <motion.section key="search"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}>
              <SectionHeader icon="🔍" title="Searching Algorithms" subtitle="Click cards to reveal notes · Requirement = data structure needed" />
              <ViewControls view={viewMode} setView={setViewMode} fontSize={fontSize} setFontSize={setFontSize} />
              <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                  <motion.div key="search-grid" className={styles.cardGrid3}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                    style={{ fontSize: fontSizeMap[fontSize] }}>
                    {searchData.map((a, i) => <AlgoCard key={a.name} algo={a} index={i} accent="#06b6d4" />)}
                  </motion.div>
                ) : (
                  <motion.div key="search-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <AlgoTable data={searchData} fontSize={fontSize} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )}

          {/* DATA STRUCTURES */}
          {activeTab === 'ds' && (
            <motion.section key="ds"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}>
              <SectionHeader icon="🧱" title="Data Structures" subtitle="Hover rows to highlight · Average and worst case complexities" />
              <ViewControls view={viewMode} setView={setViewMode} fontSize={fontSize} setFontSize={setFontSize} />
              <AnimatePresence mode="wait">
                {viewMode === 'table' ? (
                  <motion.div key="ds-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <DSTable fontSize={fontSize} />
                  </motion.div>
                ) : (
                  <motion.div key="ds-grid" className={styles.cardGrid3}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                    style={{ fontSize: fontSizeMap[fontSize] }}>
                    {dataStructures.map((ds, i) => <DSCard key={ds.name} ds={ds} index={i} />)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )}

          {/* INTERVIEW Q&A */}
          {activeTab === 'qa' && (
            <motion.section key="qa"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}>
              <SectionHeader icon="🎯" title="DSA Interview Questions"
                subtitle="50 top questions · C++ & Java solutions · Click to expand logic, TC/SC & tips · Filter by topic or difficulty" />
              <ViewControls view={viewMode} setView={setViewMode} fontSize={fontSize} setFontSize={setFontSize} showToggle={false} />
              <InterviewQA fontSize={fontSize} />
            </motion.section>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer className={styles.footer}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <span>⚡ Next.js + Framer Motion</span>
        <span className={styles.footerDot}>·</span>
        <span>TCSC Algorithm Cheat Sheet</span>
        <span className={styles.footerDot}>·</span>
        <span>Toggle grid/table per tab · Resize font with A−/A/A+</span>
      </motion.footer>
    </div>
  );
}
