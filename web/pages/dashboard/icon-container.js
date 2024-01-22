import Image from 'next/image'
export default function icon({path, header, mt}){
    return(
        <div className='flex flex-row items-center __icon' style={{marginTop: `${mt}rem`}}>
          <div className='flex items-center justify-center box-border ml-28 w-[32px] h-[32px] rounded-lg' style={{backgroundColor:"#fff"}} id = "cust-sh">
          <Image src={path} className=' opacity-80' />
          </div>
          <p className='ml-6 text-[1.7rem] font-[500] tracking-wider opacity-75' style={{fontFamily:'Inter, sans-serif', color: "#121212"}}>{header}</p>
        </div>
    )
}