
import ServicesHero from '../components/ServicesHero'
import ServicesAlternatingList from '../components/ServicesAlternatingList'
import ServicesBottomCTA from '../components/ServicesBottomCTA'

const ServicesPage = () => {
  return (
    <div style={{ backgroundColor: 'var(--white)' }}>
      <ServicesHero />
      <ServicesAlternatingList />
      <ServicesBottomCTA />
    </div>
  );
};

export default ServicesPage;
