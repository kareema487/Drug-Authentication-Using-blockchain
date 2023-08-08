import React, { Component } from "react";
import '../../assets/css/faq.css'
import '../../assets/css/style.css'
export default class faq extends Component {
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

        return <section ref={el => (this.div = el)}><span ref={el => (this.linkis = el)}>

        </span>
            <div className="col-md-12 col-sm-12" style={{ marginBottom: "200px" }}>
                <h1 style={{ marginBottom: "-150px;" }}>How to use Fakes website ?</h1>
            </div>
            <div className="col-md-6 col-sm-12 card" data-a="fade-right" data-a-duration="1500">
                <p>First, the site will open on this page , in this page you can put the serial number of the medicin then click search</p>
                <p>if the medicin is original then you can see a message tells you the result of that, if not , then you will recieve an alert telling you that the medicin which you entered it's serial number is fake </p>
            </div>
            <div className="col-md-6 col-sm-12 card sora-righ" data-a="fade-left" data-a-duration="1500" style={{ backgroundImage: "url(/img/Home.png)" }}></div>
            <div className="col-md-6 col-sm-12 card sora-lef" data-a="fade-right" data-a-duration="1500" style={{ backgroundImage: "url(/img/login.png)" }}></div>
            <div className="col-md-6 col-sm-12 card" data-a="fade-left" data-a-duration="1500">
                <p>when you click login above, then a pop up will appear. </p>
                <p>You should write a valid user name and password then select your type from the radio buttons bellow, if you are a pharmacy or a manifactor or an admin, you should write a valid data or you will not be able to access you panels</p>
            </div>
            <div className="col-md-12 col-sm-12 ques">
                <h2>If you are a Manifactor</h2>
                <p>Flow the instructions below</p>
            </div>
            <div className="col-md-6 col-sm-12 card" data-a="fade-right" data-a-duration="1500">
                <p>When you login as a manifactor ,there are three options will apear to you.</p>
                <p>The first panel will open is "Add Medicien", inwhich you can add a new medicin with all it's info</p>
            </div>
            <div className="col-md-6 col-sm-12 card sora-righ" data-a="fade-left" data-a-duration="1500" style={{ backgroundImage: "url(/img/manifactor-Add%20medicine.png)" }}></div>
            <div className="col-md-6 col-sm-12 card sora-lef" data-a="fade-right" data-a-duration="1500" style={{ backgroundImage: "url(/img/manifactor-all%20medicine.png)" }}></div>
            <div className="col-md-6 col-sm-12 card" data-a="fade-left" data-a-duration="1500">
                <p>The second panel which you can access is "All Medicin" Panel</p>
                <p>In this panel you can view all medicins that you have recorded in your manifactor in the system</p>
            </div>
            <div className="col-md-6 col-sm-12 card" data-a="fade-right" data-a-duration="1500">
                <p>The third panel is "All orders" Panels</p>
                <p>In this panel you can view all medicins that you have recorded in your manifactor in the system</p>
            </div>
            <div className="col-md-6 col-sm-12 card sora-righ" data-a="fade-left" data-a-duration="1500" style={{ backgroundImage: "url(/img/manifactor-all%20orders.png)" }}></div>
            <div className="col-md-12 col-sm-12 ques">
                <h2>If you are a Pharmacy</h2>
                <p>Flow the instructions below</p>
            </div>
            <div className="col-md-6 col-sm-12 card sora-lef" data-a="fade-right" data-a-duration="1500" style={{ backgroundImage: "url(/img/pharmacy-all-available-medicine.png)" }}></div>
            <div className="col-md-6 col-sm-12 card" data-a="fade-left" data-a-duration="1500">
                <p>When you login as a pharmacy ,there are three options will apear to you.</p>
                <p>The first panel will open is "All available Mediciens", inwhich you can see all medicines that you are avaliable to be ordered from manifactors and when you click add to card, the order will be sent to the manifactor</p>
            </div>
            <div className="col-md-6 col-sm-12 card" data-a="fade-right" data-a-duration="1500">
                <p>The second panel which you can access is "All Orders" Panel</p>
                <p>In this panel you can view all medicins that you had ordered from manifactors in the system</p>
            </div>
            <div className="col-md-6 col-sm-12 card sora-righ" data-a="fade-left" data-a-duration="1500" style={{ backgroundImage: "url(/img/Pharmacy-all%20orders%20%E2%80%93%201.png)" }}></div>
            <div className="col-md-6 col-sm-12 card sora-lef" data-a="fade-right" data-a-duration="1500" style={{ backgroundImage: "url(/img/pharmacy-My-Medicines.png)" }}></div>
            <div className="col-md-6 col-sm-12 card" data-a="fade-left" data-a-duration="1500">
                <p>The third panel is "All orders" Panels</p>
                <p>Inwhich you can view all medicines that you have in the pharmacy and recorded in the system</p>
            </div>
        </section>

    }
}