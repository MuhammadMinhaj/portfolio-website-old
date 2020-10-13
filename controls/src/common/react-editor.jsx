import React from 'react'
import EditorJs from 'react-editor-js'
import { Paper, CardContent } from '@material-ui/core'
import { EDITOR_JS_TOOLS } from './constants.js'
import './global-style.css'
const ReactEditor = ({ data, handleChange }) => {
	return (
		<Paper variant="outlined">
			<CardContent>
				<EditorJs holder="mainEditorContent" data={data} tools={EDITOR_JS_TOOLS} onChange={handleChange}></EditorJs>
				<div id="mainEditorContent"></div>
			</CardContent>
		</Paper>
	)
}

export default ReactEditor
