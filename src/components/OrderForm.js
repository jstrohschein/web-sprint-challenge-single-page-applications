import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'


const OrderForm = () => {

  const { handleSubmit, register, errors } = useForm({})

  const [buttonDisabled, setButtonDisabled] = useState(true)

  const onSubmit = formData => {
    console.log(formData)
  }

  console.log(errors)


  return (

    <div>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor='name'>Name</label>
        <input
          id='name'
          name='name'
          data-cy='name'
          type='text'
          ref={register({ validate: name => name && name.length > 2, required: true })} />

        {/*Name Error*/}
        {errors.name && <p>Invalid Name</p>}

        <label htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          data-cy='email'
          type='text'
          ref={register} />

        {/*Email Error */}
        {errors.email && <p>Invalid Email</p>}

        <label htmlFor='sizes'>Size</label>
        <select id='sizes' name='sizes'>
          <option>--Choose a Size--</option>
          <option value='x-large'>Extra Large</option>
          <option value='large'>Large</option>
          <option value='medium'>Medium</option>
          <option value='small'>Small</option>
        </select>

        <button disabled={buttonDisabled} type="submit">
          Submit
        </button>
        {/*<pre>{JSON.stringify(post, null, 2)}</pre>*/}

      </form>
    </div>




  )
}


export default OrderForm
