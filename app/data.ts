// Complexity rating helper
export type Rating = 'excellent' | 'good' | 'fair' | 'bad' | 'horrible';

export function getRating(complexity: string): Rating {
    const map: Record<string, Rating> = {
        'O(1)': 'excellent',
        'O(log n)': 'excellent',
        'Ω(n)': 'good',
        'O(n)': 'good',
        'O(n log n)': 'fair',
        'O(n·log(n))': 'fair',
        'O(n²)': 'bad',
        'O(n^2)': 'bad',
        'O(2^n)': 'horrible',
        'O(n!)': 'horrible',
        'O(n·k)': 'good',
        'O(n+k)': 'good',
        'O(k)': 'excellent',
        'O(n+b)': 'good',
        'N/A': 'fair',
    };
    for (const key of Object.keys(map)) {
        if (complexity.toLowerCase().replace(/\s/g, '') === key.toLowerCase().replace(/\s/g, '')) {
            return map[key];
        }
    }
    if (complexity.includes('log')) return 'fair';
    if (complexity.includes('n²') || complexity.includes('n^2') || complexity.includes('n2')) return 'bad';
    return 'fair';
}

// ─── SORTING ALGORITHMS ───────────────────────────────────────────────────────
export interface SortAlgo {
    name: string;
    best: string;
    average: string;
    worst: string;
    space: string;
    stable: boolean;
    notes: string;
}

export const sortingAlgorithms: SortAlgo[] = [
    { name: 'Quicksort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: false, notes: 'Fast in practice, bad pivot picks cause O(n²)' },
    { name: 'Merge Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: true, notes: 'Guaranteed O(n log n), needs extra space' },
    { name: 'Heap Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: false, notes: 'In-place, not cache-friendly' },
    { name: 'Tim Sort', best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: true, notes: 'Python & Java default, hybrid merge + insertion' },
    { name: 'Bubble Sort', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true, notes: 'Educational only, very slow in practice' },
    { name: 'Insertion Sort', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true, notes: 'Fast for nearly-sorted or tiny arrays' },
    { name: 'Selection Sort', best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: false, notes: 'Always O(n²), minimizes swaps' },
    { name: 'Shell Sort', best: 'O(n log n)', average: 'O(n log²n)', worst: 'O(n log²n)', space: 'O(1)', stable: false, notes: 'Gap-based insertion, gap sequence matters' },
    { name: 'Bucket Sort', best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n²)', space: 'O(n+k)', stable: true, notes: 'Best for uniform distribution data' },
    { name: 'Radix Sort', best: 'O(n·k)', average: 'O(n·k)', worst: 'O(n·k)', space: 'O(n+k)', stable: true, notes: 'Non-comparative, works on fixed-length keys' },
    { name: 'Counting Sort', best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n+k)', space: 'O(k)', stable: true, notes: 'Best when range k is small' },
    { name: 'Tree Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(n)', stable: true, notes: 'Uses BST; worst case on sorted input' },
];

// ─── SEARCHING ALGORITHMS ─────────────────────────────────────────────────────
export interface SearchAlgo {
    name: string;
    best: string;
    average: string;
    worst: string;
    space: string;
    requirement: string;
    notes: string;
}

export const searchingAlgorithms: SearchAlgo[] = [
    { name: 'Linear Search', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)', requirement: 'None', notes: 'Simple scan, works on unsorted data' },
    { name: 'Binary Search', best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)', requirement: 'Sorted', notes: 'Halves search space each step' },
    { name: 'Jump Search', best: 'O(1)', average: 'O(√n)', worst: 'O(√n)', space: 'O(1)', requirement: 'Sorted', notes: 'Jumps √n steps then linear scans' },
    { name: 'Interpolation Search', best: 'O(1)', average: 'O(log log n)', worst: 'O(n)', space: 'O(1)', requirement: 'Sorted + Uniform', notes: 'Best for uniformly distributed data' },
    { name: 'Exponential Search', best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)', requirement: 'Sorted', notes: 'Finds range then binary searches' },
    { name: 'Fibonacci Search', best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)', requirement: 'Sorted', notes: 'Uses Fibonacci numbers for division' },
    { name: 'Ternary Search', best: 'O(1)', average: 'O(log₃n)', worst: 'O(log₃n)', space: 'O(1)', requirement: 'Sorted', notes: 'Divides into 3 parts, slower than binary in practice' },
    { name: 'DFS', best: 'O(1)', average: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', requirement: 'Graph', notes: 'Explores depth-first using stack/recursion' },
    { name: 'BFS', best: 'O(1)', average: 'O(V+E)', worst: 'O(V+E)', space: 'O(V)', requirement: 'Graph', notes: 'Level-by-level, finds shortest path (unweighted)' },
    { name: 'Hash Lookup', best: 'O(1)', average: 'O(1)', worst: 'O(n)', space: 'O(n)', requirement: 'Hash Table', notes: 'Constant time on average, worst if many collisions' },
];

// ─── DATA STRUCTURES ─────────────────────────────────────────────────────────
export interface DataStructure {
    name: string;
    accessAvg: string;
    searchAvg: string;
    insertAvg: string;
    deleteAvg: string;
    accessWorst: string;
    searchWorst: string;
    insertWorst: string;
    deleteWorst: string;
    space: string;
}

export const dataStructures: DataStructure[] = [
    { name: 'Array', accessAvg: 'O(1)', searchAvg: 'O(n)', insertAvg: 'O(n)', deleteAvg: 'O(n)', accessWorst: 'O(1)', searchWorst: 'O(n)', insertWorst: 'O(n)', deleteWorst: 'O(n)', space: 'O(n)' },
    { name: 'Stack', accessAvg: 'O(n)', searchAvg: 'O(n)', insertAvg: 'O(1)', deleteAvg: 'O(1)', accessWorst: 'O(n)', searchWorst: 'O(n)', insertWorst: 'O(1)', deleteWorst: 'O(1)', space: 'O(n)' },
    { name: 'Queue', accessAvg: 'O(n)', searchAvg: 'O(n)', insertAvg: 'O(1)', deleteAvg: 'O(1)', accessWorst: 'O(n)', searchWorst: 'O(n)', insertWorst: 'O(1)', deleteWorst: 'O(1)', space: 'O(n)' },
    { name: 'Linked List', accessAvg: 'O(n)', searchAvg: 'O(n)', insertAvg: 'O(1)', deleteAvg: 'O(1)', accessWorst: 'O(n)', searchWorst: 'O(n)', insertWorst: 'O(1)', deleteWorst: 'O(1)', space: 'O(n)' },
    { name: 'Hash Table', accessAvg: 'N/A', searchAvg: 'O(1)', insertAvg: 'O(1)', deleteAvg: 'O(1)', accessWorst: 'N/A', searchWorst: 'O(n)', insertWorst: 'O(n)', deleteWorst: 'O(n)', space: 'O(n)' },
    { name: 'Binary Tree', accessAvg: 'O(log n)', searchAvg: 'O(log n)', insertAvg: 'O(log n)', deleteAvg: 'O(log n)', accessWorst: 'O(n)', searchWorst: 'O(n)', insertWorst: 'O(n)', deleteWorst: 'O(n)', space: 'O(n)' },
    { name: 'AVL Tree', accessAvg: 'O(log n)', searchAvg: 'O(log n)', insertAvg: 'O(log n)', deleteAvg: 'O(log n)', accessWorst: 'O(log n)', searchWorst: 'O(log n)', insertWorst: 'O(log n)', deleteWorst: 'O(log n)', space: 'O(n)' },
    { name: 'Red-Black Tree', accessAvg: 'O(log n)', searchAvg: 'O(log n)', insertAvg: 'O(log n)', deleteAvg: 'O(log n)', accessWorst: 'O(log n)', searchWorst: 'O(log n)', insertWorst: 'O(log n)', deleteWorst: 'O(log n)', space: 'O(n)' },
    { name: 'Heap', accessAvg: 'N/A', searchAvg: 'O(n)', insertAvg: 'O(log n)', deleteAvg: 'O(log n)', accessWorst: 'N/A', searchWorst: 'O(n)', insertWorst: 'O(log n)', deleteWorst: 'O(log n)', space: 'O(n)' },
    { name: 'Trie', accessAvg: 'O(k)', searchAvg: 'O(k)', insertAvg: 'O(k)', deleteAvg: 'O(k)', accessWorst: 'O(k)', searchWorst: 'O(k)', insertWorst: 'O(k)', deleteWorst: 'O(k)', space: 'O(n·k)' },
];
