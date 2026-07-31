import { useState } from "react";
import { Sparkles, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "agent"; text: string };

const seed: Msg[] = [
  {
    role: "agent",
    text: "I'm your Growth Consultant. Ask me anything — e.g. 'Why are leads down this week?' or 'What should I do today to grow?'",
  },
];

function agentReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("lead") && (lower.includes("down") || lower.includes("drop"))) {
    return "Leads dropped 6% this week, driven by a 40% drop in Reddit-sourced leads after r/SaaS went quiet. LinkedIn and AI-search leads are stable. Recommendation: launch the queued Reddit response batch and re-engage the 47 cold high-score leads — projected to recover the gap within 4 days.";
  }
  if (lower.includes("today") || lower.includes("do")) {
    return "Today's highest-ROI actions: 1) Approve the LinkedIn carousel (drafted, +18% reach). 2) Send 20 founder-personalized emails (queued). 3) Reply to 6 Reddit discussions (+30 inbound est.). 4) Fix 4 missing AI-citation pages (+12% AI visibility).";
  }
  if (lower.includes("competitor")) {
    return "3 competitors shipped this week: NeuralFlow launched a free tier (likely pulling Free-plan signups), DataRay raised a Series A (buying signal for outreach), and LoopGPT published 4 SEO posts. I drafted counter-positioning notes for review.";
  }
  return "I analysed all 14 channels. The biggest bottleneck right now is outreach velocity — 47 qualified leads are waiting >14 days. Approving today's email batch addresses this fastest. Want me to draft the sequence?";
}

export function AiChatPanel({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((m) => [...m, { role: "user", text: q }, { role: "agent", text: agentReply(q) }]);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-primary">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-display text-sm font-semibold">Growth Consultant</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground",
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-3">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask your growth consultant…"
            className="h-9"
          />
          <Button size="icon" className="h-9 w-9" onClick={send}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
