import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber'
import Fox from '../models/Fox'
import Loader from '../components/Loader'
import { DirectionalLight } from 'three'

const Contact = () => {
  const formRef =  useRef(null);
  const [form,setForm] = useState({name:'',email: '', message:''});

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value })
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name : "Brian",
        from_email : form.email,
        to_email: 'brianhonestc@gmail.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);
      setForm({name:'',email:'',message:''});
    }).catch((error) => {
        setIsLoading(false);
        console.log(error)
    })
  }
  const handleFocus = () => {};
  const handleBlur = () => {};
 
  return (
    <section className='relative flex lg:flex-row flex-col max-container'> 
      <div className='flex-1 min-w-[50%] flex flex-col'>  
        <h1 className='head-text'>Get in Touch</h1>
        <form className='w-full flex flex-col gap-7 mt-14' onSubmit={handleSumbit}> 
            <label className='text-black-500 font-semibold'>
              Name
              <input type="text" name="name" className='input' placeholder='John' required value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleFocus}/>
            </label>
            <label className='text-black-500 font-semibold'>
              Email
              <input type="email" name="email" className='input' placeholder='john@gmail.com' required value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleFocus}/>
            </label>
            <label className='text-black-500 font-semibold'>
              Your Message
              <textarea name="message" rows={4} className='textarea' placeholder='Let me know how I can help you!' required value={form.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleFocus}/>
            </label>
            <button type="submit" className='btn' disabled={isLoading} onFocus={handleFocus} onBlur={handleBlur}>
                {isLoading ? 'Sending...' :'Send Message'}  
            </button>
        </form>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] '>
          <Canvas
            camera={{
            position:[0,0,5],
            fov:75,
            near:0.1,
            far:1000
            }}
          >
            <directionalLight intensity={2.5}  position={[0,0,1]}/>
            <Suspense fallback={<Loader/>}>
              <Fox
                position={[0.5,0.35,0]}
                rotation={[12.6,-0.6,0]}
                scale={[0.5,0.5,0.5]}
              />
            </Suspense>
          </Canvas>
      </div>
    </section>
  )
}

export default Contact