import React from 'react'
import { useSelector } from 'react-redux'

import { ToastItem } from '@components'
import style from './ToastList.module.css'

export default function ToastList() {
	const toasts = useSelector((state) => state.toasts)

	const renderToasts = toasts.map((toast) => (
		<div className={style.wrapper} key={toast.id}>
			<ToastItem {...toast} />
		</div>
	))

	return (
		toasts.length > 0 && <div className={style.container}>{renderToasts}</div>
	)
}
