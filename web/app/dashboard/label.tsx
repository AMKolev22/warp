export default function Label({role} : {role: string}){
    if (role == "admin"){
        return(
            <div className="w-[8.5rem] h-[2.5rem] bg-[#146EF5] bg-opacity-50 flex justify-center items-center text-[1.6rem] font-semibold tracking-wider ml-6" style={{fontFamily:"Inter, sans-serif"}}>
                <p className="text-[#146EF5] opacity-100">ADMIN</p>
            </div>
        )
    }
    else if (role == "user"){
        return(
            <div className="w-[8.5rem] h-[2.5rem] bg-[#888888] bg-opacity-30 flex justify-center items-center text-[1.6rem] font-semibold tracking-wider ml-6" style={{fontFamily:"Inter, sans-serif"}}>
                <p className="text-[#121212] opacity-90">USER</p>
            </div>
        )
    }
}