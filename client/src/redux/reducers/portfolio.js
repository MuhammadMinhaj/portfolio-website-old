import {
	HANDLE_ITEM_MODAL,
	HANDLE_TAB_CLICK,
	HANDLE_PAGINATION,
	MODAL_PAGE_INCREMENT_AND_DECREMENT,
	HANDLE_PORTFOLIO_SEARCH,
} from '../constants/type'

const initalState = {
	isOpenModal: false,
	modalItem: {},
	correntTab: 0,
	exactPage: 1,
	itemPerPage: 6,
	avoidPage: 0,
	correntModalPage: 1,
	searchTerms: '',
	wrappers: [
		{
			name: 'E-Commerce Websites',
			items: [
				{
					title: 'Chaldal Website1',

					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website1',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website1',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website1',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website3',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website4',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website6',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website5',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website7',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website8',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website9',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Shop Website10',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Evaly Website11',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website12',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Shop Website13',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Evaly Website14',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website15',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Shop Website16',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Evaly Website17',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Chaldal Website18',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Shop Website19',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
				{
					title: 'Evaly Website20',
					img: 'portfolio/websiteimg.png',
					pages: [
						{
							img: 'portfolio/websiteimg.png',
							title: 'Home Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'About Page',
						},
						{
							img: 'portfolio/websiteimg.png',
							title: 'Contact Page',
						},
					],
				},
			],
		},
		{
			name: 'Wo-Commerce Websites',
			items: [
				{
					title: 'Amazon Website',
					img: 'portfolio/websiteimg.png',
				},
				{
					title: 'Alibaba Website',
					img: 'portfolio/websiteimg.png',
				},
				{
					title: 'Ali Express Website',
					img: 'portfolio/websiteimg.png',
				},
				{
					title: 'Amazon Website',
					img: 'portfolio/websiteimg.png',
				},
				{
					title: 'Alibaba Website',
					img: 'portfolio/websiteimg.png',
				},
				{
					title: 'Ali Express Website',
					img: 'portfolio/websiteimg.png',
				},
				{
					title: 'Ali Express Website',
					img: 'portfolio/websiteimg.png',
				},
			],
		},
		{
			name: 'Educational Websites',
			items: [
				{
					title: 'JASA Website',
					img: 'portfolio/websiteimg.png',
				},
				{
					title: 'BUET Website',
					img: 'portfolio/websiteimg.png',
				},
				{
					title: 'CTG COLLEGAE Website',
					img: 'portfolio/websiteimg.png',
				},
			],
		},
		{
			name: 'Others',
			items: [
				{
					title: 'Affiliate For Website',
					img: 'portfolio/websiteimg.png',
				},
				{
					title: 'Android Application Website',
					img: 'portfolio/websiteimg.png',
				},
				{
					title: 'Magazine Website',
					img: 'portfolio/websiteimg.png',
				},
			],
		},
	],
}

const reducer = (state = initalState, action) => {
	switch (action.type) {
		case HANDLE_ITEM_MODAL:
			state = {
				...state,
				isOpenModal: !state.isOpenModal,
				modalItem: { ...action.payload },
				correntModalPage: 1,
			}
			return state
		case HANDLE_TAB_CLICK:
			state = {
				...state,
				correntTab: action.payload,
				exactPage: 1,
				itemPerPage: 6,
				avoidPage: 0,
			}
			return state
		case HANDLE_PAGINATION:
			state = {
				...state,
				exactPage: action.payload,
				avoidPage: action.payload * state.itemPerPage - state.itemPerPage,
			}
			return state
		case MODAL_PAGE_INCREMENT_AND_DECREMENT:
			state = {
				...state,
				correntModalPage: action.payload,
			}
			return state
		case HANDLE_PORTFOLIO_SEARCH:
			state = {
				...state,
				searchTerms: action.payload,
			}
			return state
		default:
			return state
	}
}

export default reducer

// const wrappers = [
// 	{
// 		name: 'Somthing',
// 		items: [{ name: 'item1' }, { name: 'item2' }, { name: 'item3' }],
// 	},
// ]
