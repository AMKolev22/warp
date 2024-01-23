import Image from "next/image";

import whiteLogo from "../../../public/logo-white.svg"
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";


export default function Sign() {
    return (
        <div className = "w-screen h-screen overflow-hidden __sign" style={{backgroundColor: "#0A0A0A"}}>
            <Image src={whiteLogo} alt="logo" priority={true} className='pt-20 pl-24'/>
            <hr className="mt-16 opacity-50" style={{color: "#888"}} />
             <Card color="transparent" shadow={false} className="flex items-center scale-150 mt-72 __signPane">
              <Typography variant="h4" className=" text-dark-primary text-[5rem] mb-10" style={{fontFamily: "Inter, sans-serif"}}>
                Sign in warp
              </Typography>
              <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
                <div className="flex flex-col gap-6 mb-1">
                  <Typography variant="h6" className="-mb-3 text-dark-primary text-[1rem] font-medium" style={{fontFamily:"Inter, sans-serif", letterSpacing: "0.7px"}}>
                    Email
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="name@mail.com"
                    className=" border-solid border-x-[0.1rem] border-y-[0.1rem] border-dark-secondary text-dark-secondary opacity-50"
                    variant="outlined"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3 text-dark-primary text-[1.1rem] font-semibold mt-2" style={{fontFamily:"Inter, sans-serif", letterSpacing: "0.7px"}}>
                    Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    variant="outlined"
                    className="border-solid border-x-[0.1rem] border-y-[0.2rem] border-dark-secondary text-dark-secondary"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <Checkbox
                  label={
                    <Typography
                      variant="small"
                      color="white"
                      className="flex items-center font-normal"
                    >
                      I agree to the
                      <a
                        href="#"
                        className="font-medium transition-colors hover:text-gray-900"
                      >
                        &nbsp;Terms and Conditions
                      </a>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                />
                <Button className="mt-6" fullWidth>
                  sign up
                </Button>
                <Typography color="gray" className="mt-4 font-normal text-center text-dark-primary text-[1rem] font-regular" style={{fontFamily:"Inter, sans-serif"}}>
                  Haven't got an account yet?{" "}
                  <a href="#" className="font-medium">
                    Sign In
                  </a>
                </Typography>
              </form>
          </Card>
        </div>
    );
}