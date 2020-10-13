import Gist from 'editorjs-github-gist-plugin'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import CodeBox from '@bomdi/codebox'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import SimpleImageEditor from 'simple-image-editorjs'
import Alert from 'editorjs-alert'
import Paragraph from 'editorjs-paragraph-with-alignment'
import SocialPost from 'editorjs-social-post-plugin'

export const EDITOR_JS_TOOLS = {
	paragraph: {
		class: Paragraph,
		inlineToolbar: true,
	},
	gist: Gist,
	socialPost: SocialPost,
	embed: Embed,
	table: Table,
	marker: Marker,
	list: List,
	warning: Warning,
	code: Code,
	codeBox: {
		class: CodeBox,
		config: {
			themeURL: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css',
			themeName: 'atom-one-dark',
			useDefaultTheme: 'light',
		},
	},
	linkTool: LinkTool,
	image: Image,
	imageSimple: SimpleImageEditor,
	raw: Raw,
	header: Header,
	quote: Quote,
	checklist: CheckList,
	delimiter: Delimiter,
	inlineCode: InlineCode,
	simpleImage: SimpleImage,
	alert: Alert,
}
