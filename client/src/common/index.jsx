import React from 'react'
import { useDispatch } from 'react-redux'
import styled from './style.module.css'
import { TextField } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

export const Title = props => (
	<h1 className={styled.title}>
		{props.title} <span>{props.subTitle}</span>
	</h1>
)

export class Typer extends React.Component {
	state = {
		text: '',
		isDeleting: false,
		loopNum: 0,
		typingSpeed: 200,
		timeOne: null,
		timeTow: null,
	}

	componentDidMount() {
		this.handleType()
	}
	componentWillUnmount() {
		clearTimeout(this.state.timeOne)
		clearTimeout(this.state.timeTow)
	}
	handleType = () => {
		const { dataText } = this.props
		const { isDeleting, loopNum, text, typingSpeed } = this.state
		const i = loopNum % dataText.length
		const fullText = dataText[i]

		this.setState({
			text: isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1),
			typingSpeed: isDeleting ? 30 : 150,
		})

		if (!isDeleting && text === fullText) {
			this.setState({ timeOne: setTimeout(() => this.setState({ isDeleting: true }), 500) })
		} else if (isDeleting && text === '') {
			this.setState({
				isDeleting: false,
				loopNum: loopNum + 1,
			})
		}
		this.setState({ timeTow: setTimeout(this.handleType, typingSpeed) })
	}

	render() {
		return (
			<>
				{this.props.heading}&nbsp;
				<span>{this.state.text}</span>
				<span id={styled.cursor}></span>
			</>
		)
	}
}

const filter = createFilterOptions()

export const Search = ({ suggestLists, handleChange }) => {
	const [value, setValue] = React.useState(null)
	const dispatch = useDispatch()
	return (
		<Autocomplete
			value={value}
			onChange={(event, newValue) => {
				if (typeof newValue === 'string') {
					setValue({
						title: newValue,
					})
				} else if (newValue && newValue.inputValue) {
					// Create a new value from the user input

					setValue({
						title: newValue.inputValue,
					})
				} else {
					setValue(newValue)
				}
			}}
			filterOptions={(options, params) => {
				const filtered = filter(options, params)

				// Suggest the creation of a new value
				if (params.inputValue !== '') {
					filtered.push({
						inputValue: params.inputValue,
						title: `Add "${params.inputValue}"`,
					})
				}

				return filtered
			}}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			id="free-solo-with-text-demo"
			options={suggestLists}
			getOptionLabel={option => {
				// Value selected with enter, right from the input
				if (typeof option === 'string') {
					return option
				}
				// Add "xxx" option created dynamically
				if (option.inputValue) {
					return option.inputValue
				}
				// Regular option
				return option.title
			}}
			renderOption={option => option.title}
			style={{ width: 500 }}
			freeSolo
			includeInputInList={true}
			renderInput={params => (
				<TextField
					{...params}
					label="Search Here"
					placeholder="Search..."
					variant="outlined"
					onChange={event => dispatch(handleChange(event.target.value))}
					onKeyPress={event => dispatch(handleChange(event.target.value))}
				/>
			)}
		/>
	)
}