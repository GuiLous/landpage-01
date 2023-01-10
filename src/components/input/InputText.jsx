import { Container } from '@components'
import style from './InputText.module.css'

export default function InputText(props) {
	const handleChange = (event) => {
		event.preventDefault()
		props.onChange(event.target.value)
	}

	return (
		<Container justify="center" align="stretch" className={style.container}>
			<input
				onChange={handleChange}
				type={props.type}
				name={props.name}
				disabled={props.disabled}
				placeholder={props.placeholder}
			/>
		</Container>
	)
}
