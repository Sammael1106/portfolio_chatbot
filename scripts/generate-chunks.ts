
import { getVectorStore, getEmbeddingsCollection } from "../src/lib/astradb";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocumentInterface } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

async function generateChunks() {
  const vectorStore = await getVectorStore();
  (await getEmbeddingsCollection()).deleteAll({});

  const loader = new DirectoryLoader(
    "src/app",
    {
      ".tsx": (path) => new TextLoader(path)
    },
    true
  )
  const docs = (await loader.load())
  .filter(doc => doc.metadata.source.endsWith("page.tsx"))
  .map((doc): DocumentInterface => {
    const url = doc.metadata.source
      .replace(/\\/g, "/")
      .split("/src/app")[1]
      .split("page.")[0] || "/"

    const pageContentTrimmed = doc.pageContent
      .replace(/^import.*$/gm, "")
      .replace(/ className=(["']).*?\1| className={.*?}/g, "")
      .replace(/^\s*[\r]/gm, "") // remove empty lines
      .replace(/\{\/\*(.|[\r\n])*\*\/\}/gm, "") // remove commented lines
      .trim();
    return {
      pageContent: pageContentTrimmed,
      metadata: { url }
    }
  })

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");

  const splitDocs = await splitter.splitDocuments(docs);
  await vectorStore.addDocuments(splitDocs)
}

generateChunks()