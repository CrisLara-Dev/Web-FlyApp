describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Editar Trabajador", () => {

    cy.wait(1000);
    cy.get('input[name="email"]').type("zetagdcl@gmail.com");
    cy.get('input[name="password"]').type("holamundo12345");
    cy.get('button[type="submit"]').click();
    cy.wait(4000);

    cy.url().should("include", "/dashboard");
    cy.contains("Cuenta").click();
    cy.url().should("include", "/user-profile");
    cy.contains('Mi cuenta').scrollIntoView();
    cy.wait(1000);

    cy.get('button[name="editperfil"]').click();

    cy.screenshot("Formulario Perfil Seditar");
    cy.wait(2000);
    
    cy.get('input[name="direccion"]').clear().type("Huanuco, Lima - Perú");
    cy.get('input[name="telefono"]').clear().type("999635269");
    cy.get('button[name="guardar"]').click();

    cy.screenshot("Formulario Editar Perfil");
    cy.wait(3000);

    cy.contains('Mi cuenta').scrollIntoView();
    cy.wait(1000);
  });
});
