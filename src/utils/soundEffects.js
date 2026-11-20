// Sintetizador de efectos de interfaz con la Web Audio API nativa del navegador.
// Todos los sonidos se generan en tiempo real con código propio: no hay archivos de
// audio de terceros, por lo que no existe riesgo de infracción de derechos de autor.

let ctx = null;
let enabled = true;

function getContext() {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ctx) ctx = new AudioCtx();
  // Los navegadores suspenden el audio hasta un gesto del usuario.
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

export function setSoundEnabled(value) {
  enabled = Boolean(value);
}

/** Tono simple con envolvente (ataque rápido, caída exponencial). */
function tone(ac, { freq, type = 'sine', start = 0, duration = 0.15, gain = 0.18, slideTo }) {
  const t0 = ac.currentTime + start;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + duration);
  amp.gain.setValueAtTime(0.0001, t0);
  amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.01);
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(amp).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

/** Ráfaga de ruido filtrado: simula el golpe de un sello de goma. */
function thump(ac, { start = 0, duration = 0.12, gain = 0.35, cutoff = 900 }) {
  const t0 = ac.currentTime + start;
  const length = Math.floor(ac.sampleRate * duration);
  const buffer = ac.createBuffer(1, length, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
  const src = ac.createBufferSource();
  const filter = ac.createBiquadFilter();
  const amp = ac.createGain();
  src.buffer = buffer;
  filter.type = 'lowpass';
  filter.frequency.value = cutoff;
  amp.gain.value = gain;
  src.connect(filter).connect(amp).connect(ac.destination);
  src.start(t0);
}

const SOUNDS = {
  // Clic de tecla / botón.
  click: (ac) => tone(ac, { freq: 1800, type: 'square', duration: 0.03, gain: 0.04 }),
  // Llega un ticket nuevo a la bandeja.
  ticket: (ac) => {
    tone(ac, { freq: 880, duration: 0.12, gain: 0.12 });
    tone(ac, { freq: 1320, start: 0.1, duration: 0.18, gain: 0.1 });
  },
  // Sello de APROBADO (dictamen correcto).
  approve: (ac) => {
    thump(ac, {});
    tone(ac, { freq: 523.25, start: 0.08, duration: 0.14, gain: 0.12 });
    tone(ac, { freq: 783.99, start: 0.18, duration: 0.22, gain: 0.12 });
  },
  // Sello de RECHAZO / infracción detectada (dictamen incorrecto).
  reject: (ac) => {
    thump(ac, { cutoff: 600 });
    tone(ac, { freq: 220, type: 'sawtooth', start: 0.06, duration: 0.3, gain: 0.08, slideTo: 140 });
  },
  // Alerta de KPI crítico.
  alert: (ac) => {
    tone(ac, { freq: 740, type: 'triangle', duration: 0.12, gain: 0.12 });
    tone(ac, { freq: 740, type: 'triangle', start: 0.18, duration: 0.12, gain: 0.12 });
  },
  // Sprint completado / victoria.
  success: (ac) => {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      tone(ac, { freq: f, start: i * 0.1, duration: 0.25, gain: 0.1 }),
    );
  },
  // Game Over.
  gameOver: (ac) => {
    [392, 329.63, 261.63, 196].forEach((f, i) =>
      tone(ac, { freq: f, type: 'triangle', start: i * 0.18, duration: 0.3, gain: 0.12 }),
    );
  },
};

/** Reproduce un efecto por nombre si el sonido está activado. Nunca lanza errores. */
export function playSound(name) {
  if (!enabled) return;
  const fx = SOUNDS[name];
  if (!fx) return;
  try {
    const ac = getContext();
    if (ac) fx(ac);
  } catch {
    // El audio es decorativo: cualquier fallo se ignora para no romper el juego.
  }
}
