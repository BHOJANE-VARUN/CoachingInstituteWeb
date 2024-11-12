import React from 'react'
import './Footer.css'

function Footer(){
    return(
        <>
        <div class="footmain">
            <div class="leftfoot">
                <h1 className='foottitle'>Bright Path Academy</h1>
                <p id="footdet">Bright Path Academy had been established in korba town 20 years ago by Sanjivani, is the man , who pillared this organisation. At present, by the effort and hardwork of the man, with his team , the centre has crossed a figure of 1000 students.</p>                
            </div>
            <div className='footmid'>
                <div className='footmidhead'>
                    <h2 id='middet'>Our Links</h2>
                    <p className='links'>
                    <ul>
                        <li><a href="home.html">Home</a></li>
                        <li><a href="home.html">About Us</a></li>
                        <li><a href="home.html">Courses</a></li>
                        <li><a href="home.html">Contact </a></li>
                        
                    </ul>
                    </p>
                </div>
            </div>
            <div className='footmid'>
                <div className='footmidhead'>
                    <h2 id='middet'>Subscribe</h2>
                    <p className='links'>
                    <div className="box">
                        <p id='email'>Email Address</p>
                        
                    </div>
                    <button id="buttonid">Send</button>
                    </p>
                    
                </div>
            </div>
            </div>
        <div class="botfoot">
                <h3 id="footid">All rights reserved</h3>
            </div>

        </>
    );
}

export default Footer;
