/// <reference types="cypress" />

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has a banner image being displayed', () => {
    cy.get('img')
      .click()
      .should('have.attr', 'src', 'assets/login/banner-home.png')
      .and('be.visible')
  })

  it('has selection field with Kent emails', () => {
    cy.get('mat-select').click()
    cy.get('mat-option').contains('@kent.edu.au').click()

    cy.get('mat-select').click()
    cy.get('mat-option').contains('@student.kent.edu.au').click()

    cy.get('button[type=submit]').contains('Sign in').click()
  })

  it('has a Terms and Conditions text and link', () => {
    cy.get('small')
    cy.contains(
      `By clicking Sign in, it means that you've read and agreed with our`
    )
    cy.get('a')
      .click()
      .should(
        'have.attr',
        'href',
        'http://kent.edu.au/kent3/wp-content/uploads/2017/08/POLICY-Website-Terms-of-Use.pdf'
      )
    cy.visit('http://localhost:4200')
  })
})
