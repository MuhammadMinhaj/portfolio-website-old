import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CssBaseline, Divider, Typography, useMediaQuery } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

import { AppAndDrawer, useStyles, SearchContents } from './index'

import { handleDrawerMobile, handleSearchQuery } from '../../redux/actions/blog'

const BlogsContent = () => {
	const state = useSelector(state => state.blog)
	const dispatch = useDispatch()
	const classes = useStyles()
	const isMatchedWidth = useMediaQuery('(min-width:576px)')
	const { groupid, postid } = useParams()

	useEffect(() => {
		if (groupid && postid) {
			const queryString = postid.replace(/-/g, ' ')
			dispatch(handleSearchQuery(groupid, queryString))
		}
	}, [groupid, postid, dispatch])

	useEffect(() => {
		dispatch(handleDrawerMobile(isMatchedWidth))
	}, [isMatchedWidth, dispatch])

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppAndDrawer />
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: state.isOpneDrawer,
				})}
			>
				<div className={classes.drawerHeader} />
				{state.isLoading ? (
					<>
						<Skeleton variant="rect" height="15%" />
						<br />
						<Skeleton variant="rect" height="70%" />
					</>
				) : state.querySearch ? (
					<SearchContents />
				) : (
					<>
						<h1 style={{ textAlign: 'center' }}>{state.post.title}</h1>
						<Divider />
						<Typography paragraph>{state.post.content}</Typography>
					</>
				)}
			</main>
		</div>
	)
}

export default BlogsContent
