describe("Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("Añadir Promociones", () => {
    
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
    cy.contains('Promociones').scrollIntoView();

    cy.wait(1000);

    // Hacer clic en el botón de añadir en la tabla de tipo de vuelo
    cy.get('button[name="apro"]').click();

    // Esperar a que la página de configuración se cargue
    cy.url().should("include", "/crear-promociones");

    cy.wait(2000);

    // Verificar que el formulario de añadir tipo de vuelo se muestre
    cy.contains("Añadir Promoción").should("be.visible");

    // Llenar los campos del formulario
    cy.get('input[name="codigo"]').type("Fly-005");
    cy.get('input[name="porcentaje"]').type("50");
    cy.get('input[name="fecha_inicio"]').type("2024-06-02");
    cy.get('input[name="fecha_fin"]').type("2024-06-14");


    // Enviar el formulario presionando el botón de añadir
    cy.get('button[name="apromo"]').click();

    cy.wait(3000);

    cy.get('input[name="buscarpro"]').type("Fly-005"); // Cambia "Prueba10" al nombre del tipo de vuelo que quieres eliminar

    // cy.screenshot("Create Vuelo");

  });
});
