import React, { Component } from "react";
import './AOSINIT'
import '../../assets/css/about.css'
import '../../assets/css/style.css'

export default class About_US extends Component {
   createLinks() {
      let data = ["https://unpkg.com/aos@2.3.1/dist/aos.css", "https://fonts.googleapis.com/css?family=Blinker|Crimson+Pro|Fira+Code|Lato|Montserrat|Muli|Nunito+Sans|Roboto|Signika+Negative|Source+Sans+Pro|Ubuntu&display=swap", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"]
      data.forEach(i => {
         const link = document.createElement("link");
         link.rel = "stylesheet";
         link.href = i;
         this.linkis.appendChild(link);
      })
   }
   createScripts() {
      let data = ["https://unpkg.com/aos@2.3.1/dist/aos.js", "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js", "https://unpkg.com/aos@2.3.1/dist/aos.js", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"]
      data.forEach(i => {
         const script = document.createElement("script");
         script.src = i;
         this.div.appendChild(script);
      })
      // const script = document.createElement("script");
      // script.innerHTML = " AOS.init();";
      // this.div.appendChild(script);
   }
   componentDidMount() {
      this.createLinks()
      this.createScripts();
   }
   render() {
      return (
         <div ref={el => (this.div = el)}>
            <span ref={el => (this.linkis = el)}>

            </span>
            <section>
               <div className="col-md-12 ribbon"></div>
               <div className="col-md-2 col-sm-2"></div>
               <div className="col-md-8 col-sm-8" id="about">
                  <h1>About Us</h1>
                  <hr />
                  <p>We are a team at the Faculty of Computers and Information, Ain Shams. We created this application to
                  contribute to protecting the consumer from dishonest and dishonorable acts and to ensure your safety and
                  maintain your health by providing abundant information about medicines, their companies and
                  manufacturers, and the possibility of revealing their credibility. in the application also the ability
               that allows the simple citizen to use it and benefit from it. Our motto is <strong>"Your safety is our
                  mission"</strong> and we always strive to achieve that.</p>
               </div>
               <div className="col-md-2 col-sm-2"></div>
            </section>
         </div >);
   }
}