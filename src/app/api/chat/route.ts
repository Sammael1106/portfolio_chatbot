import { LangChainStream, StreamingTextResponse, Message } from "ai"
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, PromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { AIMessage, HumanMessage} from '@langchain/core/messages';
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import * as env from 'dotenv';
import { getVectorStore } from "@/lib/astradb";
env.config();


export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const store = await getVectorStore();
    const { currentMessageContent, chatHistory } = createChatHistory(messages);
    const {stream, handlers} = LangChainStream();

    const llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      streaming: true,
      callbacks: [handlers],
      verbose: true,
      cache: true
    })

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", `You are a chatbot for personal portfolio. You impressionate the website's owner.
                  Answer the user's question based on context below.
                  Whenever it makes sense and if page exist (check context), provide a link to the page url from the context that contains more information about the topic.
                  Format your messages in markdown format.
                  Context: \n {context}`],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"]
    ])

    // History retriever
    const historyRetrieverModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      verbose: true
    })

    const historyRetrieverPropmpt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      ["user", "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation"],
    ]);

    const historyAwareRetriever = await createHistoryAwareRetriever({
      llm: historyRetrieverModel,
      retriever: store.asRetriever(),
      rephrasePrompt: historyRetrieverPropmpt
    });

    // Docs retrieval chain
    const combineDocsChain = await createStuffDocumentsChain({
      llm,
      prompt,
      documentPrompt: PromptTemplate.fromTemplate("Page URL: {url}\n\n Page content: \n {page_content}"),
      documentSeparator: "\n------------\n",
    });

    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetriever
    });

    retrievalChain.invoke({
      input: currentMessageContent,
      chat_history: chatHistory
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}


function createChatHistory(messages: Array<Message>): { currentMessageContent: string; chatHistory: Array<HumanMessage | AIMessage>} {
  const chatHistory = messages
  .slice(0,-1)
  .map((m: Message) => m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content))

  const currentMessageContent = messages[messages.length - 1].content;

  return { currentMessageContent, chatHistory };
}


