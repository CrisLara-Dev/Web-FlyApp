describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Editar Promociones", () => {

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

    cy.get('input[name="buscarpro"]').type("Fly-Prueba");

    cy.screenshot("Buscar Promo Seditar");
    cy.wait(1000);

    cy.contains("Fly-Prueba").parents("tr").within(() => {
        cy.get(".btn.btn-sm.btn-icon-only.text-light").click(); 
      });
    cy.wait(1000);
    
    cy.get('button[name="edipro"]').click();
    cy.wait(2000);
    
    cy.get('input[name="codigo"]').clear().type("Fly-Editado");
    cy.get('input[name="porcentaje"]').clear().type("80");
    cy.get('input[name="fecha_inicio"]').clear().type("2024-06-06");
    cy.get('input[name="fecha_fin"]').clear().type("2024-06-25");
    cy.get('select[name="estado"]').select("Inactivo");
    cy.get('button[name="edipromo"]').click();

    cy.screenshot("Formulario Editar Promo");
    cy.wait(3000);

    cy.contains('Promociones').scrollIntoView();
    cy.wait(1000);

    cy.get('input[name="buscarpro"]').clear().type("Fly-Editado");
    
    cy.screenshot("Buscar Promo Editado");
    cy.wait(1000);
  });
});
