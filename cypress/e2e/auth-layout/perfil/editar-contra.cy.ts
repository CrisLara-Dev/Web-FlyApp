describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Editar Contra Perfil", () => {

    cy.wait(1000);
    cy.get('input[name="email"]').type("zetagdcl@gmail.com");
    cy.get('input[name="password"]').type("holamundo12345");
    cy.get('button[type="submit"]').click();
    cy.wait(4000);

    cy.url().should("include", "/dashboard");
    cy.contains("Cuenta").click();
    cy.url().should("include", "/user-profile");
    cy.contains('Cambiar contraseña').scrollIntoView();

    cy.screenshot("Perfil");
    cy.wait(1000);

    cy.get('button[name="cambiarcontra"]').click();
    cy.wait(1000);

    cy.get('input[name="conactual"]').type("holamundo12345"); 
    cy.get('input[name="connueva"]').type("holamundo"); 

    cy.screenshot("Cambiar Contraseña");
    cy.wait(1000);

    cy.get('button[name="aceptar"]').click();
    cy.wait(1000);
  });
});
