import PropTypes from 'prop-types'

import style from './Container.module.css'

export default function Container(props) {
	const alignStyleMap = {
		center: 'alignCenter',
		start: 'alignStart',
		end: 'alignEnd',
		stretch: 'alignStretch',
	}

	const justifyStyleMap = {
		center: 'justifyCenter',
		start: 'justifyStart',
		end: 'justifyEnd',
		around: 'justifyAround',
		between: 'justifyBetween',
		even: 'justifyEven',
	}

	return (
		<div
			className={[
				props.className,
				style.container,
				props.row && style.row,
				props.column && style.column,
				props.hidden && style[`hidden-${props.hidden}`],
				props.fitContent && style.fitContent,
				style[alignStyleMap[props.align]],
				style[justifyStyleMap[props.justify]],
			].join(' ')}
			style={{ ...props.style, gap: props.gap }}
			onClick={props.onClick}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
			ref={props.reference}
		>
			{props.children}
		</div>
	)
}

Container.propTypes = {
	row: PropTypes.bool,
	column: PropTypes.bool,
	align: PropTypes.oneOf(['center', 'start', 'end', 'stretch']),
	justify: PropTypes.oneOf([
		'center',
		'start',
		'end',
		'around',
		'between',
		'even',
	]),
	gap: PropTypes.number,
	hidden: PropTypes.oneOf(['lg', 'md', 'sm']),
	fitContent: PropTypes.bool,
}

Container.defaultProps = {
	row: true,
	align: 'start',
	justify: 'start',
	gap: 0,
	fitContent: false,
}
