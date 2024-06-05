describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Añadir Promociones", () => {
    
    cy.wait(1000);
    cy.get('input[name="email"]').type("zetagdcl@gmail.com");
    cy.get('input[name="password"]').type("holamundo12345");
    cy.get('button[type="submit"]').click();
    cy.wait(4000);

    cy.url().should("include", "/dashboard");
    cy.contains("Configuración").click();
    cy.url().should("include", "/config");
    cy.contains('Promociones').scrollIntoView();

    cy.screenshot('Tabla Promociones');
    cy.wait(1000);

    cy.get('button[name="apro"]').click();
    cy.url().should("include", "/crear-promociones");

    cy.screenshot("Formulario Promo Srenellado");
    cy.wait(2000);

    cy.contains("Añadir Promoción").should("be.visible");
    cy.get('input[name="codigo"]').type("Fly-Prueba");
    cy.get('input[name="porcentaje"]').type("50");
    cy.get('input[name="fecha_fin"]').type("2024-06-14");
    cy.get('button[name="apromo"]').click();

    cy.screenshot("Formulario Promo Rellenado");
    cy.wait(3000);

    cy.get('input[name="buscarpro"]').type("Fly-Prueba"); 

    cy.screenshot("Promo Añadido");
    cy.wait(1000);
  });
});
