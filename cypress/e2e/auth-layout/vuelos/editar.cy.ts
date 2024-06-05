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
      cy.contains("Vuelos").click();
      cy.url().should("include", "/vuelos");
      cy.contains('Vuelos Realizados').scrollIntoView();

      cy.screenshot("Vuelos Realizados");
      cy.wait(1000);
  
      cy.get('button[name="subirlink"]').click();
      cy.wait(1000);

      cy.get('input[name="insertarlink"]').type("https://www.youtube.com/watch?v=wlxEVn7S21o&t=1028s"); 

      cy.screenshot("Subir Video");
      cy.wait(1000);

      cy.get('button[name="aceptar"]').click();
      cy.wait(1000);
    });
  });
  