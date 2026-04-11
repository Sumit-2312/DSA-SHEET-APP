import React, { useState, useCallback, useMemo } from "react";
import { ChevronRight, Folder, FolderOpen, FileText, Search, RotateCcw } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import SheetFallback from "../FallbackUI/SheetPage-fallback";

// ─── Types ────────────────────────────────────────────────────────────────────

type Difficulty = "easy" | "medium" | "hard";
type FilterMode = "all" | "todo" | "done";

interface Problem {
  id: number;
  name: string;
  diff: Difficulty;
  tags: string[];
  lc: string;
}

interface TopicNode {
  id: string;
  label: string;
  problems?: Problem[];
  children?: TopicNode[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DSA_DATA: TopicNode[] = [
  {
    id: "arrays", label: "Arrays", children: [
      { id: "arrays-basic", label: "Basics", problems: [
        { id: 1, name: "Two Sum", diff: "easy", tags: ["hash map"], lc: "1" },
        { id: 2, name: "Best Time to Buy and Sell Stock", diff: "easy", tags: ["sliding window"], lc: "121" },
        { id: 3, name: "Contains Duplicate", diff: "easy", tags: ["hash set"], lc: "217" },
        { id: 4, name: "Product of Array Except Self", diff: "medium", tags: ["prefix sum"], lc: "238" },
        { id: 5, name: "Maximum Subarray", diff: "medium", tags: ["Kadane's"], lc: "53" },
      ]},
      { id: "arrays-adv", label: "Advanced", problems: [
        { id: 6, name: "3Sum", diff: "medium", tags: ["two pointers"], lc: "15" },
        { id: 7, name: "Container With Most Water", diff: "medium", tags: ["two pointers"], lc: "11" },
        { id: 8, name: "Trapping Rain Water", diff: "hard", tags: ["two pointers", "stack"], lc: "42" },
        { id: 9, name: "Jump Game II", diff: "medium", tags: ["greedy"], lc: "45" },
      ]},
    ],
  },
  {
    id: "strings", label: "Strings", children: [
      { id: "strings-basic", label: "Pattern matching", problems: [
        { id: 10, name: "Valid Anagram", diff: "easy", tags: ["frequency"], lc: "242" },
        { id: 11, name: "Longest Substring Without Repeating", diff: "medium", tags: ["sliding window"], lc: "3" },
        { id: 12, name: "Longest Palindromic Substring", diff: "medium", tags: ["DP", "expand"], lc: "5" },
        { id: 13, name: "Group Anagrams", diff: "medium", tags: ["hash map"], lc: "49" },
      ]},
      { id: "strings-adv", label: "Advanced", problems: [
        { id: 14, name: "Minimum Window Substring", diff: "hard", tags: ["sliding window"], lc: "76" },
        { id: 15, name: "Regular Expression Matching", diff: "hard", tags: ["DP"], lc: "10" },
      ]},
    ],
  },
  {
    id: "linkedlist", label: "Linked Lists", children: [
      { id: "ll-basic", label: "Singly linked", problems: [
        { id: 16, name: "Reverse Linked List", diff: "easy", tags: ["iteration"], lc: "206" },
        { id: 17, name: "Merge Two Sorted Lists", diff: "easy", tags: ["merge"], lc: "21" },
        { id: 18, name: "Linked List Cycle", diff: "easy", tags: ["Floyd's"], lc: "141" },
        { id: 19, name: "Remove Nth Node From End", diff: "medium", tags: ["two pointers"], lc: "19" },
      ]},
      { id: "ll-adv", label: "Complex", problems: [
        { id: 20, name: "LRU Cache", diff: "medium", tags: ["doubly LL", "hash map"], lc: "146" },
        { id: 21, name: "Merge K Sorted Lists", diff: "hard", tags: ["heap", "divide & conquer"], lc: "23" },
        { id: 22, name: "Reverse Nodes in k-Group", diff: "hard", tags: ["recursion"], lc: "25" },
      ]},
    ],
  },
  {
    id: "trees", label: "Trees", children: [
      { id: "trees-bst", label: "BST", problems: [
        { id: 23, name: "Validate Binary Search Tree", diff: "medium", tags: ["inorder"], lc: "98" },
        { id: 24, name: "Kth Smallest Element in BST", diff: "medium", tags: ["inorder"], lc: "230" },
        { id: 25, name: "Lowest Common Ancestor of BST", diff: "medium", tags: ["recursion"], lc: "235" },
      ]},
      { id: "trees-traversal", label: "Traversal", problems: [
        { id: 26, name: "Binary Tree Level Order Traversal", diff: "medium", tags: ["BFS"], lc: "102" },
        { id: 27, name: "Diameter of Binary Tree", diff: "easy", tags: ["DFS"], lc: "543" },
        { id: 28, name: "Maximum Depth of Binary Tree", diff: "easy", tags: ["DFS"], lc: "104" },
      ]},
      { id: "trees-adv", label: "Advanced", problems: [
        { id: 29, name: "Serialize and Deserialize Binary Tree", diff: "hard", tags: ["BFS"], lc: "297" },
        { id: 30, name: "Binary Tree Maximum Path Sum", diff: "hard", tags: ["DFS"], lc: "124" },
        { id: 31, name: "Construct from Preorder and Inorder", diff: "medium", tags: ["recursion"], lc: "105" },
      ]},
    ],
  },
  {
    id: "dp", label: "Dynamic Programming", children: [
      { id: "dp-1d", label: "1D DP", problems: [
        { id: 32, name: "Climbing Stairs", diff: "easy", tags: ["Fibonacci"], lc: "70" },
        { id: 33, name: "House Robber", diff: "medium", tags: ["DP"], lc: "198" },
        { id: 34, name: "Coin Change", diff: "medium", tags: ["unbounded knapsack"], lc: "322" },
        { id: 35, name: "Longest Increasing Subsequence", diff: "medium", tags: ["patience sort"], lc: "300" },
        { id: 36, name: "Word Break", diff: "medium", tags: ["DP", "trie"], lc: "139" },
      ]},
      { id: "dp-2d", label: "2D DP", problems: [
        { id: 37, name: "Unique Paths", diff: "medium", tags: ["grid DP"], lc: "62" },
        { id: 38, name: "Longest Common Subsequence", diff: "medium", tags: ["LCS"], lc: "1143" },
        { id: 39, name: "Edit Distance", diff: "medium", tags: ["Levenshtein"], lc: "72" },
        { id: 40, name: "Interleaving String", diff: "hard", tags: ["2D DP"], lc: "97" },
      ]},
    ],
  },
  {
    id: "graphs", label: "Graphs", children: [
      { id: "graphs-bfs", label: "BFS / DFS", problems: [
        { id: 41, name: "Number of Islands", diff: "medium", tags: ["DFS", "BFS"], lc: "200" },
        { id: 42, name: "Clone Graph", diff: "medium", tags: ["DFS", "hash map"], lc: "133" },
        { id: 43, name: "Course Schedule", diff: "medium", tags: ["topological sort"], lc: "207" },
      ]},
      {
        id: "graphs-paths", label: "Shortest paths", children: [
          { id: "graphs-dijkstra", label: "Dijkstra's", problems: [
            { id: 44, name: "Network Delay Time", diff: "medium", tags: ["Dijkstra"], lc: "743" },
            { id: 45, name: "Path With Minimum Effort", diff: "medium", tags: ["Dijkstra"], lc: "1631" },
          ]},
          { id: "graphs-bellman", label: "Bellman-Ford", problems: [
            { id: 46, name: "Cheapest Flights Within K Stops", diff: "medium", tags: ["Bellman-Ford"], lc: "787" },
          ]},
        ],
      },
    ],
  },
  { id: "heaps", label: "Heaps & Priority Queues", problems: [
    { id: 47, name: "Kth Largest Element in Array", diff: "medium", tags: ["min-heap"], lc: "215" },
    { id: 48, name: "Top K Frequent Elements", diff: "medium", tags: ["heap", "bucket"], lc: "347" },
    { id: 49, name: "Find Median from Data Stream", diff: "hard", tags: ["two heaps"], lc: "295" },
  ]},
  { id: "backtrack", label: "Backtracking", problems: [
    { id: 50, name: "Subsets", diff: "medium", tags: ["bitmask"], lc: "78" },
    { id: 51, name: "Permutations", diff: "medium", tags: ["swap"], lc: "46" },
    { id: 52, name: "Combination Sum", diff: "medium", tags: ["backtrack"], lc: "39" },
    { id: 53, name: "N-Queens", diff: "hard", tags: ["backtrack"], lc: "51" },
  ]},
  { id: "trie", label: "Tries", problems: [
    { id: 54, name: "Implement Trie", diff: "medium", tags: ["trie"], lc: "208" },
    { id: 55, name: "Design Add and Search Words", diff: "medium", tags: ["trie", "DFS"], lc: "211" },
    { id: 56, name: "Word Search II", diff: "hard", tags: ["trie", "backtrack"], lc: "212" },
  ]},
];

// ─── Utils ────────────────────────────────────────────────────────────────────

function getAllProblems(nodes: TopicNode[]): Problem[] {
  return nodes.flatMap((n) => [
    ...(n.problems ?? []),
    ...(n.children ? getAllProblems(n.children) : []),
  ]);
}

function countProblems(node: TopicNode): number {
  return (node.problems?.length ?? 0) + (node.children?.reduce((s, c) => s + countProblems(c), 0) ?? 0);
}

function findNode(id: string, nodes: TopicNode[]): TopicNode | null {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) { const r = findNode(id, n.children); if (r) return r; }
  }
  return null;
}

function getBreadcrumb(id: string, nodes: TopicNode[], path: string[] = []): string[] | null {
  for (const n of nodes) {
    const next = [...path, n.label];
    if (n.id === id) return next;
    if (n.children) { const r = getBreadcrumb(id, n.children, next); if (r) return r; }
  }
  return null;
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const DIFF_STYLES: Record<Difficulty, string> = {
  easy:   "bg-[#EAF3DE] text-[#27500A]",
  medium: "bg-[#FAEEDA] text-[#633806]",
  hard:   "bg-[#FCEBEB] text-[#791F1F]",
};

// ─── TreeNode (recursive) ─────────────────────────────────────────────────────

interface TreeNodeProps {
  node: TopicNode;
  depth: number;
  openNodes: Set<string>;
  activeId: string | null;
  solved: Set<number>;
  onSelect: (id: string, hasChildren: boolean) => void;
}

function TreeNode({ node, depth, openNodes, activeId, solved, onSelect }: TreeNodeProps) {
  const hasChildren = !!node.children?.length;
  const isOpen = openNodes.has(node.id);
  const isActive = node.id === activeId;
  const total = countProblems(node);
  const solvedCount = getAllProblems([node]).filter((p) => solved.has(p.id)).length;
  const pct = total > 0 ? Math.round((solvedCount / total) * 100) : 0;
  const indent = 14 + depth * 14;

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 py-[5px] pr-3 text-[12.5px] cursor-pointer transition-colors
          ${isActive
            ? "bg-white text-[var(--color-text-primary)] font-medium dark:bg-[var(--color-background-primary)]"
            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-primary)]"
          }`}
        style={{ paddingLeft: indent }}
        onClick={() => onSelect(node.id, hasChildren)}
      >
        <ChevronRight
          size={10}
          className={`flex-shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-150
            ${hasChildren ? "" : "opacity-0"} ${isOpen ? "rotate-90" : ""}`}
        />
        {hasChildren
          ? isOpen
            ? <FolderOpen size={14} className="flex-shrink-0 text-[var(--color-text-tertiary)]" />
            : <Folder size={14} className="flex-shrink-0 text-[var(--color-text-tertiary)]" />
          : <FileText size={14} className="flex-shrink-0 text-[var(--color-text-tertiary)]" />
        }
        <span className="flex-1 truncate">{node.label}</span>
        <span className="text-[11px] text-[var(--color-text-tertiary)] bg-[var(--color-background-tertiary)] rounded-full px-1.5">{total}</span>
      </div>

      {pct > 0 && (
        <div
          className="h-[2px] bg-[var(--color-background-tertiary)] rounded-full mx-[14px] mb-1 overflow-hidden"
          style={{ marginLeft: indent + 10 }}
        >
          <div className="h-full bg-[#378ADD] rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      )}

      {hasChildren && isOpen && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              openNodes={openNodes}
              activeId={activeId}
              solved={solved}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sheet ────────────────────────────────────────────────────────────────────

function Sheet() {
  const [solved, setSolved] = useState<Set<number>>(new Set());
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set(["arrays", "trees", "dp"]));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterMode>("all");
  const [diffFilter, setDiffFilter] = useState<Set<Difficulty>>(new Set());
  const [search, setSearch] = useState("");

  const handleSelect = useCallback((id: string, hasChildren: boolean) => {
    if (hasChildren) {
      setOpenNodes((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    }
    setActiveId(id);
  }, []);

  const toggleSolve = useCallback((id: number) => {
    setSolved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleDiff = useCallback((d: Difficulty) => {
    setDiffFilter((prev) => {
      const next = new Set(prev);
      next.has(d) ? next.delete(d) : next.add(d);
      return next;
    });
  }, []);

  const baseProblems = useMemo(() => {
    if (!activeId) return getAllProblems(DSA_DATA);
    const node = findNode(activeId, DSA_DATA);
    return node ? getAllProblems([node]) : getAllProblems(DSA_DATA);
  }, [activeId]);

  const visibleProblems = useMemo(() => {
    return baseProblems.filter((p) => {
      if (filter === "done" && !solved.has(p.id)) return false;
      if (filter === "todo" && solved.has(p.id)) return false;
      if (diffFilter.size > 0 && !diffFilter.has(p.diff)) return false;
      return true;
    });
  }, [baseProblems, filter, diffFilter, solved]);

  const filteredTree = useMemo(() => {
    if (!search) return DSA_DATA;
    const q = search.toLowerCase();
    function filterNodes(nodes: TopicNode[]): TopicNode[] {
      return nodes
        .map((n) => ({ ...n, children: n.children ? filterNodes(n.children) : undefined }))
        .filter((n) => n.label.toLowerCase().includes(q) || (n.children && n.children.length > 0));
    }
    return filterNodes(DSA_DATA);
  }, [search]);

  const total = baseProblems.length;
  const solvedCount = baseProblems.filter((p) => solved.has(p.id)).length;
  const easy = baseProblems.filter((p) => p.diff === "easy");
  const hard = baseProblems.filter((p) => p.diff === "hard");
  const pct = total > 0 ? Math.round((solvedCount / total) * 100) : 0;
  const breadcrumb = activeId ? getBreadcrumb(activeId, DSA_DATA) ?? [] : [];
  const activeNode = activeId ? findNode(activeId, DSA_DATA) : null;

  function getTopicLabel(probId: number): string {
    function find(nodes: TopicNode[]): string {
      for (const n of nodes) {
        if (n.problems?.find((p) => p.id === probId)) return n.label;
        if (n.children) { const r = find(n.children); if (r) return r; }
      }
      return "";
    }
    return find(DSA_DATA);
  }

  const filterBtnClass = (mode: FilterMode) =>
    `px-2.5 py-1 text-xs rounded-[var(--border-radius-md)] border transition-all cursor-pointer
    ${filter === mode
      ? "bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border-[var(--color-border-primary)]"
      : "bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border-secondary)] hover:bg-[var(--color-background-secondary)]"
    }`;

  const diffBtnClass = (d: Difficulty) => {
    const base = "px-2.5 py-1 text-xs rounded-[var(--border-radius-md)] border transition-all cursor-pointer ";
    const on = diffFilter.has(d);
    const map = {
      easy:   base + (on ? "bg-[#EAF3DE] border-[#639922] text-[#27500A]" : "bg-transparent border-[var(--color-border-secondary)] text-[#27500A] hover:bg-[#EAF3DE]"),
      medium: base + (on ? "bg-[#FAEEDA] border-[#BA7517] text-[#633806]" : "bg-transparent border-[var(--color-border-secondary)] text-[#633806] hover:bg-[#FAEEDA]"),
      hard:   base + (on ? "bg-[#FCEBEB] border-[#E24B4A] text-[#791F1F]" : "bg-transparent border-[var(--color-border-secondary)] text-[#791F1F] hover:bg-[#FCEBEB]"),
    };
    return map[d];
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--color-background-primary)] text-[var(--color-text-primary)]">

      {/* ── Sidebar ── */}
      <aside className="w-[252px] min-w-[252px] flex flex-col border-r border-[var(--color-border-tertiary)] bg-[var(--color-background-secondary)] overflow-hidden">
        <div className="p-3.5 pb-2.5 border-b border-[var(--color-border-tertiary)] flex-shrink-0">
          <p className="text-[13px] font-medium text-[var(--color-text-primary)] mb-2">Topics</p>
          <div className="relative">
            <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics..."
              className="w-full pl-7 pr-2 py-1.5 text-xs rounded-[var(--border-radius-md)]
                border border-[var(--color-border-secondary)] bg-[var(--color-background-primary)]
                text-[var(--color-text-primary)] outline-none placeholder-[var(--color-text-tertiary)]
                focus:border-[var(--color-border-primary)]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-1.5 scrollbar-thin scrollbar-thumb-[var(--color-border-tertiary)]">
          {filteredTree.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              depth={0}
              openNodes={openNodes}
              activeId={activeId}
              solved={solved}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[var(--color-border-tertiary)] flex-shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-tertiary)] mb-1.5">
            <span>DSA Sheet</span>
            {breadcrumb.slice(0, -1).map((part, i) => (
              <React.Fragment key={i}>
                <span>›</span><span>{part}</span>
              </React.Fragment>
            ))}
          </div>
          <h1 className="text-base font-medium mb-1">{activeNode?.label ?? "All problems"}</h1>
          <div className="flex items-center gap-3">
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#E6F1FB] text-[#0C447C]">{total} problems</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#E1F5EE] text-[#085041]">{solvedCount} solved</span>
            <span className="text-[11px] text-[var(--color-text-tertiary)] ml-auto">{pct}%</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2.5 px-5 py-3 border-b border-[var(--color-border-tertiary)] flex-shrink-0">
          {[
            { label: "Total", value: total, sub: "problems", color: "var(--color-text-primary)" },
            { label: "Solved", value: solvedCount, sub: "completed", color: "#378ADD" },
            { label: "Easy", value: easy.filter((p) => solved.has(p.id)).length, sub: `/ ${easy.length}`, color: "#3B6D11" },
            { label: "Hard", value: hard.filter((p) => solved.has(p.id)).length, sub: `/ ${hard.length}`, color: "#A32D2D" },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="bg-[var(--color-background-secondary)] rounded-[var(--border-radius-md)] p-3">
              <p className="text-[11px] text-[var(--color-text-secondary)] mb-0.5">{label}</p>
              <p className="text-xl font-medium" style={{ color }}>{value}</p>
              <p className="text-[11px] text-[var(--color-text-tertiary)]">{sub}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 px-5 py-2.5 border-b border-[var(--color-border-tertiary)] flex-shrink-0">
          <button className={filterBtnClass("all")} onClick={() => setFilter("all")}>All</button>
          <button className={filterBtnClass("todo")} onClick={() => setFilter("todo")}>Todo</button>
          <button className={filterBtnClass("done")} onClick={() => setFilter("done")}>Solved</button>
          <div className="w-px h-4 bg-[var(--color-border-tertiary)] mx-1" />
          <button className={diffBtnClass("easy")} onClick={() => toggleDiff("easy")}>Easy</button>
          <button className={diffBtnClass("medium")} onClick={() => toggleDiff("medium")}>Medium</button>
          <button className={diffBtnClass("hard")} onClick={() => toggleDiff("hard")}>Hard</button>
          <button
            className="ml-auto flex items-center gap-1 text-[11px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
            onClick={() => { setFilter("all"); setDiffFilter(new Set()); }}
          >
            <RotateCcw size={11} /> Reset
          </button>
        </div>

        {/* Problem Table */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          {visibleProblems.length === 0 ? (
            <p className="text-center text-[13px] text-[var(--color-text-tertiary)] py-10">No problems match this filter.</p>
          ) : (
            <table className="w-full border-collapse" style={{ tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: 32 }} />
                <col />
                <col style={{ width: 80 }} />
                <col style={{ width: 80 }} />
                <col style={{ width: 120 }} />
                <col style={{ width: 54 }} />
              </colgroup>
              <thead>
                <tr>
                  {["", "Problem", "Difficulty", "Topic", "Tags", "Link"].map((h) => (
                    <th key={h} className="sticky top-0 bg-[var(--color-background-primary)] text-left text-[11px] font-medium text-[var(--color-text-tertiary)] px-2 py-2.5 border-b border-[var(--color-border-tertiary)] uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleProblems.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--color-border-tertiary)] hover:bg-[var(--color-background-secondary)] transition-colors">
                    <td className="px-2 py-2.5">
                      <div
                        className={`w-4 h-4 rounded border-[1.5px] cursor-pointer flex items-center justify-center transition-all
                          ${solved.has(p.id)
                            ? "bg-[#378ADD] border-[#378ADD]"
                            : "bg-transparent border-[var(--color-border-secondary)] hover:border-[var(--color-border-primary)]"
                          }`}
                        onClick={() => toggleSolve(p.id)}
                      >
                        {solved.has(p.id) && (
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-[13px]">
                      <span className={`cursor-pointer hover:text-[#378ADD] transition-colors truncate block
                        ${solved.has(p.id) ? "line-through text-[var(--color-text-tertiary)]" : "text-[var(--color-text-primary)]"}`}>
                        {p.name}
                      </span>
                    </td>
                    <td className="px-2 py-2.5">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${DIFF_STYLES[p.diff]}`}>{p.diff}</span>
                    </td>
                    <td className="px-2 py-2.5 text-[12px] text-[var(--color-text-secondary)] truncate">{getTopicLabel(p.id)}</td>
                    <td className="px-2 py-2.5">
                      {p.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[11px] px-1.5 py-0.5 rounded-lg bg-[var(--color-background-tertiary)] text-[var(--color-text-secondary)] mr-1 whitespace-nowrap inline-block">{t}</span>
                      ))}
                    </td>
                    <td className="px-2 py-2.5">
                      <a
                        href={`https://leetcode.com/problems/${slugify(p.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-[#378ADD] opacity-80 hover:opacity-100 transition-opacity"
                      >
                        #{p.lc}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Wrapper ──────────────────────────────────────────────────────────────────

function SheetWrapper() {
  return (
    // @ts-ignore
    <ErrorBoundary FallbackComponent={SheetFallback}>
      <Sheet />
    </ErrorBoundary>
  );
}

export default SheetWrapper;