// cypress/integration/app.spec.js
describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
    cy.screenshot("Login");
  });

  it("Recuperar Contraseña", () => {

    cy.get('a[name="olvidado"]').click();
    cy.wait(1000);

    cy.get('input[name="email"]').type("zetagdcl@gmail.com");
    cy.screenshot('Recuperar');
    cy.wait(1000);

    cy.get('button[name="enviar"]').click();
    cy.wait(2000);
  });
});
