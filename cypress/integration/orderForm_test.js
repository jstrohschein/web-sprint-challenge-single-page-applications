describe('Testing form input and submission', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/pizza')
  })

  it('Adds text to inputs and submits the form', () => {

    //test name input
    cy
      .get('[data-cy=name]')
      .type('Jared')
      .should('have.value', 'Jared')


    //test email input
    cy
      .get('[data-cy=email]')
      .type('test@email.com')
      .should('have.value', 'test@email.com')



    //test size
    cy
      .get('[data-cy=sizes]')
      .select('large')
      .should('have.value', 'large')

    //test toppings (pep)
    cy
      .get('[data-cy=pepperoni]')
      .check()
      .should('be.checked')

    //test toppings (cheese)
    cy
      .get('[data-cy=cheese]')
      .check()
      .should('be.checked')

    cy
      .get('[data-cy=submit]')
      .click()

  })
})