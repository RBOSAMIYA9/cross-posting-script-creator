"use client";

import { useState } from "react";
import { STEPS } from "@/constants";
import HomeInputScreen from "../components/HomeInputScreen";
import LoadingScreen from "../components/LoadingScreen";
import TranscriptFallbackScreen from "../components/TranscriptFallbackScreen";
import ResultsDashboardScreen from "../components/ResultsDashboardScreen";

export default function Home() {
  const [step, setStep] = useState(STEPS.HOME);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scriptsData, setScriptsData] = useState(null);
  const [sourceUrl, setSourceUrl] = useState("");

  const handleGenerateScripts = async (url) => {
    setErrorMessage("");
    setIsSubmitting(true);
    setSourceUrl(url);
    setStep(STEPS.LOADING);

    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate scripts");
      }

      setScriptsData(data.data || null);
      setStep(STEPS.RESULTS);
    } catch (error) {
      const message = error?.message || "An error occurred. Please try again.";
      const isTranscriptIssue = /transcript|caption|subtitles|extract/i.test(
        message,
      );

      setErrorMessage(message);
      setStep(isTranscriptIssue ? STEPS.FALLBACK : STEPS.HOME);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegenerate = () => {
    setStep(STEPS.HOME);
    setErrorMessage("");
  };

  return (
    <>
      {step === STEPS.HOME && (
        <HomeInputScreen
          onGenerateScripts={handleGenerateScripts}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      )}
      {step === STEPS.LOADING && <LoadingScreen />}
      {step === STEPS.FALLBACK && <TranscriptFallbackScreen />}
      {step === STEPS.RESULTS && (
        <ResultsDashboardScreen
          scriptsData={scriptsData}
          sourceUrl={sourceUrl}
          onRegenerate={handleRegenerate}
        />
      )}
    </>
  );
}
