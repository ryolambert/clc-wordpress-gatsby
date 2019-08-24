// Where there's 🔥, there's 🚬
describe('your app', () => {
  it('works!', () => {
    // cy.visit('/')
    //   .get('.MuiButton-root')
    //   .click();
    cy.visit('/')
      .get('.MuiIconButton-root')
      .click()
      .get(
        ':nth-child(2) > .MuiList-root > :nth-child(9) > .HeaderLinks-navLink-104'
      )
      .click()
      .getByText(/Citylights Church/i)
      .click();
  });
});
