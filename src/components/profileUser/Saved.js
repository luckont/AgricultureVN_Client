import React, { useState, useEffect } from 'react';
import PostThumb from './PostThumb';
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from '../../untils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTyles';

const Saved = ({ auth, dispatch }) => {

    const [savePosts, setSavePosts] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(2)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        getDataAPI('/post/getSavePosts/result', auth.token)
        .then(res => {
            setSavePosts(res.data.savePosts)
            setResult(res.data.result)
            setLoad(false)
        })
        .catch(err => {
            dispatch({type: GLOBALTYPES.NOTIFY, payload: {err: err.response.data.msg}})
        })

        return () => setSavePosts([])
    },[auth.token, dispatch])

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`/post/getSavePosts/result?limit=${page * 9}`, auth.token)
        setSavePosts(res.data.savePosts)
        setResult(res.data.result)
        setPage(page + 1)
        setLoad(false)
    }


    return (
        <div>
            <PostThumb posts={savePosts} result={result} />

            {
                load && <p>Loading ...</p>
            }


            <LoadMoreBtn result={result} page={page}
                load={load} handleLoadMore={handleLoadMore} />

        </div>

    );
}

export default Saved;
