import React,{Component} from 'react'
import './adminNavbar.css';

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
   <nav>
   <div class="navbar">
    
  <a class="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
    </div>
  </nav>
        )
    }
}
export default Navbar