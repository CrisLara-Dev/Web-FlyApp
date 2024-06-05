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
      cy.contains("Usuarios").click();
      cy.url().should("include", "/users");
      cy.contains('Usuarios').scrollIntoView();
      cy.wait(1000);

      cy.get('input[name="bususer"]').type("xelo@gmail.com"); 
      cy.wait(1000);

      cy.contains("xelo@gmail.com").parents('tr').within(() => {
          cy.get('.btn.btn-sm.btn-icon-only.text-light').click();
      });
      cy.wait(1000);

      cy.get('button[name="eliuser"]').click();

      cy.screenshot("Usuario Eliminado");
      cy.wait(2000);

      cy.contains('Sí, eliminar').click();

      cy.screenshot("Usuario Confirmar eliminación");
      cy.wait(1000);
      });
  });
  