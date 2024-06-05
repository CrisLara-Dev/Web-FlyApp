describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Añadir Usuario", () => {
    
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

    cy.get('button[name="auser"]').click();
    cy.url().should("include", "/crear-users");

    cy.screenshot("Formulario Usuario Srenellado");
    cy.wait(2000);

    cy.contains("Añadir Usuario").should("be.visible");
    cy.get('select[name="trabajador"]').select("usuarioprueba4 Lara Arcos");
    cy.get('select[name="rol"]').select("Administrador");
    cy.get('input[name="email"]').type("sovan96123@gmail.com");
    cy.get('input[name="contra"]').type("uxyhsxss111");
    cy.get('button[name="buscardni"]').click();
    cy.wait(2000);

    cy.screenshot("Formulario Usuario Rellenado");
    cy.wait(3000);

    cy.get('input[name="bususer"]').type("sovan96123@gmail.com"); 

    cy.screenshot("Usuario Añadido");
    cy.wait(1000);

  });
});
