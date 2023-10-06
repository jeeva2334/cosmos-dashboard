import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { create_user } from "../../services/app.services";

function AddUser() {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = create_user(email, password)
        if(user){
            console.log("user created")
            setEmail("")
            setPassword("")
        }
    }
    return ( 
        <MainLayout>
            <h1 className="font-semibold text-3xl mt-4">Add User</h1>
            <div className="h-full justify-center items-center flex">
                <section className="section_form">
                    <form onSubmit={handleSubmit} id="consultation-form" className="feed-form">
                        <input name="email" required="" placeholder="E-mail" type="email" onChange={(e)=>setEmail(e.target.value)} />
                        <input name="password" required="" placeholder="password" type="password"  onChange={(e)=>setPassword(e.target.value)}/>
                        <button className="button_submit">Create</button>
                    </form>
                </section>
            </div>
        </MainLayout>
    );
}

export default AddUser;