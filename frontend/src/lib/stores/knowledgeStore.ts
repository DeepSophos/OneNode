import { writable } from 'svelte/store';

export const knowledgeStore = writable({
  ranges: [
    {
      id: 1,
      name: "产品文档",
      fileCount: 15,
      chapters: 120,
      chunks: 450,
      avgTokens: 210,
      contentTypes: {
        document: 320,
        image: 90,
        table: 40
      },
      files: [
        { name: "用户手册", chapters: 8, chunks: 32, avgTokens: 256,
          contentTypes: { document: 25, image: 5, table: 2 } },
        { name: "API文档", chapters: 5, chunks: 20, avgTokens: 180,
          contentTypes: { document: 18, image: 2, table: 0 } }
      ]
    },
{
      id: 2,
      name: "项目文档",
      fileCount: 15,
      chapters: 120,
      chunks: 450,
      avgTokens: 210,
      contentTypes: {
        document: 320,
        image: 90,
        table: 40
      },
      files: [
        { name: "用户手册", chapters: 8, chunks: 32, avgTokens: 256,
          contentTypes: { document: 25, image: 5, table: 2 } },
        { name: "API文档", chapters: 5, chunks: 20, avgTokens: 180,
          contentTypes: { document: 18, image: 2, table: 0 } }
      ]
    },
    // 其他知识范围...
  ],
  totals: {
    files: 23,
    chapters: 185,
    chunks: 690,
    contentTypes: {
      document: 500,
      image: 130,
      table: 60
    }
  }
});