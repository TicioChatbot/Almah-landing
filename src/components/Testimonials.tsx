import user1Img from '../assets/user-joey.png';
import user2Img from '../assets/user-ben.png';
import user3Img from '../assets/user-stu.png';

const Testimonials = () => {
  const reviews = [
    { 
      name: "Joey Wright", 
      company: "Business Inc.", 
      quote: '"This product is so cool and create so much value. I\'m very happy I discovered this and can only recommend them."',
      image: user1Img
    },
    { 
      name: "Ben Sims", 
      company: "Good Company", 
      quote: '"Five stars only experience for me. Love this product."',
      image: user2Img
    },
    { 
      name: "Stu Mackenzie", 
      company: "Gizz Company", 
      quote: '"Once you try this product you will never go back. Lovely to see so many professionals."',
      image: user3Img
    }
  ];

  return (
    <section style={{ backgroundColor: 'var(--white)', padding: '80px 0 120px' }}>
      <div className="container">
        <h2 style={{ 
          fontSize: '44px', 
          textAlign: 'center', 
          marginBottom: '5rem',
          color: '#035135', // Deep Green from screenshot
          fontWeight: 700
        }}>
          Opiniones de nuestros usuarios
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {reviews.map((rev, i) => (
            <div key={i} className="premium-card" style={{ 
              border: '1px solid #E5E7EB', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.5rem',
              borderRadius: '8px',
              padding: '2.5rem',
              backgroundColor: 'var(--white)'
            }}>
              <div style={{ display: 'flex', gap: '4px', color: '#8F7FEE', fontSize: '20px' }}>
                {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
              </div>
              <p style={{ 
                fontSize: '18px', 
                fontWeight: 700, 
                lineHeight: '22px', 
                color: 'var(--text-primary)', 
                flexGrow: 1,
                margin: 0
              }}>
                {rev.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#D9D9D9', overflow: 'hidden' }}>
                  <img src={rev.image} alt={rev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)' }}>{rev.name}</div>
                  <div style={{ color: '#4D4E4C', fontSize: '14px' }}>{rev.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
