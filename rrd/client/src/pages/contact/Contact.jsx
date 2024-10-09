import React, { useCallback, useMemo, useState } from "react";
import Form from "./Form";

function Contact() {
    const numbers = [1,65,234,3,46]
  const [counter, setCounter] = useState(0);
  const [genFun, setGenFun] = useState(false);

 const sum = useMemo(() => {
    console.log("eork")
   return numbers.reduce((prev,total) => total + prev,0)
  }, []);

  const test = useCallback(() => {
   return function test2 () {
        console.log("test")
       }
   },[genFun])

  return (
    <div>
      <button onClick={() => {
        if(counter === 5) setGenFun(prev => !prev);
        else setCounter(counter + 1)}}>
            click me</button>
      <p>{counter}</p>
      <p>{sum}</p>
      <Form test={test} />
    </div>
  );
}

export default Contact;
