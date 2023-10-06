import { signOut } from "firebase/auth";
import SideBar from "../Components/SideBar";
import { authuser } from "../config/user.config";
import { useNavigate } from "react-router-dom";

function MainLayout({children}) {
    const nav = useNavigate()
    const signout = async() => {
        await signOut(authuser)
        nav('/login')
    }
    return (  
        <div className="flex gap-5">
            <div>
                <SideBar />
            </div>
            <div className="flex w-full flex-col">
                <div className="flex justify-around items-center">
                    <div className="p-5 font-bold text-3xl">
                        Cosmo Cinemas
                    </div>
                    <div>
                        <h1 onClick={signout} className="text-blue-400 text-xl font-medium cursor-pointer">Log Out</h1>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default MainLayout;