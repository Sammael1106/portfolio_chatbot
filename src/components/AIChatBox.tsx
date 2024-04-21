import { classMerge } from "@/lib/utils";
import { Message } from "ai";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { ReactNode, useRef, useEffect } from 'react';
import { SendHorizonal, Trash } from "lucide-react";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void
}

export default function AIChatBox({open, onClose} : AIChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error
  } = useChat({
//     initialMessages: [
//       {id: "1", role: "assistant", content: "Hi, I'm a chat bot"},
//       {id: "2", role: "user", content: "Hi, I'm a chat user"},
//       {id: "3", role: "assistant", content: `
// [Link somewhere](privacy)
// List:
// - item 1
// - item 2
//       `},

//     ]
  }); // default is /api/chat

  console.log(error)

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";
  const clearChat = () => setMessages([]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [messages])

  return (
    <div className={classMerge("h-[300px] overflow-y-auto bg-background w-full border flex-col", open ? "border-green-500" : "border-red-500")}
         ref={scrollRef}>

      {/* Empty box */}
      {!error && messages.length === 0 &&
        <div className="flex flex-col items-center justify-center">
          Send a message to start
        </div>
      }

      {/* Messages */}
      {messages.map(msg => {
        return <ChatMessage message={msg} key={msg.id} />
      })}
      {isLoading && lastMessageIsUser && <LoadingMessage />}
      {error && <ErrorMessage />}

      {/* Chat input */}
      <form onSubmit={handleSubmit}>
        <button type="button" className="w-10" title="Clear chat" onClick={clearChat}>
          <Trash size={24}/>
        </button>
        <input ref={inputRef} type="text" className="border" value={input} onChange={handleInputChange} placeholder="Say something..." />
        <button type="submit" className="w-10 disabled:opacity-40" title="Clear chat" disabled={input.length === 0}>
          <SendHorizonal size={24}/>
        </button>
      </form>
    </div>
  )
}

// Messages
interface ChatMessageProps {
  message: Message
}

function ChatMessage( {message: {role, content}} : ChatMessageProps) {
  const isAiMessage = role === "assistant";
  return <div>
    Role: {role}
    Message:
      <ReactMarkdown components={reactMarkdownComponents}>
        {content}
      </ReactMarkdown>
  </div>
}

const reactMarkdownComponents: { [key: string]: React.FC<any> } = {
  a:  ({ node, ref, ...props }) => <a {...props} href={props.href ?? ""} className={"text-primary underline"} />,
  p:  ({ node, ...props })      => <p {...props} className="text-red-500" />,
  ul: ({ node, ...props })      => <ul {...props} className="list-disc" />,
  ol: ({ node, ...props })      => <ol {...props} />,
  li: ({ node, ...props })      => <li {...props} className="ml-5"/>,
};

const ErrorMessage = () => {
  return <ChatMessage message={{
    id: "error",
    role: "assistant",
    content: "Something went wrong!"
  }} />
}

const LoadingMessage = () => {
  return <ChatMessage message={{
    id: "loading",
    role: "assistant",
    content: "Thinking..."
  }} />
}