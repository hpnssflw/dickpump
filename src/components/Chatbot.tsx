"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useTypingEffect(text: string, isActive: boolean, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!isActive) return setDisplayed(text);
    setDisplayed("");
    let i = 0;
    const words = text.split(" ");
    function type() {
      if (i < words.length) {
        setDisplayed((prev) => (prev ? prev + " " : "") + words[i]);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
    return () => setDisplayed("");
  }, [text, isActive, speed]);
  return displayed;
}

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

  // Typing effect for the last assistant message
  const lastIdx = messages.length - 1;
  const lastMsg = messages[lastIdx];
  const isTyping = lastMsg?.role === "assistant" && loading === false;
  const displayed = useTypingEffect(
    lastMsg?.content || "",
    !!(isTyping && lastMsg),
    40
  );

  return (
    <div className="rounded-lg shadow-lg w-full h-full flex flex-col py-10  min-h-[400px]">
      <div
        className="flex-1 overflow-y-auto mb-2 flex flex-col justify-end gap-2 min-h-0 scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`text-xs p-2 rounded-lg max-w-[80%] break-words backdrop-blur-md shadow-lg font-mono ${
                msg.role === "user"
                  ? "self-end bg-gradient-to-br from-[#14532d] to-[#7f1d1d] text-white"
                  : "self-start bg-black/40 text-gray-100"
              }`}
              style={{
                boxShadow:
                  msg.role === "user"
                    ? "0 4px 24px 0 rgba(16,100,16,0.25)"
                    : "0 4px 24px 0 rgba(0,0,0,0.08)",
              }}
            >
              {i === lastIdx && msg.role === "assistant" && !loading
                ? displayed
                : msg.content}
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="text-xs p-2 rounded-lg bg-black/40 text-gray-400 self-start animate-pulse max-w-[80%] backdrop-blur-md shadow-lg font-mono"
          >
            Thinking...
          </motion.div>
        )}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 rounded-lg bg-black/40 text-white p-2 outline-none backdrop-blur-md text-base font-mono"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-br from-[#14532d] to-[#7f1d1d] text-white rounded-lg px-4 py-2 shadow-lg backdrop-blur-md hover:opacity-90 transition-colors disabled:opacity-50 text-base font-mono"
          disabled={loading}
        >
          Send
        </button>
      </div>
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
