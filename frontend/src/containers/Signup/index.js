import React , { useState } from 'react';
import Layout from '../../components/Layout';
import { Container , Form , Row, Col , Button} from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch , useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions';



const Signup = (props) => {

  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const userSignup =() => {
    const user = {
      firstName , lastName ,email ,password
    }

    dispatch(signup(user));
  }

  if(auth.authenticate){
    return <Redirect to={'/'} />
  }

  if(user.loading){
    return <p>Loading........!</p>
  }

  return (
    <Layout>
      <Container>
        {user.message}  
        <Row style={{marginTop : '50px'}}>
          <Col md={{span:6 , offset:3}}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input 
                    label="First Name" 
                    placeholder="First Name" 
                    type="text" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                  />
                </Col>

                <Col md={6}>
                  <Input 
                    label="Last Name" 
                    placeholder="Last Name" 
                    type="text" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                  />
                </Col>
              </Row>


              <Input 
                label="Email address" 
                placeholder="Enter email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />

              <Input 
                label="Password" 
                placeholder="Enter Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
            
      </Container>
    </Layout>
  )
}

export default Signup
