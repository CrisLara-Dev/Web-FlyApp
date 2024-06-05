describe("Configuration", () => {
    beforeEach(() => {
      cy.visit("http://localhost:4200");
    });
  
    it("Eliminar Trabajador", () => {
  
      cy.wait(1000);
      cy.get('input[name="email"]').type("zetagdcl@gmail.com");
      cy.get('input[name="password"]').type("holamundo12345");
      cy.get('button[type="submit"]').click();
      cy.wait(4000);

      cy.url().should("include", "/dashboard");
            cy.contains("Trabajadores").click();
      cy.url().should("include", "/workpeople");
      cy.contains('Trabajadores').scrollIntoView();
      cy.wait(1000);

      cy.get('input[name="buscartra"]').type("JUDITH SILVIA TITO COSI"); 
      cy.wait(1000);

      cy.contains("JUDITH SILVIA TITO COSI").parents('tr').within(() => {
          cy.get('.btn.btn-sm.btn-icon-only.text-light').click();
      });
      cy.wait(1000);

      cy.get('button[name="elitra"]').click();

      cy.screenshot("Trabajador Eliminado");
      cy.wait(2000);

      cy.contains('Sí, eliminar').click();

      cy.screenshot("Trabajador Confirmar eliminación");
      cy.wait(1000);
      });
  });
  