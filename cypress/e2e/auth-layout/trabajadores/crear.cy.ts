describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Añadir Trabajador", () => {
    
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

    cy.get('button[name="atraba"]').click();
    cy.url().should("include", "/crear-workpeople");

    cy.screenshot("Formulario Trabajador Srenellado");
    cy.wait(2000);

    cy.contains("Añadir Trabajador").should("be.visible");
    cy.get('input[name="documento_identidad"]').type("10168715");
    cy.get('button[name="buscardni"]').click();
    cy.wait(2000);

    cy.get('input[name="direccion"]').type("Huaycan, Venezuela");
    cy.get('input[name="telefono"]').type("987654321");
    cy.get('input[name="email"]').type("jarogit137@gmail.com");
    cy.get('button[name="añadirtraba"]').click();

    cy.screenshot("Formulario Trabajador Rellenado");
    cy.wait(3000);

    cy.get('input[name="buscartra"]').type("JUDITH SILVIA TITO COSI"); 

    cy.screenshot("Trabajador Añadido");
    cy.wait(1000);

  });
});
