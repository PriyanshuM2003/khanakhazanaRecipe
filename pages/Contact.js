import React, { useState } from 'react'
import styles from '../styles/Contact.module.css'



const Contact = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [desc, setDesc] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = { phone, name, email, desc };

        fetch('http://localhost:3000/api/PostContactAPI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log('Success:', data);
                alert("Your message has been send")
                setName('')
                setEmail('')
                setPhone('')
                setDesc('')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleChange = (e) => {
        if (e.target.name == 'phone') {
            setPhone(e.target.value)
        }
        else if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'name') {
            setName(e.target.value)
        }
        else if (e.target.name == 'desc') {
            setDesc(e.target.value)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.contact}>
                        <h1>Contact us</h1>
                        <div className={styles.form}>
                            <label htmlFor="name" className={styles.formLabel}>Name:</label>
                            <input type="name" value={name} onChange={handleChange} className={styles.formControl} id="name" name="name" placeholder='Enter your name' />
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="exampleInputEmail1" className={styles.formLabel}>Email address:</label>
                            <input type="email" value={email} onChange={handleChange} className={styles.formControl} id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder='Enter your Email address' />
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="phone" className={styles.formLabel}>Phone no.:</label>
                            <input type="phone" value={phone} onChange={handleChange} className={styles.formControl} id="phone" name='phone' placeholder='Enter your phone no.' />
                        </div>
                        <div className={styles.formTextarea}>
                            <textarea className={styles.formControl} placeholder="Write your concern" name='desc' value={desc} onChange={handleChange} id="Textarea"></textarea>
                        </div>
                        <button type="submit" className={styles.btn}><strong>Submit</strong></button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Contact