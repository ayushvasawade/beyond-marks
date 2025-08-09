"use client";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") || "/dashboard";
  return <SignIn afterSignInUrl={redirectUrl} afterSignUpUrl={redirectUrl} />;
}
