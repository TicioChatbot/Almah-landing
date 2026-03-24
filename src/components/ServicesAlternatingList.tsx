import service1Img from '../assets/service-communities.png';
import service2Img from '../assets/service-docs.png';
import service3Img from '../assets/service-chatbot.png';
import service4Img from '../assets/service-ai-tools.png';

const ServicesAlternatingList = () => {
  const items = [
    {
      title: "Comunidades profesionales especializadas",
      description: "Espacios de colaboración diseñados para tu área de práctica, donde compartes conocimiento y expandes tu red de contactos de alto nivel.",
      image: service1Img
    },
    {
      title: "Explorador y vista de documentos",
      description: "Organiza, busca y visualiza toda tu documentación en un solo lugar con herramientas avanzadas de gestión documental asistida por IA.",
      image: service2Img
    },
    {
      title: "Chatbot con citas y referencia directa",
      description: "Consulta información legal compleja y obtén respuestas precisas con referencias directas a fuentes oficiales y normativas.",
      image: service3Img
    },
    {
      title: "Herramientas de IA enfocadas por nicho",
      description: "Soluciones de inteligencia artificial específicamente entrenadas para los desafíos únicos de cada especialidad jurídica.",
      image: service4Img
    }
  ];

  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container">
        {items.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i} style={{ 
              display: 'flex', 
              flexDirection: isEven ? 'row' : 'row-reverse', 
              alignItems: 'center', 
              gap: '6rem',
              marginBottom: '100px'
            }}>
              {/* Text Side */}
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '1.5rem', color: '#1A1A1A' }}>
                  {item.title}
                </h2>
                <p style={{ fontSize: '18px', color: '#4B5563', lineHeight: '1.6', maxWidth: '450px' }}>
                  {item.description}
                </p>
              </div>
              
              {/* Image Side */}
              <div style={{ 
                flex: 1.2, 
                aspectRatio: '16/10', 
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                backgroundColor: '#F9FAFB', // Light gray background to fill empty space
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ 
                    maxWidth: i === 1 ? '90%' : '100%', // Slight padding for the repository UI
                    maxHeight: '90%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain' 
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesAlternatingList;
