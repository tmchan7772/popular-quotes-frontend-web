import { useEffect, useState } from 'react';
import { getAbout } from '../services/about';

export default function About() {
  const [aboutInfo, setAboutInfo] = useState('Little story about company');

  useEffect(() => {
    getAbout().then(response => {
      setAboutInfo(response.data.info);
    });
  }, []);

  const aboutHtml = () => ({__html: aboutInfo });

  return (
    <>
      {aboutInfo && <div dangerouslySetInnerHTML={aboutHtml()}></div> }
      {!aboutInfo && <div>Loading...</div> }
    </>
  );
};