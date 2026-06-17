export declare class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  constructor();
}
export declare class Trie {
  root: TrieNode;
  constructor();
  insert(word: string): void;
  searchLongest(text: string, startIndex: number): number;
}
//# sourceMappingURL=dictionary.d.ts.map
