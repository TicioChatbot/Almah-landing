
import ContactHero from '../components/ContactHero'
import ContactFormSection from '../components/ContactFormSection'
import ContactHelpSection from '../components/ContactHelpSection'

const ContactPage = () => {
  return (
    <div style={{ backgroundColor: 'var(--white)' }}>
      <ContactHero />
      <ContactFormSection />
      <ContactHelpSection />
    </div>
  );
};

export default ContactPage;
