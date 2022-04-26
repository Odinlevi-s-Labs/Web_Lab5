import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
    posts: [],
    post: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    msg: '',
}

export const getPosts = createAsyncThunk('auth/getAll', async (_, thunkAPI) => {
    try {
        return await postService.getPosts();
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
})

export const getPost = createAsyncThunk('auth/getOne', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.getPost(id, token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
})

export const createPost = createAsyncThunk('auth/create', async (postData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.createPost(postData, token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
})

export const deletePost = createAsyncThunk('auth/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.deletePost(id, token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
})

export const addLike = createAsyncThunk('auth/addLike', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.addLike(id, token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
})

export const removeLike = createAsyncThunk('auth/removeLike', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.removeLike(id, token);
    } catch (error) {
        const msg = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
        return thunkAPI.rejectWithValue(msg);
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.msg = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.msg = action.payload
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = [...state.posts, action.payload]
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.filter(post => post._id !== action.payload._id);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.msg = action.payload
            })
            .addCase(getPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.post = action.payload
            })
            .addCase(getPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.msg = action.payload
            })
            .addCase(addLike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.map(post => post._id === action.payload.id ? { ...post, likes: action.payload.likes } : post)
            })
            .addCase(addLike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.msg = action.payload
            })
            .addCase(removeLike.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.map(post => post._id === action.payload.id ? { ...post, likes: action.payload.likes } : post)
            })
            .addCase(removeLike.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.msg = action.payload
            })
    }
})

export const { reset } = postSlice.actions;
export default postSlice.reducer;
