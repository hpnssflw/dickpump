"use client";
import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content: data.text || data.error || "No response",
        },
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Error contacting LLM API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg p-6 shadow-lg w-full h-full flex flex-col max-h-[700px] min-h-[400px]">
      <div className="flex-1 overflow-y-auto mb-2 space-y-2 flex flex-col-reverse justify-end">
        {[...messages].reverse().map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] break-words backdrop-blur-md shadow-lg ${
              msg.role === "user"
                ? "self-end bg-gradient-to-br from-[#6116a7]/70 to-[#1a0a3c]/70 text-white"
                : "self-start bg-white/10 text-gray-100"
            }`}
            style={{
              boxShadow:
                msg.role === "user"
                  ? "0 4px 24px 0 rgba(97,22,167,0.25)"
                  : "0 4px 24px 0 rgba(255,255,255,0.08)",
            }}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="p-2 rounded-lg bg-white/10 text-gray-400 self-start animate-pulse max-w-[80%] backdrop-blur-md shadow-lg">
            Thinking...
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 rounded-lg bg-zinc-800/60 text-white p-2 outline-none backdrop-blur-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-br from-[#6116a7] to-[#1a0a3c] text-white rounded-lg px-4 py-2 shadow-lg backdrop-blur-md hover:from-[#7c3aed] hover:to-[#312e81] transition-colors disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
