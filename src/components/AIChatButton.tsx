"use client"
import { useState } from "react";
import AIChatBox from "@/components/AIChatBox";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return <>
    <button onClick={() => setChatBoxOpen(!chatBoxOpen)}>Chat toggle</button>
    <AIChatBox open={chatBoxOpen} onClose={() => null} />
  </>
}