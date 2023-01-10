import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Container } from '@components'

import style from './Home.module.css'

export default function HomeView() {
	const user = useSelector((state) => state.user)
	const navigate = useNavigate()

	useEffect(() => {
		if (user && user.account && user.account.is_verified) navigate('/jogar')
	})

	return (
		<Container
			align="center"
			justify="center"
			className={style.container}
		></Container>
	)
}
