export const smoothScroll = (target, duration = 1000) => {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;

  const startPosition = window.pageYOffset;
  const targetPosition = targetElement.getBoundingClientRect().top + startPosition - 80; // 80px offset for header
  const distance = targetPosition - startPosition;
  let startTime = null;

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animateScroll);
  };

  requestAnimationFrame(animateScroll);
};

// GSAP smooth scroll (requires ScrollToPlugin)
export const gsapSmoothScroll = async (target) => {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;

  try {
    const { gsap } = await import('gsap');
    const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
    gsap.registerPlugin(ScrollToPlugin);

    gsap.to(window, {
      duration: 1,
      ease: 'power2.inOut',
      scrollTo: {
        y: targetElement,
        offsetY: 96,
      },
    });
  } catch {
    // Fallback if plugin import fails for any reason
    smoothScroll(target, 800);
  }
};
