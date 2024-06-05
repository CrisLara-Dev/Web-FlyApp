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
    cy.contains("Usuarios").click();
    cy.url().should("include", "/users");
    cy.contains('Usuarios').scrollIntoView();
    cy.wait(1000);

    cy.get('input[name="bususer"]').type("sovan96123@gmail.com"); 

    cy.screenshot("Buscar Usuario Seditar");
    cy.wait(1000);

    cy.contains("sovan96123@gmail.com").parents("tr").within(() => {
        cy.get(".btn.btn-sm.btn-icon-only.text-light").click(); 
      });
    cy.wait(1000);
    
    cy.get('button[name="ediuser"]').click();
    cy.wait(3000);
    
    cy.get('select[name="rol"]').clear().type("Piloto");
    cy.get('input[name="email"]').clear().type("xelo@gmail.com");
    cy.get('select[name="estado"]').clear().type("Inactivo");
    cy.get('button[name="editaruser"]').click();

    cy.screenshot("Formulario Editar Usuario");
    cy.wait(3000);

    cy.contains('Usuarios').scrollIntoView();
    cy.wait(1000);

    cy.get('input[name="bususer"]').clear().type("xelo@gmail.com");
   
    cy.screenshot("Buscar Trabajador Editado");
    cy.wait(1000);
  });
});
