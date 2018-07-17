/// <reference types="cypress" />

import Chance from 'chance'
const chance = new Chance()

describe('Firestarter', () => {

const email = chance.email()
// const pass = chance.pass()

beforeEach(() => {
  cy.visit('http://localhost:4200')
})

    it('choose student email', () => {
      cy.get('.custom-select').select('@student.kent.edu.au').should('have.value', 'student.kent.edu.au')

      cy.get('button')
      .should('contain', 'Sign in with Google').click()

      // cy.request('https://accounts.google.com/signin/oauth/identifier?hd=student.kent.edu.au&client_id=19289947337-lnhhk6m7hiujetc7cfspb7tamh43u0er.apps.googleusercontent.com&as=euCcoh5cfrE9GktMUC0ZbA&destination=https%3A%2F%2Fkent-ac75b.firebaseapp.com&approval_state=!ChRXeGtGYm9hNG13MF9wQ1JTejB5QhIfTTBIUDlIM1JrWGNTY01pNW5wOWhjSFNmMXpSb1NoWQ%E2%88%99ANKMe1QAAAAAW07C_GiSqcIpb6lygLvhul4ppsJyXTS7&oauthgdpr=1&xsrfsig=AHgIfE86-AHR1ZRBMc-RdSIHy3h3TUuxWw&flowName=GeneralOAuthFlow', {email: 'Jane'})
    });

    // it('has terms and conditions link', () => {
      // cy.get('a').click()
      // cy.visit('http://kent.edu.au/kent3/wp-content/uploads/2017/08/POLICY-Website-Terms-of-Use.pdf')
    // });

});
