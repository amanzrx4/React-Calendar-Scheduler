import React from 'react';
import Layout from "../../components/Layout";
import { Jumbotron , Row , Col , Container } from 'react-bootstrap';
import "./style.css";
import { NavLink } from "react-router-dom";

const Home = (props) => {
  return (
    <div>
      <Layout sidebar>
        
        {/* <Jumbotron style={{ margin:'5rem' , background:'white' }} className="text-center">
          <h1>Welcome to Admin Dashboard</h1>
          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        </Jumbotron> */}
      </Layout>
      <div style={{ 
        backgroundImage: "url('https://lh3.googleusercontent.com/proxy/Lk7uXlnMjbCVMUNtvh0CUVZ_HvQXqK67DRWD7Xk5Qz4SZBP3K92COXwfv5Mqq5gHkbRdFtEIC2RzlaKZ0sZgCOO9JKAiTWO76AlQRQ')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginTop : "5%",
        marginLeft:"35%",
        height:"60vh",
        width:'40%' 
      }}>
      </div>
    </div>
  )
}

export default Home