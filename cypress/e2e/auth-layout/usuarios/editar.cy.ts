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
    cy.contains("Trabajadores").click();
    cy.url().should("include", "/workpeople");
    cy.contains('Trabajadores').scrollIntoView();
    cy.wait(1000);

    cy.get('input[name="buscartra"]').type("JUDITH SILVIA TITO COSI"); 

    cy.screenshot("Buscar Trabajador Seditar");
    cy.wait(1000);

    cy.contains("JUDITH SILVIA TITO COSI").parents("tr").within(() => {
        cy.get(".btn.btn-sm.btn-icon-only.text-light").click(); 
      });
    cy.wait(1000);
    
    cy.get('button[name="editra"]').click();
    cy.wait(3000);
    
    cy.get('input[name="direccion"]').clear().type("Huancayo, Perú");
    cy.get('input[name="telefono"]').clear().type("963258741");
    cy.get('input[name="email"]').clear().type("jarogit137@gmail.com");
    cy.get('button[name="editraba"]').click();

    cy.screenshot("Formulario Editar Trabajador");
    cy.wait(3000);

    cy.contains('Trabajadores').scrollIntoView();
    cy.wait(1000);

    cy.get('input[name="buscartra"]').clear().type("JUDITH SILVIA TITO COSI");
   
    cy.screenshot("Buscar Trabajador Editado");
    cy.wait(1000);
  });
});
