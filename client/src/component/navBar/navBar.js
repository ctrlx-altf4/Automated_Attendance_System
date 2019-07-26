import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './navBar.css'
import { Gallery, GalleryImage } from "react-gesture-gallery";
import{images} from './images'
import { extname } from 'path';
import { EXDEV } from 'constants';
import { NONAME } from 'dns';

function NavBar(){
    // constructor(){     
    // }
    
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
          if (index === 4) {
            setIndex(0);
          } else {
            setIndex(prev => prev + 1);
          }
        }, 3000);
        return () => clearInterval(timer);
      }, [index]);

      React.useEffect(()=>{
        const handleScroll=()=>{
          const navs= document.getElementById('navs')
         
            if(window.pageYOffset>200){
              alert("EXcuse us! yo part under construction maa xa :p")
              navs.classList.add("color");
            }
            // else{
            //   navs.classList.remove("color");
            // }

        }
        window.addEventListener('scroll',handleScroll)
        return()=> window.removeEventListener('scroll', handleScroll);
      })
    
        return(
            <div clasName="navigation-screen" id="navs" > 
                <Gallery 
                className="slider"
                style={{
                    // display:'none'
                    // background: "black",
                    // height: "100vh",
                    // width: "100%"
                 }}
              index={index}
              onRequestChange={i => {
                setIndex(i);
              }}>
                {images.map(image=>(
                   <GalleryImage objectFit="contain" key={image} src={image} />
                   ))}
            </Gallery>
            <div className="logo">
                    <p>LOGO</p>
             </div>
             <div className="navigation-bar">
                     <ul>    
                        <li ><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/'>Contact</NavLink></li>
                        <li><NavLink to='/'>About Us</NavLink></li>
                        <li><NavLink to='/register'>Register</NavLink></li>
                        <li><NavLink to='/attendance'>ATTENDANCE</NavLink></li>    
                    </ul>     
             </div>
             <div className="title">
                <p>AUTOMATED ATTENDANCE SYSTEM</p>
             </div>
             
             <div className="input-field">
                    {/* <input type="text" id="bttn" placeholder="SEARCH" onChage={this.handleChange}/> */}
             </div>
             <div class="exp-btn">
                <a href="#">Explore</a>
            </div>
            {/* <div className="navigation-menu">
                    <ul>    
                        <li><NavLink to ='/'>Logo</NavLink></li> 
                        <li id="navbar-right"><NavLink to='/'>Home</NavLink></li>
                        <li id="navbar-right"><NavLink to='/'>Contact</NavLink></li>
                        <li id="navbar-right"><NavLink to='/'>About Us</NavLink></li>
                        <li id="navbar-right"><NavLink to='/register'>Register</NavLink></li>
                        <li id="navbar-right"><NavLink to='/'>LogOut</NavLink></li>    
                    </ul>       
                </div> */}
                {/* <h1>SAMPLE COLLECTION SITE</h1>
                <h3>khai k garxau gara</h3>
                <div className="input-field">
                    <input type="text" id="bttn" placeholder="SEARCH" onChage={this.handleChange}/>
                </div> */}
           
            </div>
            
            // <div className="header">
                // <div className="mySlider">
                //     <ul>
                //         <li><img src="3.jpg" ></img></li>
                //         <li><img src="2.png" ></img></li>
                //         <li><img src="4.jpeg"></img></li>
                //         <li><img src="5.jpg"></img></li>
                //         <li><img src="6.jpg"></img></li>
                //         <li><img src="7.jpg"></img></li>
                //         <li><img src="8.jpg"></img></li>
                //         <li><img src="9.jpg"></img></li>   
                //     </ul>
                // </div>
                
            // </div>
         );
    }

export default NavBar;