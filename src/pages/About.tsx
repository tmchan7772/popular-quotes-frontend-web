import { useState } from 'react';

export default function About() {
  const [aboutInfo, setAboutInfo] = useState('Little story about company');

  return (
    <h1>{aboutInfo}</h1>
  );
};