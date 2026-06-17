export class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
        }
        node.isEndOfWord = true;
    }

    // Returns the longest matching word length starting from the given index
    searchLongest(text: string, startIndex: number): number {
        let node = this.root;
        let longestMatch = 0;
        let currentIndex = startIndex;

        while (currentIndex < text.length && node.children.has(text[currentIndex])) {
            node = node.children.get(text[currentIndex])!;
            currentIndex++;
            if (node.isEndOfWord) {
                longestMatch = currentIndex - startIndex;
            }
        }
        return longestMatch;
    }
}
