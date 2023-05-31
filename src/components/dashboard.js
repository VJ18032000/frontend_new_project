import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'


const Dashboard = () => {
    const history = useNavigate();

    const [data, setData] = useState('')
    const [task, setTask] = useState([])
    const [editvalue, setEditValue] = useState([])
    const [change, setChange] = useState(false)

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("token"));
        const userProfile = jwt_decode(user);
        const interval=setInterval(()=>{   
        const now = new Date().getTime() / 1000;
           if (now > userProfile.exp) {
                history('/')
            }
        }, 1000);
        return()=>{
            clearInterval(interval)
        }
    })


    const logoutHandler = e => {
        e.preventDefault();
        localStorage.clear()
        history('/')
      }

    useEffect(() => {
       const user= JSON.parse(localStorage.getItem('user'))
       const token= JSON.parse(localStorage.getItem("token"))
        axios.post(`http://localhost:4000/data/data?username=${user}`,{token}).then((res) => {
            setTask(res.data)
        })
    }, [change])

    const handleSubmit = (event) => {
        event.preventDefault();
        const user=JSON.parse(localStorage.getItem('user'))
        const data1 = { username: user, task: data }
        axios.post("http://localhost:4000/data", data1).then((res) => {
            setData("")
            setChange(!change)
        })
    };

    const delete1 = (id) => {
        axios.delete(`http://localhost:4000/data?id=${id}`).then((res) => {
            setChange(!change)
        })
    }
    const edit1 = (id) => {
        setEditValue(id)
        setData(id.task)
    }
    const handleupdate = (event) => {
        event.preventDefault();
        const data23 = { id: editvalue._id, task: data }
        axios.put(`http://localhost:4000/data`, data23).then((res) => {
            setChange(!change)
            setEditValue([])
            setData([])
        })

    }
    return (
        <>
        <div className='container-fluid' style={{marginTop:"50px"}}>
        <div className='container'>
            <div>
            <button className='logout-button' onClick={logoutHandler}><i class="bi bi-box-arrow-right"> Log Out</i></button>
                {editvalue.length === 0 ?
                    <form className="form-inline" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col">
                                <input type="text" value={data} onChange={(e) => { setData(e.target.value) }} className="form-control" placeholder="add list" />
                            </div>
                            <div className="col">
                                <button type="submit" disabled={!data} className="btn btn-primary mb-2"><i class="bi bi-plus-circle-fill"> Add</i></button>
                            </div>
                        </div>
                    </form> :
                    <form className="form-inline" onSubmit={handleupdate}>
                        <div className="row">
                            <div className="col">
                                <input type="text" value={data} onChange={(e) => { setData(e.target.value) }} className="form-control" />
                            </div>
                            <div className="col">
                                <button type="submit" disabled={!data} className="btn btn-primary mb-2"><i class="bi bi-pencil-square"> Edit</i></button>
                            </div>
                        </div>
                    </form>}
            </div>
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Index</th>
                            <th scope="col">Task</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {task.map((item, index) => {
                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.task}</td>
                                <td><button onClick={() => edit1(item)}><i className="bi bi-pencil-fill"></i></button></td>
                                <td><button onClick={() => delete1(item._id)}><i className="bi bi-trash3-fill"></i></button></td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        </div>
        </div>
        </>
    )
}

export default Dashboard