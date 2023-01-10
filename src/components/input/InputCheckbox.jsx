import { useState } from 'react'

import { Container } from '@components'

import style from './InputCheckbox.module.css'

export default function InputCheckbox(props) {
	const [checked, setChecked] = useState(props.isChecked || false)

	const handleChange = () => {
		props.onChange(!checked)
		setChecked(!checked)
	}

	return (
		<Container>
			<input
				className={style.checkbox}
				onChange={handleChange}
				type="checkbox"
				checked={checked}
				name={props.name}
				id={props.name}
			/>

			<label
				htmlFor={props.name}
				className={[style.label, props.labelClass].join(' ')}
			>
				{props.children}
			</label>
		</Container>
	)
}
