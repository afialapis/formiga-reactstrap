import React     from 'react'

const FIconBase = ({icon, size= 16, color}) => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    path: {
      fill: color,
    },
  }

  const lpaths = typeof icon=="string"
                 ? [icon]
                 : icon

  return (
    <svg
      style={styles.svg}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 1024 1024"
    >
      {lpaths.map((p, i) => 
        <path key={i}
              style={styles.path}
              d={p}/>
      )}
    </svg>
  )
}

export default FIconBase