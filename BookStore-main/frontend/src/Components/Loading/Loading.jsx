import React from 'react'
import { CirclesWithBar } from 'react-loader-spinner'

export default function Loading() {
  return (
    
    <div className='h-lvh flex items-center justify-center'>
<CirclesWithBar
  height="100"
  width="100"
  color="#fa9a5b"
  outerCircleColor="#fa9a5b"
  innerCircleColor="#fa9a5b"
  barColor="#fa9a5b"
  ariaLabel="circles-with-bar-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </div>
  )
}
