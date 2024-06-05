describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Eliminar Canal de Venta", () => {

    cy.wait(1000);
    cy.get('input[name="email"]').type("zetagdcl@gmail.com");
    cy.get('input[name="password"]').type("holamundo12345");
    cy.get('button[type="submit"]').click();
    cy.wait(4000);

    cy.url().should("include", "/dashboard");
    cy.contains("Configuración").click();
    cy.url().should("include", "/config");
    cy.contains('Canal de Venta').scrollIntoView();
    cy.wait(1000);

    cy.get('input[name="buscarca"]').type("Hola"); 
    cy.wait(1000);

    cy.contains("Hola").parents('tr').within(() => {
        cy.get('.btn.btn-sm.btn-icon-only.text-light').click();
    });
    cy.wait(1000);

    cy.contains('Eliminar').click();

    cy.screenshot("Canal Eliminado");
    cy.wait(2000);

    cy.contains('Sí, eliminar').click();

    cy.screenshot("Canal Confirmar eliminación");
    cy.wait(1000);
    });
});
