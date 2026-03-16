
import HeroHeader from '../components/HeroHeader'
import ServicesHighlight from '../components/ServicesHighlight'
import ValueProp from '../components/ValueProp'
import CommunitiesGrid from '../components/CommunitiesGrid'
import ContactSection from '../components/ContactSection'

const HomePage = () => {
  return (
    <main>
      <HeroHeader />
      <ServicesHighlight />
      <ValueProp />
      <CommunitiesGrid />
      <ContactSection />
    </main>
  );
};

export default HomePage;
