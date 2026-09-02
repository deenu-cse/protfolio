'use client';

import React, { useEffect, useState } from 'react';
import { RefreshCw, ExternalLink, ShieldAlert, ArrowRight } from 'lucide-react';

const TARGET_URL = 'https://protfolio-a9vv.vercel.app';
const INITIAL_COUNTDOWN = 5;

export default function DomainRedirectModal() {
  const [shouldShow, setShouldShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_COUNTDOWN);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hostname = window.location.hostname.toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);
    const forceRedirect = searchParams.get('redirect') === 'true';

    // Show popup if domain matches drnaresh.in or URL has ?redirect=true
    if (hostname.includes('drnaresh.in') || forceRedirect) {
      setShouldShow(true);
    }
  }, []);

  useEffect(() => {
    if (!shouldShow) return;

    if (timeLeft <= 0) {
      window.location.href = TARGET_URL;
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [shouldShow, timeLeft]);

  const handleRedirectNow = () => {
    window.location.href = TARGET_URL;
  };

  if (!shouldShow) return null;

  const progressPercent = ((INITIAL_COUNTDOWN - timeLeft) / INITIAL_COUNTDOWN) * 100;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md overflow-hidden bg-neutral-900/95 border border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-neutral-100 text-center">
        {/* Animated Progress Bar at Top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-neutral-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Header Icon */}
        <div className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-inner">
          <RefreshCw className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
          Domain Under Renewal
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-neutral-300 mb-5 leading-relaxed">
          The domain <span className="font-semibold text-amber-400 underline decoration-amber-500/40">drnaresh.in</span> is currently undergoing temporary renewal.
        </p>

        {/* Alert box */}
        <div className="mb-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-left flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-neutral-300">
            Redirecting you to our official active site in{' '}
            <span className="font-bold text-amber-400 text-base">{timeLeft}</span> seconds...
          </div>
        </div>

        {/* Target URL Badge */}
        <div className="mb-6 px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs font-mono text-neutral-400 flex items-center justify-between gap-2 overflow-hidden">
          <span className="truncate">{TARGET_URL}</span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleRedirectNow}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-neutral-950 font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Redirect Now</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
