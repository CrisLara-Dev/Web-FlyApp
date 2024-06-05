describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Añadir Canal de Venta", () => {
    
    cy.wait(1000);
    cy.get('input[name="email"]').type("zetagdcl@gmail.com");
    cy.get('input[name="password"]').type("holamundo12345");
    cy.get('button[type="submit"]').click();
    cy.wait(4000);

    cy.url().should("include", "/dashboard");
    cy.contains("Configuración").click();
    cy.url().should("include", "/config");
    cy.contains('Canales de Venta').scrollIntoView();

    cy.screenshot('Tabla Canales de Venta');
    cy.wait(1000);

    cy.get('button[name="acanal"]').click();
    cy.url().should("include", "/crear-canal");

    cy.screenshot("Formulario Canal Srenellado");
    cy.wait(2000);

    cy.contains("Añadir Canal").should("be.visible");
    cy.get('input[name="nombre"]').type("Prueba");
    cy.get('button[name="acanales"]').click();

    cy.screenshot("Formulario Canal Rellenado");
    cy.wait(3000);

    cy.get('input[name="buscarca"]').type("Prueba"); 

    cy.screenshot("Canal Añadido");
    cy.wait(1000);
  });
});
