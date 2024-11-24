

function Card({ children, reverse=false } : { children: React.ReactNode, reverse?: boolean }) {
  return (
    <div className={`card ${reverse && 'reverse'} dark:bg-blue-900` } style={{textAlign: 'center', paddingBottom: '5rem'}}>   
        {children}
    </div>
  )
}

export default Card




