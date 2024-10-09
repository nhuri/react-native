import React ,{ memo } from 'react';


const Form = memo(({test}) => {
    console.log("form is rendering")
  return (
    <div onClick={() => test()}>Form</div>
  )
})

export default Form