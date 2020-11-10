import React from 'react'

import './global-style.css'

import { Editor } from 'react-draft-wysiwyg'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default ({ data, handleChange }) => {
	return (
		<div className="App">
			<Editor initialContentState={data} onContentStateChange={handleChange} />
		</div>
	)
}
