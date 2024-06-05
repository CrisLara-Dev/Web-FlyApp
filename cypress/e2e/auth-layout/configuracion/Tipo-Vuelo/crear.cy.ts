describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Añadir Tipo de Vuelo", () => {
    
    cy.wait(1000);
    cy.get('input[name="email"]').type("zetagdcl@gmail.com");
    cy.get('input[name="password"]').type("holamundo12345");
    cy.get('button[type="submit"]').click();
    cy.wait(4000);

    cy.url().should("include", "/dashboard");
    cy.contains("Configuración").click();
    cy.url().should("include", "/config");

    cy.contains('Tipos de Vuelo').scrollIntoView();
    cy.wait(1000);

    cy.get('button[name="ativuelo"]').click();
    cy.url().should("include", "/crear-t-vuelo");

    cy.screenshot("Formulario Vuelo Srenellado");
    cy.wait(2000);

    cy.contains("Añadir Tipo de Vuelo").should("be.visible");
    cy.get('input[name="tipo"]').type("Prueba");
    cy.get('input[name="precio"]').type("200");
    cy.get('input[name="tiempo"]').type("10");
    cy.get('button[name="avuelo"]').click();

    cy.screenshot("Formulario Vuelo Rellenado");
    cy.wait(3000);

    cy.get('input[name="buscarvu"]').type("Prueba"); 

    cy.screenshot("Vuelo Añadido");
    cy.wait(1000);

  });
});
