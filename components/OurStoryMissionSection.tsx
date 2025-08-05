import React from 'react';

export default function OurStoryMissionSection() {
  return (
    <section
      className="w-full flex justify-center py-12 px-2"
      aria-labelledby="our-story-mission-heading"
    >
      <div
        className="relative w-full max-w-4xl flex flex-col items-center px-4 py-10"
        style={{
          background: 'linear-gradient(135deg, var(--lemonade-1) 80%, var(--lemonade-2) 100%)',
          border: '4px solid var(--lemonade-4)',
          borderRadius: '120px 120px 100px 100px / 90px 90px 120px 120px',
          boxShadow: '0 12px 40px 0 rgba(60, 120, 180, 0.10), 0 2px 8px 0 rgba(0,0,0,0.04)',
          clipPath: 'ellipse(90% 100% at 50% 50%)',
        }}
        role="presentation"
        aria-label="Cloud-shaped section"
      >
        {/* Heading */}
        <h2
          id="our-story-mission-heading"
          className="text-2xl md:text-3xl font-bold mb-4 text-center"
          style={{
            fontSize: '1.5rem',
            color: 'var(--lemonade-5)', // accent color for heading
            textShadow: '0 2px 8px rgba(255,255,255,0.18)',
          }}
        >
          More Than Just a Platform.{' '}
          <span style={{ color: 'var(--lemonade-4)' }}>We're Learners Too.</span>
        </h2>
        {/* Narrative */}
        <div
          className="space-y-4 text-base md:text-lg text-center max-w-2xl"
          style={{ fontSize: '1.125rem', color: 'var(--lemonade-5)' }}
        >
          <p>
             Like you, we were once frustrated by the traditional ways of learning to code. Lost in endless tutorials, we yearned for a more
           supportive, adaptive, and joyful experience. That's why we built
           BeyondMarks – a platform driven by the belief that everyone can unlock their potential with the right guidance.
          </p>
          <p>
            Our mission is simple: to create learning that truly cares. Through personalized paths, adaptive challenges and a supportive community we're here to help you go beyond just marks and start building your future with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
