import React from 'react'
import pic2 from '../img/design.png';
import FadeIn from 'react-fade-in';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <FadeIn>
        <div>
            <nav className='navbar'>
                <a className='logo' href="/">Conversable</a>
                <div className="circle"></div>
            </nav>
            <div className="content-container">
                <div className="content-one">
                    <h1 className='header'>Socialize and Study</h1>
                    <p className='desc'>
                        <span>Create your own rooms with a click of a</span>
                        <br />
                        <span>button and set up a hangout session or</span>
                        <br />
                        <span>be productive together.</span>
                    </p>
                    <div className="btn-container">
                        <Link to='/Authentication'>
                        <button className="btn btn-primary animate shake">
                            <span>Get Started</span>
                        </button>
                        </Link>
                    </div>
                </div>
                <div className="container-two">
                    <img src={pic2} alt="" />
                </div>
            </div>
            <footer>
                <nav className='navbar2'>
                    {/* <h1 className='copyright'>© {(new Date().getFullYear())} BRANDON</h1> */}
                    <h1 className='copyright'>Made by Brandon</h1>
                        <ul className='menu'>
                            <li className='item'> <a href="https://www.linkedin.com/in/mesmerize/" rel="noreferrer" target='_blank'>LinkedIn</a></li>
                            <li className='item'> <a href="https://www.github.com/mesmerize" rel="noreferrer" target='_blank'>GitHub</a></li>
                            <li className='item'> <a href="https://discord.gg/gpr6tU7W" rel="noreferrer" target='_blank'>Discord</a></li>
                        </ul>
                </nav>
            </footer>
        </div>
        </FadeIn>
    )
}

export default Home
