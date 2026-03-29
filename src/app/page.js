import { STEPS } from "@/constants";
import HomeInputScreen from "../components/HomeInputScreen";
import FallbackPreviewPage from "./fallback-preview/page";
import LoadingPreviewPage from "./loading-preview/page";
import ResultsPreviewPage from "./results-preview/page";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(STEPS.HOME);

  return (
    <>
      {step === STEPS.HOME && <HomeInputScreen />}
      {step === STEPS.LOADING && <LoadingPreviewPage />}
      {step === STEPS.FALLBACK && <FallbackPreviewPage />}
      {step === STEPS.RESULTS && <ResultsPreviewPage />}
    </>
  );
}
