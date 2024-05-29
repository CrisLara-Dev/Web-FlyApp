// cypress/integration/app.spec.js
describe('Mi Primera Prueba', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200')
      });
    
    it('debería iniciar sesión con credenciales invalidas', () => {
        // Ingresar credenciales válidas
        cy.get('input[name="email"]').type('user@gmail.com');
        cy.get('input[name="password"]').type('user12345');
    
        // Enviar el formulario
        cy.get('button[type="submit"]').click();

         // Verificar que se muestre un mensaje de error
    cy.contains('Oops...').should('be.visible');
    cy.contains('¡Algo salió mal!').should('be.visible');

    });


    it('debería iniciar sesión con credenciales válidas', () => {
        // Ingresar credenciales válidas
        cy.get('input[name="email"]').type('zetagdcl@gmail.com');
        cy.get('input[name="password"]').type('holamundo12345');
    
        // Enviar el formulario
        cy.get('button[type="submit"]').click();
    });
    
  });
  