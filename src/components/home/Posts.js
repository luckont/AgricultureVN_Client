import React from 'react';
import { useSelector } from 'react-redux';
import CardHeader from './postCard/CardHeader';
import CardBody from './postCard/CardBody';
import CardFooter from './postCard/CardFooter';

const Posts = () => {

    const postHome = useSelector((state) => state.postHome)

    return (
        <div>
            <h1 className="posts">
                {
                    postHome.posts.map(post => (
                        <div key={post._id} className='card my-3'>
                            <CardHeader post={post} />
                            <CardBody post={post} />
                            <CardFooter post={post} />
                        </div>
                    ))
                }
            </h1>
        </div>
    );
}

export default Posts;
