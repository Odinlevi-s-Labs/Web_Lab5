import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getPost } from "../features/post/postSlice";
import Moment from "react-moment";

const Post = () => {
    const { post, isLoading } = useSelector(state => state.post);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getPost(params.postId));
    }, [params.postId])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 container px-16 mx-auto mt-24">
            <img src={post.imageUrl} className='w-full h-96' alt='Post'></img>
            <div className="flex flex-col ml-16 relative">
                <h1 className="text-3xl mb-3 font-bold sm:mt-4 md:mt-4">{post.title}</h1>
                <p className="text-xl pb-12">{post.text}</p>
                <div className="flex">
                    <p className="text-lg bg-sky-500 text-white font-bold px-2 absolute bottom-0">Posted by: {post.name}</p>
                    <p className="text-lg bg-sky-500 text-white font-bold px-2 absolute bottom-0 right-0">Published on: <Moment format='DD/MM/YYYY'>{post.createdAt}</Moment></p>
                </div>
            </div>
        </div>
    )
}

export default Post
