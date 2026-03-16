import nicolasImg from '../assets/team-nicolas.png';
import jacoboImg from '../assets/team-jacobo.png';
import juanImg from '../assets/team-juan.png';
import shirlyImg from '../assets/team-shirly.png';

const AboutTeam = () => {
  const team = [
    { 
      name: "Nicolás Lozada", 
      role: "CEO",
      image: nicolasImg 
    },
    { 
      name: "Jacobo Gomez", 
      role: "Director de tecnología e innovación",
      image: jacoboImg
    },
    { 
      name: "Juan Camilo Girón", 
      role: "Coordinador jurídico",
      image: juanImg
    },
    { 
      name: "Shirlei Plaza", 
      role: "CAO",
      image: shirlyImg
    }
  ];

  return (
    <section style={{ padding: '80px 0', textAlign: 'center' }}>
      <div className="container">
        <h2 style={{ 
          fontSize: '32px', 
          color: 'var(--mint-green)', 
          fontWeight: 700, 
          marginBottom: '1rem' 
        }}>
          Equipo Almah
        </h2>
        <p style={{ fontSize: '18px', color: '#1A1A1A', marginBottom: '4rem' }}>
          Presentamos a las personas que hay detrás de Almah
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '2.5rem' 
        }}>
          {team.map((member, i) => (
            <div key={i} style={{ textAlign: 'left' }}>
              <div style={{ 
                width: '100%', 
                aspectRatio: '3/4', 
                borderRadius: '8px', 
                overflow: 'hidden',
                marginBottom: '1.5rem',
                backgroundColor: '#ddd'
              }}>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '0.5rem', color: '#1A1A1A' }}>
                {member.name}
              </h3>
              <p style={{ fontSize: '16px', color: '#4B5563', fontWeight: 500 }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
