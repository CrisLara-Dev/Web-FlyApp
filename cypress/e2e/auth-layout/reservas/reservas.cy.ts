// cypress/integration/app.spec.js
describe('Reservation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200')
      });
    
    it('Ingreso', () => {

      // Ingresar credenciales válidas
      cy.get('input[name="email"]').type('zetagdcl@gmail.com');
      cy.get('input[name="password"]').type('holamundo12345');
    
      // Enviar el formulario
      cy.get('button[type="submit"]').click();

      // Esperar
      // cy.wait(2000);

      // Capturar un screenshot
      // cy.screenshot('Cred-va');

      it('Crear tipo de vuelo', () => {
        cy.visit('http://localhost:4200/#/config/')

        // Hacer clic en el botón de añadir en la tabla de tipo de vuelo
        cy.get('button[name="tvuelo"]').click();

        // Verificar que el formulario de añadir tipo de vuelo se muestre
        cy.contains('Formulario de Añadir Tipo de Vuelo').should('be.visible');

        // Llenar los campos del formulario
        cy.get('input[name="nombre"]').type('Fly prueba');
        cy.get('input[name="precio"]').type('200');
        cy.get('input[name="tiempo"]').type('22');

        // Enviar el formulario presionando el botón de añadir
        cy.get('button[name="avuelo"]').click();

        // Verificar que se haya añadido correctamente (puede variar según la implementación)
        cy.contains('Tipo de Vuelo añadido exitosamente').should('be.visible');

      });
    });
     
  });
  

