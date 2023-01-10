import { Container } from '@components'
import { REACT_APP_API_URL } from '@config'
import style from './SteamSignin.module.css'

export default function SteamSignin() {
	return (
		<Container className={style.container} align="center" justify="center">
			<form action={`${REACT_APP_API_URL}/accounts/login/steam/`} method="POST">
				<p>
					Entre com sua conta <b>Steam</b>
				</p>

				<button aria-label="Entrar" type="submit">
					<img
						src="https://community.cloudflare.steamstatic.com/public/images/signinthroughsteam/sits_01.png"
						alt="Entre com sua conta Steam"
					/>
				</button>
			</form>
		</Container>
	)
}
