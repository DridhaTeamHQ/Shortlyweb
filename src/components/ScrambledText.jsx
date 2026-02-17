import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

import './ScrambledText.css';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const ScrambledText = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const split = SplitText.create(rootRef.current.querySelector('p'), {
      type: 'words, chars',
      charsClass: 'char',
      wordsClass: 'word'
    });
    charsRef.current = split.chars;

    // Keep words together — prevent mid-word line breaks
    split.words.forEach(w => {
      w.style.whiteSpace = 'nowrap';
      w.style.display = 'inline-block';
    });

    charsRef.current.forEach(c => {
      gsap.set(c, {
        display: 'inline-block',
        attr: { 'data-content': c.innerHTML }
      });
    });

    // Throttle to reduce performance impact
    let rafId = null;
    const handleMove = e => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        charsRef.current.forEach(c => {
          const { left, top, width, height } = c.getBoundingClientRect();
          const dx = e.clientX - (left + width / 2);
          const dy = e.clientY - (top + height / 2);
          const dist = Math.hypot(dx, dy);

          if (dist < radius) {
            gsap.to(c, {
              overwrite: true,
              duration: duration * (1 - dist / radius),
              scrambleText: {
                text: c.dataset.content || '',
                chars: scrambleChars,
                speed
              },
              ease: 'none'
            });
          }
        });
        rafId = null;
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener('pointermove', handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;

