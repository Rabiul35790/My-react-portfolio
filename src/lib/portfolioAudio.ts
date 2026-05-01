let portfolioAudio: HTMLAudioElement | null = null;
let bootstrapped = false;

export function getPortfolioAudio() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!portfolioAudio) {
    portfolioAudio = new Audio("/music/portfolio.weba");
    portfolioAudio.loop = true;
    portfolioAudio.preload = "auto";
    portfolioAudio.volume = 0.85;
  }

  return portfolioAudio;
}

export function tryPlayPortfolioAudio() {
  const audio = getPortfolioAudio();
  if (!audio) {
    return;
  }

  void audio.play().catch(() => {});
}

export function bootstrapPortfolioAutoplay() {
  const audio = getPortfolioAudio();
  if (!audio || bootstrapped) {
    return;
  }

  bootstrapped = true;
  const originalVolume = audio.volume;
  audio.muted = true;

  void audio.play()
    .then(() => {
      window.setTimeout(() => {
        audio.muted = false;
        audio.volume = originalVolume;
      }, 220);
    })
    .catch(() => {
      audio.muted = false;
    });
}
