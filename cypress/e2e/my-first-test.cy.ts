// cypress/integration/app.spec.js
describe('Mi Primera Prueba', () => {
    before(() => {
        cy.visit('http://localhost:4200')
    })
    
    it('El botón es visible', () => {
        cy.contains('Iniciar Sesión');  
    })

    it('EL enlace es visible', () => {
        cy.visit('http://localhost:4200')
        cy.contains('¿Has olvidado tu contraseña?');  
    })
  });
  