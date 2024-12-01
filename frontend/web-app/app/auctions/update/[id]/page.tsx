import React from 'react'

export default function Update({params} : {params:{id:string}}) {
  return (
    <div>Detail for {params.id}</div>
  )
}
