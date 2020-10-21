import {  HANDLE_MENU, INCREMENT_STEP, DECREMENT_STEP, DYNAMIC_ACTIVE_STEP, HANDLE_MODAL } from '../constants/type'

// Page Scroll Progress


// Menu Toggle
export const handleMenu = () => {
	return dispatch => {
		dispatch({
			type: HANDLE_MENU,
		})
	}
}

// Navbar Circuler Animation
export const handleNavAnimationBar = () => {
	let circuler = document.getElementById('navCirculer')
	let count = 0
	setInterval(() => {
		count++
		circuler.childNodes.forEach((span, ind) => {
			if (circuler.childNodes.length + 1 === count) {
				count = 1
			}
			if (ind + 1 === count) {
				span.style.background = '#ffc107'
				span.style.transform = 'scale(1.2)'
				span.style.transition = 'all 0.75s'
			} else {
				span.style.transform = 'scale(1)'
				span.style.transition = 'all 0.75s'
				span.style.background = 'none'
			}
		})
	}, 1000)
}

// Slider Animation
export const drawShape = ctx => {
	ctx.beginPath()

	for (let i = 0; i < 22; i++) {
		const angle = 0.35 * i
		const x = (0.2 + 1.5 * angle) * Math.cos(angle)
		const y = (0.2 + 1.5 * angle) * Math.sin(angle)
		ctx.lineTo(x, y)
	}
	ctx.stroke()
	ctx.closePath()
}

// Skills Steps
export const stepHandleClick = type => {
	return dispatch => {
		if (type === 'increment') {
			dispatch({
				type: INCREMENT_STEP,
			})
		} else if (type === 'decrement') {
			dispatch({
				type: DECREMENT_STEP,
			})
		} else {
			dispatch({
				type: DYNAMIC_ACTIVE_STEP,
				payload: type,
			})
		}
	}
}
// Click One Skill Item To Handle Modal
export const handleModal = index => {
	return dispatch => {
		dispatch({
			type: HANDLE_MODAL,
			payload: index,
		})
	}
}
