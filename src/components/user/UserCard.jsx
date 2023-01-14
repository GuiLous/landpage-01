import React from 'react'

import style from './UserCard.module.css'

export default function UserCard(props) {
  return (
    <div className={style.container}>
      <p>{props.username}</p>
    </div>
  )
}
