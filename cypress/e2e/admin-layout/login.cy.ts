// cypress/integration/app.spec.js
describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
    cy.screenshot("Login");
  });

  it("Credenciales inválidas", () => {

    cy.wait(1000);
    cy.get('input[name="email"]').type("user@gmail.com");
    cy.get('input[name="password"]').type("user12345");
    cy.get('button[type="submit"]').click();
    
    cy.screenshot('Incorrecto');
    cy.wait(2000);
  });

  it("Credenciales con rol no permitido", () => {

    cy.get('input[name="email"]').type("piloto@gmail.com");
    cy.get('input[name="password"]').type("holamundo12345");
    cy.get('button[type="submit"]').click();

    cy.screenshot('Prohibido');
    cy.wait(2000);
  });

  it("Credenciales válidas", () => {

    cy.get('input[name="email"]').type("zetagdcl@gmail.com");
    cy.get('input[name="password"]').type("holamundo12345");
    cy.get('button[type="submit"]').click();

    cy.screenshot('Correcto');
    cy.wait(2000);

    cy.get(".navbar .media .media-body span").should("be.visible");
    cy.get(".navbar .media .media-body span").click();
    cy.get(".dropdown-menu-arrow").should("be.visible"); 

    cy.screenshot('Cerrar');
    cy.wait(2000);

    cy.contains("Cerrar Sesión"); 
    cy.get('button[name="cerrar"]').click();
    cy.url().should("include", "/login");
    
    cy.wait(1000);
  });
});
