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
		cy.get('select[name=domain]')
			.select('Choose your email...')
			.should('have.value', '')
			.select('@kent.edu.au')
			.should('have.value', 'kent.edu.au')
			.select('@student.kent.edu.au')
			.should('have.value', 'student.kent.edu.au')

		cy.get('button[type=submit]')
			.contains('Sign in with Google')
			.click()
	})

	it('has a Terms and Conditions text and link', () => {
		cy.get('small')
		cy.contains(
			`By login with Google it means that you've read and agreed with our`
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
