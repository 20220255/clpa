

function Card({ children, reverse = false }: { children: React.ReactNode, reverse?: boolean }) {
  return (
    <div className={`card ${reverse ? 'reverse' : ''} dark:bg-blue-900/40 animate-fadeIn`} style={{ textAlign: 'center', paddingBottom: '5rem' }}>
      {children}
    </div>
  )
}

export default Card
