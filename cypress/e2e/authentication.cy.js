describe("Prueba Técnica: Autenticación y Búsqueda de Embarque", () => {
  const testData = require('../fixtures/test-data.json');

  beforeEach(() => {
    cy.visit(testData.baseUrl, {
      timeout: 30000,
      failOnStatusCode: false
    });
    cy.get('#digit1', { timeout: 15000 }).should('be.visible');
  });

  afterEach(function() {
    if (this.currentTest.state === 'passed') {
      // Captura de pantalla si el test pasa
      const screenshotName = `${this.currentTest.title.replace(/\s+/g, '-').toLowerCase()}`;
      cy.screenshot(screenshotName, { capture: 'runner' });
    }
  });

  it("1. Login exitoso con PIN válido + búsqueda de embarque válido", () => {
    cy.loginWithPin(
      testData.validPin.digit1,
      testData.validPin.digit2,
      testData.validPin.digit3,
      testData.validPin.digit4
    );

    cy.validateDashboard();

    cy.searchShipment(testData.validShipment);
    cy.validateShipmentResults(testData.validShipmentExpected);
  });

  it("2. Error con PIN inválido", () => {
    
    cy.loginWithPin(
      testData.validPin.digit1,
      testData.validPin.digit2,
      testData.validPin.digit3,
      testData.invalidPin
    );

    // Assertion
    cy.get('p.text-red-500.text-sm', { timeout: 10000 })
      .should(($errorMsg) => {
        expect($errorMsg).to.be.visible;
        expect($errorMsg.text().trim()).to.equal('Código incorrecto. Por favor ingresa el código correcto para tener acceso');
      });
  });

  it("3. Error al buscar embarque no existente", () => {
    cy.loginWithPin(
      testData.validPin.digit1,
      testData.validPin.digit2,
      testData.validPin.digit3,
      testData.validPin.digit4
    );

    cy.validateDashboard();

    cy.searchShipment(testData.nonExistentShipment);
    
    // Assertion
    cy.get('h3.text-center.text-lg.font-medium.mt-6')
      .should('be.visible')
      .and('contain', 'Sin datos para mostrar');
  });
});