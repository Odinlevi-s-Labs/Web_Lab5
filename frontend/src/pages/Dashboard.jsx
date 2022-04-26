import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../features/post/postSlice";
import Spinner from "../components/Spinner";
import PostItem from "../components/PostItem";

const Dashboard = () => {
    const { posts, isLoading } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [])

    if (isLoading) {
        return <Spinner />
    }

    if (posts.length > 0) {
        return (
            <div className="grid px-28 pb-24 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mx-auto container justify-center items-center gap-6">
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        )
    } else {
        return (
            <div className="mx-auto text-center mt-24">
                <h1 className="text-3xl">There are no posts yet...</h1>
                <div className="flex space-x-4 text-center justify-center items-center mt-3">
                    <h1 className="text-3xl">Be the first to add a post?</h1>
                    <Link to='/create-post' className="bg-sky-500 font-bold px-3 py-2 text-white rounded hover:opacity-80">Add new post</Link>
                </div>
            </div>
        )
    }
}

export default Dashboard;
