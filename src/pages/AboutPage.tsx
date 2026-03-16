
import AboutHero from '../components/AboutHero'
import AboutHistory from '../components/AboutHistory'
import AboutTeam from '../components/AboutTeam'
import AboutBottomCTA from '../components/AboutBottomCTA'

const AboutPage = () => {
  return (
    <div style={{ backgroundColor: 'var(--white)' }}>
      <AboutHero />
      <AboutHistory />
      <AboutTeam />
      <AboutBottomCTA />
    </div>
  );
};

export default AboutPage;
