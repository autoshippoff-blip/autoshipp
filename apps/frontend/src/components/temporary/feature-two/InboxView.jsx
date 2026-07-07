"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  getInboxCustomers,
  getChatHistory,
  sendMessage,
} from "../../../app/(temporary)/lib/api";
import { LoadingState, ErrorState } from "./StateWrappers";
import { EmptyState } from "../../EmptyState";
import { MessageSquare, Send } from "lucide-react";

export function InboxView() {
  const [customers, setCustomers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhone, setSelectedPhone] = useState(null);

  const fetchCustomers = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const res = await getInboxCustomers();
      setCustomers(res);
    } catch (err) {
      if (!silent) setError(err);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
    // Poll every 5 seconds for new inbound customers
    const interval = setInterval(() => fetchCustomers(true), 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !customers) return <LoadingState message="Loading inbox..." />;
  if (error && !customers)
    return <ErrorState error={error} onRetry={() => fetchCustomers(false)} />;

  if (!customers || customers.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="Inbox is empty"
        description="When customers reply to your campaigns, their messages will appear here."
      />
    );
  }

  return (
    <div className="flex h-[500px] border border-border rounded-xl bg-card shadow-sm overflow-hidden animate-in fade-in duration-500">
      {/* Customer List Sidebar */}
      <div className="w-1/3 border-r border-border flex flex-col bg-muted/10 overflow-y-auto">
        <div className="p-4 border-b border-border bg-card sticky top-0">
          <h3 className="font-medium text-foreground">Customer Inbox</h3>
        </div>
        <div className="divide-y divide-border">
          {customers.map((c) => (
            <button
              key={c.phoneNumber}
              onClick={() => setSelectedPhone(c.phoneNumber)}
              className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${selectedPhone === c.phoneNumber ? "bg-muted/50 border-l-2 border-brand-orange" : "border-l-2 border-transparent"}`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-medium text-foreground">
                  {c.phoneNumber}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.lastMessageTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {c.lastMessage}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 flex flex-col bg-card">
        {selectedPhone ? (
          <ChatPanel phone={selectedPhone} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground flex-col">
            <MessageSquare className="w-10 h-10 mb-4 opacity-20" />
            <p>Select a conversation to view</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatPanel({ phone }) {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const fetchHistory = useCallback(
    async (silent = false) => {
      try {
        if (!silent) setLoading(true);
        const res = await getChatHistory(phone);
        setHistory(res);
      } catch (err) {
        if (!silent) setError(err);
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [phone],
  );

  useEffect(() => {
    fetchHistory();
    // Poll every 5 seconds for new inbound chat messages
    const interval = setInterval(() => fetchHistory(true), 5000);
    return () => clearInterval(interval);
  }, [fetchHistory]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || sending) return;
    setSending(true);
    try {
      await sendMessage(phone, message);
      // Optimistic update
      setHistory((prev) => [
        ...prev,
        {
          type: "outbound",
          status: "SENT",
          content: message,
          timestamp: new Date().toISOString(),
        },
      ]);
      setMessage("");
    } catch (err) {
      alert(err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  if (loading && !history)
    return <LoadingState message="Loading conversation..." />;
  if (error && !history)
    return <ErrorState error={error} onRetry={() => fetchHistory(false)} />;

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b border-border shadow-sm z-10 flex items-center justify-between">
        <h3 className="font-medium text-foreground">{phone}</h3>
        <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full border border-success/20">
          24h Window Active
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
        {history && history.length > 0 ? (
          history.map((msg, i) => {
            const isOutbound = msg.type === "outbound";
            return (
              <div
                key={i}
                className={`flex ${isOutbound ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${isOutbound ? "bg-brand-orange text-white rounded-br-none" : "bg-muted text-foreground border border-border rounded-bl-none"}`}
                >
                  <p className="text-sm">{msg.content || msg.text}</p>
                  <div
                    className={`text-[10px] mt-1 text-right ${isOutbound ? "text-white/80" : "text-muted-foreground"}`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {isOutbound && msg.status && (
                      <span className="ml-2">• {msg.status}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-sm text-muted-foreground mt-10">
            No messages yet.
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-card">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-muted/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={sending || !message.trim()}
            className="p-2 bg-brand-orange text-white rounded-md hover:bg-brand-orange/90 disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
