"use client";

import { useState } from "react";
import { FiCheckCircle, FiLoader, FiSend } from "react-icons/fi";
import { Button } from "@/components/ui/button";

type ResendState = "idle" | "sending" | "success" | "error";

export function ResendConfirmationButton({
  email,
  nameRole,
  company,
  phone,
  usersPcs,
  hasServer,
  issues,
  message,
  submittedAt,
  language,
}: {
  email: string;
  nameRole: string;
  company: string;
  phone: string;
  usersPcs: string;
  hasServer: string;
  issues: string[];
  message: string;
  submittedAt: string;
  language: string;
}) {
  const [state, setState] = useState<ResendState>("idle");
  const [feedback, setFeedback] = useState("");

  const canSend = email.trim().length > 0;

  const handleResend = async () => {
    if (!canSend || state === "sending") return;
    setState("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/admin/leads/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          nameRole,
          company,
          phone,
          usersPcs,
          hasServer,
          issues,
          message,
          submittedAt,
          language,
        }),
      });

      const result = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Could not resend email.");
      }

      setState("success");
      setFeedback("Confirmation resent.");
      setTimeout(() => setState("idle"), 2200);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not resend email.";
      setState("error");
      setFeedback(message);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={handleResend}
        disabled={!canSend || state === "sending"}
        className="gap-2"
      >
        {state === "sending" ? (
          <>
            <FiLoader className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            {state === "success" ? <FiCheckCircle className="size-4" /> : <FiSend className="size-4" />}
            Resend Email
          </>
        )}
      </Button>

      {feedback ? (
        <p
          className={
            state === "error"
              ? "text-xs text-rose-700 dark:text-rose-300"
              : "text-xs text-emerald-700 dark:text-emerald-300"
          }
        >
          {feedback}
        </p>
      ) : null}
    </div>
  );
}
