import { HANDLE_MENU, INCREMENT_STEP, DECREMENT_STEP, DYNAMIC_ACTIVE_STEP, HANDLE_MODAL } from '../constants/type'

const { webAndapps, programming, tools } = {
	webAndapps: [
		{
			progress: '90%',
			src: 'icons/nodejs1.svg',
			title: 'Node Js',
			text:
				'Node js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.Node js is designed to build scalable network applications as well as for real-time Web applications, real-time communication programs and browser games.',
			url: 'https://nodejs.org/',
		},
		{
			progress: '85%',
			src: 'icons/expressjs.svg',
			title: 'Express Js',
			text:
				'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
			url: 'https://expressjs.com/',
		},
		{
			progress: '85%',
			src: 'icons/react-native.svg',
			title: 'React Js',
			text:
				'React is a JavaScript library for building user interfaces or UI components.React can be used as a base in the development of single-page or mobile applications.',
			url: 'https://reactjs.org/',
		},
		{
			progress: '85%',
			src: 'icons/react-native1.svg',
			title: 'React Native',
			text:
				'React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.Use a little—or a lot. You can use React Native today in your existing Android and iOS projects or you can create a whole new app from scratch.',
			url: 'https://reactnative.dev/',
		},
		{
			progress: '80%',
			src: 'icons/redux.svg',
			title: 'Redux',
			text:
				'Redux is a predictable state container for JavaScript apps.It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.',
			url: 'https://redux.js.org',
		},
		{
			progress: '85%',
			src: 'icons/mongodb.svg',
			title: 'MongoDB',
			text:
				'MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.MongoDB is a document database, which means it stores data in JSON-like documents. We believe this is the most natural way to think about data, and is much more expressive and powerful than the traditional row/column model.',
			url: 'https://www.mongodb.com',
		},
		{
			progress: '85%',
			src: 'icons/material-ui.svg',
			title: 'Material UI',
			text: "Material-UI is a open source react framework.It\n's use React components for faster and easier web development.",
			url: 'https://material-ui.com',
		},
		{
			progress: '95%',
			src: 'icons/bootstrap.svg',
			title: 'Bootstrap',
			text:
				'Bootstrap is a CSS freamework for Quickly design and customize responsive mobile-first sites, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.',
			url: 'https://getbootstrap.com',
		},
	],
	programming: [
		{
			progress: '90%',
			src: 'icons/javascript.svg',
			title: 'Javascript',
			text:
				'JavaScript is a scripting or programming language that allows you to implement complex features on web pages — every time a web page does more than just sit there and display static information for you to look at — displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc.',
			url: 'https://javascript.info',
		},
		{
			progress: '55%',
			src: 'icons/python.svg',
			title: 'Python',
			text:
				'Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.Python simple, easy to learn syntax emphasizes readability and therefore reduces the cost of program maintenance. Python supports modules and packages, which encourages program modularity and code reuse.',
			url: 'https://www.python.org',
		},
		{
			progress: '65%',
			src: 'icons/php.svg',
			title: 'PHP',
			text:
				'PHP (recursive acronym for PHP: Hypertext Preprocessor ) is a widely-used open source general-purpose scripting language that is especially suited for web development and can be embedded into HTML.',
			url: 'https://www.php.net/',
		},
	],
	tools: [
		{
			progress: '80%',
			src: 'icons/git.svg',
			title: 'Git',
			text:
				'Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.',
			url: 'https://git-scm.com/',
		},
		{
			progress: '95%',
			src: 'icons/github.svg',
			title: 'Github',
			text:
				'GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.',
			url: 'https://github.com/',
		},
		{
			progress: '90%',
			src: 'icons/figma.svg',
			title: 'Figma',
			text: 'Build better products as a team. Design, prototype, and gather feedback all in one place with Figma.',
			url: 'https://www.figma.com/',
		},
	],
}
const navItems = [
	{
		name: 'Home',
		path: '/',
	},
	{
		name: 'About',
		path: '/about',
	},
	{
		name: 'Skills',
		path: '/skills',
	},
	{
		name: 'Portfolio',
		path: '/portfolio',
	},
	{
		name: 'Services',
		path: '/services',
	},
	{
		name: 'Blogs',
		path: '/blogs',
	},
	{
		name: 'Contact Me',
		path: '/contact',
	},
]

const initialState = {
	isLoading: false,
	isOpenMenu: false,
	navItems,
	skills: {
		activeStep: 3,
		steps: ['Tools', 'Programming', 'Web & Apps', 'All'],
		skillList: [[...tools], [...programming], [...webAndapps], [...webAndapps, ...programming, ...tools]],
		isOpenModal: false,
		index: null,
	},
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case HANDLE_MENU:
			state = {
				...state,
				isOpenMenu: !state.isOpenMenu,
			}
			return state
		case INCREMENT_STEP:
			state = {
				...state,
				skills: {
					...state.skills,
					activeStep: state.skills.activeStep + 1,
				},
			}
			return state
		case DECREMENT_STEP:
			state = {
				...state,
				skills: {
					...state.skills,
					activeStep: state.skills.activeStep - 1,
				},
			}
			return state
		case DYNAMIC_ACTIVE_STEP:
			state = {
				...state,
				skills: {
					...state.skills,
					activeStep: action.payload,
				},
			}
			return state
		case HANDLE_MODAL:
			state = {
				...state,
				skills: {
					...state.skills,
					isOpenModal: !state.skills.isOpenModal,
					index: action.payload,
				},
			}
			return state
		default:
			return state
	}
}

export default reducer
