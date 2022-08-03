import React, { useState } from 'react'
import styles from '../styles/Blog.module.css'
import Link from 'next/link'
import * as fs from 'fs'
import InfiniteScroll from 'react-infinite-scroll-component';

const Blog = (props) => {

    const [Blogs, setBlogs] = useState(props.allBlogs);
    const [count, setCount] = useState(2)

    const fetchData = async () => {
        let d = await fetch(`http://localhost:3000/api/BlogAPI/?count=${count + 2}`)
        setCount(count + 2)
        let data = await d.json()
        setBlogs(data)
    };

    return (

        <>
            <div className={styles.container}>
                <div className={styles.blog}>
                    <h1>Food Recipes</h1>
                    <InfiniteScroll
                        dataLength={Blogs.length}
                        next={fetchData}
                        hasMore={props.allCount !== Blogs.length}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }>
                        {Blogs.map((BlogItem) => {
                            return <div key={BlogItem.title} className={styles.blogItem}>
                                <Link href={`/BlogPost/${BlogItem.slug}`}>
                                    <h2>{BlogItem.title}</h2>
                                </Link>
                                <p>{BlogItem.metadesc.substr(0, 110)} <strong><em>click on the title for recipe...</em></strong></p>
                            </div>
                        })}
                    </InfiniteScroll>
                </div>
            </div>
        </>
    )
}

export async function getStaticProps() {

    let data = await fs.promises.readdir("BlogData");
    let allCount = data.length;
    let myfile;
    let allBlogs = [];
    for (let index = 0; index < 6; index++) {
        const item = data[index];
        myfile = await fs.promises.readFile(('BlogData/' + item), 'utf-8')
        allBlogs.push(JSON.parse(myfile))
    }

    return {
        props: { allBlogs, allCount },
    }
}

export default Blog