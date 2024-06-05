describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Editar Tipo de Vuelo", () => {

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

    cy.get('input[name="buscarvu"]').type("Prueba"); 

    cy.screenshot("Buscar Vuelo Seditar");
    cy.wait(1000);

    cy.contains("Prueba").parents("tr").within(() => {
        cy.get(".btn.btn-sm.btn-icon-only.text-light").click(); 
      });
    cy.wait(1000);
    
    cy.get('button[name="edivu"]').click();
    cy.wait(2000);
    
    cy.get('input[name="tipo"]').clear().type("Hola");
    cy.get('input[name="precio"]').clear().type("500");
    cy.get('input[name="tiempo"]').clear().type("20");
    cy.get('select[name="estado"]').select("Inactivo");
    cy.get('button[name="evuelo"]').click();

    cy.screenshot("Formulario Editar Vuelo");
    cy.wait(3000);

    cy.contains('Tipos de Vuelo').scrollIntoView();
    cy.wait(1000);

    cy.get('input[name="buscarvu"]').clear().type("Hola");
   
    cy.screenshot("Buscar Vuelo Editado");
    cy.wait(1000);
  });
});
