import { useState, useCallback, useEffect, useRef } from 'react'

const App = () => {

  const [length, Setlength] = useState(8);
  const [numberAllowed, SetNumberAllowed] = useState(false);
  const [charAllowed, SetCharAllowed] = useState(false);
  const [password, SetPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";
    //latest string length === length
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    SetPassword(pass)
  }, [length, numberAllowed, charAllowed, SetPassword])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 25);
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])



  return (
    <div className='flex justify-center items-center'>
      <div className="min-[360px]:mx-10 max-[1115px]:mx-auto lg:w-1/2  shadow-md rounded-lg px-4 my-60 bg-gradient-to-r from-purple-500 to-pink-500 ">
        <h1 className='pt-5 mb-5 text-white text-center text-4xl font-mono font-semibold'>Password Generator </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            // id='name'
            // name='name'
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-pink-300  placeholder:text-black text-2xl font-medium'

            // onChange={(e) => SetPassword(e.target.value)}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='bg-purple-900 text-white px-3 text-xl font-medium hover:bg-blue-900 duration-500 '>Copy</button>

        </div>

        <div className="flex flex-wrap text-sm gap-x-20 ">
          <div className="flex items-center gap-x-1">
            <input
              id='length'
              type="range"
              min={6}
              max={25}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                Setlength(e.target.value)
              }}

            />
            <label
              className='text-lg  font-bold text-white'
              htmlFor="length">
              Length:{length}
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={(e) => {
                SetNumberAllowed((prev) => !prev);
              }}
            />
            <label
              className='text-lg  font-bold text-white'
              htmlFor="numberInput">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={(e) => {
                SetCharAllowed((prev) => !prev);
              }}
            />
            <label
              className='text-lg  font-bold text-white'
              htmlFor="charInput">
              Characters
            </label>
          </div>
        </div>
      </div>
      <div />
      </div>
      )
}

      export default App