import React from 'react'
import Button from './Button'
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const Main = () => {
    return (
        <>

            <div className='container'>
                <div className='p-5 text-center bg-light-dark'>
                    <h1 className='text-light'>Car Price Prediction Portal</h1>
                    <p className='text-light lead'>An intelligent system that predicts fair market value of used cars based on factors like year, mileage, brand, and fuel type — helping buyers and sellers make smarter decisions.</p>
                    <Button text='Explore Now' class="btn-outline-info" url="/dashboard" />

                </div>
            </div>

        </>
    )
}

export default Main
