describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Eliminar Promociones", () => {

    cy.wait(1000);
    cy.get('input[name="email"]').type("zetagdcl@gmail.com");
    cy.get('input[name="password"]').type("holamundo12345");
    cy.get('button[type="submit"]').click();
    cy.wait(4000);

    cy.url().should("include", "/dashboard");
        cy.contains("Configuración").click();
    cy.url().should("include", "/config");
    cy.contains('Promociones').scrollIntoView();
    cy.wait(1000);

    cy.get('input[name="buscarpro"]').type("Fly-Editado"); 
    cy.wait(1000);

    cy.contains("Fly-Editado").parents('tr').within(() => {
        cy.get('.btn.btn-sm.btn-icon-only.text-light').click();
    });
    cy.wait(1000);

    cy.get('button[name="elipro"]').click();

    cy.screenshot("Promo Eliminado");
    cy.wait(2000);

    cy.contains('Sí, eliminar').click();

    cy.screenshot("Promo Confirmar eliminación");
    cy.wait(1000);
    });
});
