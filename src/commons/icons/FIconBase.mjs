import React     from 'react'
import PropTypes from 'prop-types'

const FIconBase = props => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    path: {
      fill: props.color,
    },
  }

  const lpaths = typeof props.icon=="string"
                 ? [props.icon]
                 : props.icon

  return (
    <svg
      style={styles.svg}
      width={`${props.size}px`}
      height={`${props.size}px`}
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

FIconBase.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
}

FIconBase.defaultProps = {
  size: 16,
}

export default FIconBase