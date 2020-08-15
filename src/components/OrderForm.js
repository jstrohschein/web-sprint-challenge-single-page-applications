import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'


const OrderForm = () => {


  //STATES
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    sizes: '',
    pepperoni: false,
    cheese: false,
    specialInstructions: ''
  })

  //control submit button visibility
  const [buttonDisabled, setButtonDisabled] = useState(true)

  //post for database control
  const [users, setUsers] = useState([])

  //control errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    sizes: ''
  })

  const [post, setPost] = useState([]);
  //END STATES


  //VALIDATION

  //yup schema-shape to validate input
  const formSchema = yup.object().shape({
    name: yup
      .string() //must be a string
      .min('2')
      .required('Name is a required field'),

    email: yup
      .string()//must be a string
      .email()//must be in the shape of an email
      .required('A valid email is required'),

    sizes: yup
      .string()
      .oneOf(["x-large", "large", "medium", "small"]),

    pepperoni: yup
      .boolean(),

    cheese: yup
      .boolean(),

    specialInstructions: yup
      .string()
  })

  const validForm = () => {
    formSchema.isValid(formState).then((isValid) => {
      setButtonDisabled(!isValid);
    });
  };

  useEffect(validForm, [formState]);

  //validate changes from the synthetic event using the yup schema
  const validateChange = e => {

    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ''
        })
      })
      .catch(error => {
        setErrors({
          ...errors,
          [e.target.name]: error.errors[0]
        })
      })
  }

  //END VALIDATION


  //CHANGES AND SUBMIT

  //handles changes in the form and updates the formState using the spread op
  const handleChanges = e => {

    e.persist()

    const newFormData = {
      ...formState,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }

    validateChange(e)

    setFormState(newFormData)

  }

  //onSubmit function
  const formSubmit = e => {
    e.preventDefault()
    axios
      .post('https://reqres.in/api/users', formState)
      .then(res => {
        setPost([...users, res.data])
        setFormState({
          name: '',
          email: '',
          sizes: '',
          pepperoni: false,
          cheese: false,
          specialInstructions: ''
        })
      })
      .catch(error => {
        console.log(error.response)
      })
  }

  //END CHANGES AND SUBMIT

  return (

    <div>
      <form autoComplete='off' onSubmit={formSubmit}>

        <label htmlFor='name'>Name</label>
        <input
          id='name'
          name='name'
          data-cy='name'
          type='text'
          value={formState.name}
          onChange={handleChanges} />

        {/*Name Error*/}
        {errors.name.length > 0 ? (<p className='error'>{errors.name}</p>) : null}

        <label htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          data-cy='email'
          type='text'
          value={formState.email}
          onChange={handleChanges} />

        {/*Email Error */}
        {errors.email.length > 0 ? (<p className='error'>{errors.email}</p>) : null}

        <label htmlFor='sizes'>Size</label>
        <select id='sizes' name='sizes' data-cy='sizes' onChange={handleChanges}>
          <option>--Choose a Size--</option>
          <option value='x-large'>Extra Large</option>
          <option value='large'>Large</option>
          <option value='medium'>Medium</option>
          <option value='small'>Small</option>
        </select>

        <label htmlFor="pepperoni" className="terms"></label>
        <input
          type="checkbox"
          id="pepperoni"
          name="pepperoni"
          data-cy='pepperoni'
          checked={formState.pepperoni}
          onChange={handleChanges}
        />
        Pepperoni

        <label htmlFor='cheese' className='terms'></label>
        <input
          type="checkbox"
          id="cheese"
          name="cheese"
          data-cy='cheese'
          checked={formState.cheese}
          onChange={handleChanges}
        />
        Cheese

        <label htmlFor="specialInstructions">Special Instructions</label>
        <textarea
          id="specialInstructions"
          name="specialInstructions"
          value={formState.specialInstructions}
          onChange={handleChanges}
        />


        <button disabled={buttonDisabled} type="submit" data-cy='submit'>
          Submit
        </button>
        <pre>{JSON.stringify(post, null, 2)}</pre>

      </form>
    </div>




  )
}


export default OrderForm
