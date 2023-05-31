import React,{useState} from 'react'
import loginImage from '../assests/register.avif'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import Toast from 'react-bootstrap/Toast'
import * as yup from 'yup'
import '../App.css'

const Register = () => {
    const history = useNavigate();
    const [loginStatus, setLoginStatus] = useState("")
    const [show, SetShow] = useState(false)
  
    const Formik = useFormik({
      initialValues: {
        username: '',
        password: '',
        confirmPassword:''
      },
      validateOnChange: false,
      validateOnBlur: false,
      validationSchema: yup.object({
        username: yup.string()
          .required("username is required"),
        password: yup.string()
          .min(3, "minimum 3 characters")
          .required("Password is required"),
        confirmpassword: yup.string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .required("confirmpassword is required"),
      }),
      onSubmit: (values) => {
        const { ...data } = values;
        console.log(values);
        SetShow(true)
  
        axios.post("http://localhost:4000/register", data).then((res) => {
          console.log(res)
          if (res.data.message==='user register successfully...') {
            setLoginStatus(res.data.message)
            Formik.resetForm();
            history('/dashboard')
            localStorage.setItem('user',JSON.stringify(res.data.user))
            localStorage.setItem('token',JSON.stringify(res.data.token))
          } else {
            setLoginStatus(res.data.message)
          }
        })
      }
  
    })

  return (
   <>
        <div className="container-fluid" >
        <div className="register-main">
          <div className="row">
            <div className="col-md-6 left" >
              <div className="inner">
                <img src={loginImage} className="img-fluid" alt='img' />
              </div>
            </div>
            <div className="col-md-5 right">
              <h2 style={{ fontWeight: 'bold', alignItems: 'left', color: '#232323',marginBottom:'42px' }}>Sign up</h2>

              <Toast onClose={() => SetShow(false)} show={show} delay={5000} autohide>
                <Toast.Body className=" bg-danger text-white">
                  {loginStatus}
                </Toast.Body>
              </Toast>
              <div className="form-group">
                <label className='label'>Username</label><br/>
                <input label='Username' className="text" type='text' name="username" autoComplete="off" id="text1"
                  onChange={Formik.handleChange} placeholder='Enter Your Username'
                  value={Formik.values.username} /><br/>
                {Formik.errors.username ? <div className="text-danger error">{Formik.errors.username}</div> : null}
               
                <label className='label'>Password</label><br/>
                <input label='Password' className="text" type='password' name="password" id='text2'
                  onChange={Formik.handleChange} placeholder='Enter Your Password'
                  value={Formik.values.password} />
                {Formik.errors.password ? <div className="text-danger error">{Formik.errors.password}</div> : null}

                <label className='label'>Confirm Password</label>
                            <input label='Confirm Password' className="form-control text" id="text3" type='password' name="confirmpassword" 
                                onChange={Formik.handleChange} placeholder="Enter Your Password again"
                                value={Formik.values.confirmpassword} />
                            {Formik.errors.confirmpassword ? <div className="text-danger error">{Formik.errors.confirmpassword}</div> : null}

              </div>
              <button className="form-control button" onClick={Formik.handleSubmit} type="submit">Sign Up</button>
              <Link to="/" className="create">Already have an account?</Link>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default Register