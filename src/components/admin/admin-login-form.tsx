"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiLock, FiLogIn } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SubmitState = "idle" | "submitting" | "error";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedNextPath = searchParams.get("next");
  const nextPath =
    requestedNextPath && requestedNextPath.startsWith("/admin")
      ? requestedNextPath
      : "/admin/settings";

  const [password, setPassword] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error("Invalid login");
      }

      router.replace(nextPath);
      router.refresh();
    } catch {
      setState("error");
      setErrorMessage("Invalid password. Please try again.");
    } finally {
      setState("idle");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-12">
      <Card className="w-full border-slate-200/80 bg-white/80 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2 text-xl">
            <FiLock className="size-5 text-cyan-700 dark:text-cyan-300" />
            Admin Access
          </CardTitle>
          <CardDescription>
            Sign in to manage site configuration and website behavior.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="grid gap-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {errorMessage ? (
              <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                {errorMessage}
              </p>
            ) : null}

            <Button type="submit" className="w-full gap-2" disabled={state === "submitting"}>
              <FiLogIn className="size-4" />
              {state === "submitting" ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
