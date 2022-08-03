import React, { useState } from 'react'
import styles from '../../styles/BlogPost.module.css'
import * as fs from 'fs'

const Slug = (props) => {

    function createMarkup(c) {
        return { __html: c };
    }

    const [sBlog] = useState(props.myBlogs);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.blog}>
                    <div className={styles.blogItem}>
                        <h2>{sBlog && sBlog.title}</h2>
                        <p>{sBlog && <div dangerouslySetInnerHTML={createMarkup(sBlog.content)} />}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: 'simply-dummy-text' } }
        ],
        fallback: true,
    };
}

export async function getStaticProps(context) {

    const { slug } = context.params;

    let myBlogs = await fs.promises.readFile(`BlogData/${slug}.json`, 'utf-8')

    return {
        props: { myBlogs: JSON.parse(myBlogs) },
    }
}

export default Slug