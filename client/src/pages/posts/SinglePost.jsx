import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import customFetch from '../../utils/customFetch'
import PostCard from '@/components/posts/PostCard'
import { CommentSection } from '@/components/shared/Comments'
import { MdAddComment } from 'react-icons/md'

export const singlePostLoader = async ({ params }) => {
    const { id } = params
    try {
        const { data } = await customFetch.get(`/posts/${id}`)
        console.log({ data })
        return data
    } catch (error) {
        console.log(error)
        return {
            error: error?.response?.data?.msg || 'Failed to load post'
        }
    }
}

const SinglePost = () => {
    const [showComments, setShowComments] = useState(true)
    const { post } = useLoaderData()
    const [comments, setComments] = useState([])

    const fetchComments = async () => {
        try {
            const { data } = await customFetch.get(`/posts/${post._id}/comments`)
            setComments(data.comments)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [post._id, showComments])

    console.log({ comments })

    const addComment = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const content = formData.get('content')
        try {
            const { data } = await customFetch.post(`/posts/${post._id}/comments`, { content })
            console.log({ data })
            e.target.reset()
            await fetchComments()
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteComment = async (commentId) => {
        try {
            const { data } = await customFetch.delete(`/posts/comments/${commentId}`)
            console.log({ data })
            await fetchComments()

        } catch (error) {
            console.log({ error })

        }
    }
    return (
        <div className='flex flex-col gap-4'>
            <PostCard post={post} totalComments={post.totalComments} comment="type" onCommentClick={() => setShowComments(prev => !prev)} />
            {showComments && <CommentSection addComment={addComment} comments={comments} handleDeleteComment={handleDeleteComment} />}
        </div>
    )
}

export default SinglePost
