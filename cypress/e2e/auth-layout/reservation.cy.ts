// cypress/integration/app.spec.js
describe('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/#/reservation')
      });

      it('Crear ', () => {

        // Ingresar credenciales inválidas
        cy.get('input[name="email"]').type('user@gmail.com');
        cy.get('input[name="password"]').type('user12345');
      
        // Enviar el formulario
        cy.get('button[type="submit"]').click();
  
        // Esperar
        cy.wait(2000);
  
        // Capturar un screenshot
        //cy.screenshot('Cred-inva');
      });
  

    it('Credenciales inválidas', () => {

      // Ingresar credenciales inválidas
      cy.get('input[name="email"]').type('user@gmail.com');
      cy.get('input[name="password"]').type('user12345');
    
      // Enviar el formulario
      cy.get('button[type="submit"]').click();

      // Esperar
      cy.wait(2000);

      // Capturar un screenshot
      //cy.screenshot('Cred-inva');
    });

    it('Credenciales con rol no permitido', () => {

      // Ingresar credenciales inválidas
      cy.get('input[name="email"]').type('piloto@gmail.com');
      cy.get('input[name="password"]').type('holamundo12345');
    
      // Enviar el formulario
      cy.get('button[type="submit"]').click();

      // Esperar
      cy.wait(2000);

      // Capturar un screenshot
      //cy.screenshot('Cred-inva');
    });
    
    it('Credenciales válidas', () => {

      // Ingresar credenciales válidas
      cy.get('input[name="email"]').type('zetagdcl@gmail.com');
      cy.get('input[name="password"]').type('holamundo12345');
    
      // Enviar el formulario
      cy.get('button[type="submit"]').click();

      // Esperar
      cy.wait(2000);

      // Capturar un screenshot
      //cy.screenshot('Cred-va');
    });
     
  });
  