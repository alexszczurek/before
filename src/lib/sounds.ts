/**
 * Subtle UI sounds via Web Audio API.
 * No external files — synthesised at runtime.
 * Respects prefers-reduced-motion as a proxy for reduced audio.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;

  // Respect reduced-motion as audio preference proxy
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  if (!ctx) {
    ctx = new AudioContext();
  }
  return ctx;
}

/**
 * Soft click — short sine blip for navigation / selection.
 * ~30ms, very quiet, high-pitched tick.
 */
export function playClick() {
  const ac = getCtx();
  if (!ac) return;

  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1800, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ac.currentTime + 0.03);

  gain.gain.setValueAtTime(0.08, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.04);
}

/**
 * Confirmation pop — two-tone rising blip for success states.
 * ~80ms, subtle.
 */
export function playPop() {
  const ac = getCtx();
  if (!ac) return;

  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(600, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1400, ac.currentTime + 0.06);

  gain.gain.setValueAtTime(0.1, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + 0.08);
}
