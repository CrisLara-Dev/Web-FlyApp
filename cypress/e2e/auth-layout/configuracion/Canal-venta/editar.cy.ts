describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Editar Canal de Venta", () => {

    cy.wait(1000);

    // Ingresar credenciales válidas para iniciar sesión
    cy.get('input[name="email"]').type("zetagdcl@gmail.com");
    cy.get('input[name="password"]').type("holamundo12345");
    cy.get('button[type="submit"]').click();

    cy.wait(4000);

    // Verificar que se redirija al dashboard después de iniciar sesión
    cy.url().should("include", "/dashboard");

    // Hacer clic en la opción de configuración
    cy.contains("Configuración").click();

    // Esperar a que la página de configuración se cargue
    cy.url().should("include", "/config");

    // Desplázate hacia abajo hasta la tabla "Tipo de Vuelo"
    cy.contains('Canal de Venta').scrollIntoView();

    cy.wait(1000);

    // Buscar el tipo de vuelo antes de eliminarlo
    cy.get('input[name="buscar"]').type("Prueba"); // Cambia "Prueba10" al nombre del tipo de vuelo que quieres eliminar

    cy.wait(1000);

    // Localizar la fila que contiene el tipo de vuelo "Prueba10" y hacer clic en el icono de menú (tres puntos)
    cy.contains("Prueba").parents("tr").within(() => {
        cy.get(".btn.btn-sm.btn-icon-only.text-light").click(); // Seleccionar el botón de menú desplegable
      });

    cy.wait(1000);
    
    // Hacer clic en la opción "Eliminar" del menú desplegable
    cy.contains("Editar").click();

    cy.wait(2000);
    
    // Limpiar y escribir en el campo "Tiempo (minutos)"
    cy.get('input[name="nombre"]').clear().type("Hola");

    // Llenar los campos del formulario
    cy.get('select[name="estado"]').select("Inactivo");
    // Enviar el formulario presionando el botón de añadir
    cy.get('button[name="acanales"]').click();

    cy.wait(3000);

    cy.get('input[name="buscarca"]').clear().type("Hola");


  });
});
