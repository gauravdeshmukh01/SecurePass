import { useState, useCallback, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumber] = useState(false);
  const [charAllowed, setChar] = useState(false);
  const [password, setPass] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%&~";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPass(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password)
      .then(() => alert("Password copied!"));
    passwordRef.current.select();
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const animatedProps = useSpring({
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 150, friction: 10 },
  });

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-700'>
      <animated.div style={animatedProps} className='max-w-lg w-full p-8 bg-white shadow-md rounded-lg'>
        <h1 className='text-center text-4xl font-bold text-purple-800 mb-6'>Generate Secure Password</h1>
        <div className='mb-6'>
          <input
            type="text"
            value={password}
            className='w-full px-4 py-3 bg-gray-200 rounded-md focus:outline-none'
            placeholder='Generated Password'
            ref={passwordRef}
            readOnly
          />
        </div>
        <div className='mb-6'>
          <input
            type="range"
            min={8}
            max={30}
            value={length}
            onChange={(e) => { setLength(e.target.value) }}
            className='w-full bg-gray-200 rounded-md focus:outline-none'
          />
          <label className='block mt-2 text-sm text-gray-600'>Password Length: {length}</label>
        </div>
        <div className='mb-6'>
          <label className='block mb-2 text-sm font-bold text-gray-700'>Include:</label>
          <div>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => { setNumber((prev) => !prev) }}
              className='mr-2'
            />
            <label htmlFor='numberInput' className='text-sm text-gray-700'>Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => { setChar((prev) => !prev) }}
              className='mr-2 mt-2'
            />
            <label htmlFor='charInput' className='text-sm text-gray-700'>Special Characters</label>
          </div>
        </div>
        <button
          onClick={copyPasswordToClipboard}
          className='w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out'
        >
          Copy Password
        </button>
      </animated.div>
    </div>
  );
}

export default App;
