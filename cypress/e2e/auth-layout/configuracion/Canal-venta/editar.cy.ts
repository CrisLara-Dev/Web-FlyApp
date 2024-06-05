describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Editar Canal de Venta", () => {

    cy.wait(1000);
    cy.get('input[name="email"]').type("zetagdcl@gmail.com");
    cy.get('input[name="password"]').type("holamundo12345");
    cy.get('button[type="submit"]').click();
    cy.wait(4000);

    cy.url().should("include", "/dashboard");
    cy.contains("Configuración").click();
    cy.url().should("include", "/config");
    cy.contains('Canales de Venta').scrollIntoView();
    cy.wait(1000);

    cy.get('input[name="buscarca"]').type("Prueba"); 
    
    cy.screenshot("Buscar Canal Seditar");
    cy.wait(1000);

    cy.contains("Prueba").parents("tr").within(() => {
        cy.get(".btn.btn-sm.btn-icon-only.text-light").click(); 
      });
    cy.wait(1000);
    
    cy.get('button[name="edicanal"]').click();
    cy.wait(2000);
    
    cy.get('input[name="nombre"]').clear().type("Prueba-Editado");
    cy.get('select[name="estado"]').select("Inactivo");
    cy.get('button[name="editarcanal"]').click();

    cy.screenshot("Formulario Editar Canal");
    cy.wait(3000);

    cy.contains('Canales de Venta').scrollIntoView();
    cy.wait(1000);

    cy.get('input[name="buscarca"]').clear().type("Prueba-Editado");

    cy.screenshot("Buscar Canal Editado");
    cy.wait(1000);
  });
});
