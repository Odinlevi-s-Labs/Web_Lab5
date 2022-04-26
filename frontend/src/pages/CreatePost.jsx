import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../features/post/postSlice";
import { toast } from 'react-toastify';

const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, msg } = useSelector(state => state.post);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (isError) {
            toast.error(msg);
        }
    }, [isError, msg])

    const onSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            title,
            text,
            imageUrl
        }

        dispatch(createPost(newPost));
        setTitle('');
        setText('');
        setImageUrl('');

        setTimeout(() => {
            navigate('/dashboard');
        }, 160)
    }

    return (
        <div className='flex justify-center min-h-screen'>
            <div className='w-full max-w-lg px-10 py-8 mx-auto bg-gray-200 rounded-lg shadow-xl h-3/4 mt-20'>
                <div className='max-w-md mx-auto space-y-6'>
                    <form onSubmit={onSubmit}>
                        <h2 className="text-2xl font-bold ">Add new post</h2>
                        <p className="my-4 opacity-70">Add a new post to keep other users informed of the latest information you have.</p>
                        <hr className="my-4" />
                        <label className="uppercase text-sm font-bold opacity-70">Title</label>
                        <input type="text" className="p-1 mt-2 mb-4 w-full bg-slate-300 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            name="title"
                            required
                        />
                        <label className="uppercase text-sm font-bold opacity-70">Image Url</label>
                        <input type="text" className="p-1 mt-2 mb-4 w-full bg-slate-300 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            name="imageUrl"
                            required
                        />
                        <label className="uppercase text-sm font-bold opacity-70">Description</label>
                        <textarea rows={4} type="text" className="p-1 mt-2 mb-4 w-full bg-slate-300 rounded"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            name="text"
                            required
                        />
                        <button type="submit" className="mt-3 mx-auto block px-4 py-2 rounded-md bg-sky-500 text-white font-bold">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;
