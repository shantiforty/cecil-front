'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="landing-container">
      <div className="landing-box">
        <h1 className="landing-title"> Welcome to Project Cecil</h1>

        <div className="landing-buttons">
          <button
            className="landing-button"
            onClick={() => router.push('/membership')}
          >
            Add new Member
          </button>
          <button
            className="landing-button"
            onClick={() => router.push('/membersList')}
          >
            View Members
          </button>
        </div>
      </div>
    </main>
  );
}
