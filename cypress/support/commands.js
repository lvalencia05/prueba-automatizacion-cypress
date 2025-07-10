/**
 * COMANDOS PERSONALIZADOS
 * 
 * Contiene comandos reutilizables para:
 * - Autenticación (loginWithPin)
 * - Validación de dashboard (validateDashboard)
 * - Búsqueda (searchShipment)
 * - Validación de resultados (validateShipmentResults)
 * - Validación de errores (validateLoginError, validateNoResults)
 * 
 * Mejoran la legibilidad y mantenimiento de las pruebas
 */
Cypress.Commands.add('loginWithPin', (digit1, digit2, digit3, digit4) => {
  cy.get('#digit1').type(digit1);
  cy.get('#digit2').type(digit2);
  cy.get('#digit3').type(digit3);
  cy.get('#digit4').type(digit4);
  cy.get('.mt-6').click();
});



Cypress.Commands.add('validateLoginError', () => {
  
  cy.get('p.text-red-500.text-sm', { timeout: 10000 })
    .should(($errorMsg) => {
      expect($errorMsg).to.be.visible;
      expect($errorMsg.text().trim()).to.equal('Código incorrecto. Por favor ingresa el código correcto para tener acceso');
    });
});

Cypress.Commands.add('validateNoResults', () => {
  
  cy.get('h3.text-center.text-lg.font-medium.mt-6')
    .should('be.visible')
    .and('contain', 'Sin datos para mostrar');
});

// Comandos de dashboard
Cypress.Commands.add('validateDashboard', () => {
  cy.get('.mt-6 > .font-extrabold')
    .should('be.visible')
    .and(($el) => {
      expect($el.text()).to.match(/Reporte de Embarques/i);
      expect($el).to.have.css('font-weight', '800');
    });
});

// Comandos de búsqueda
Cypress.Commands.add('searchShipment', (shipmentNumber) => {
  cy.get('app-atom-filter-tab > .flex').click();
  cy.get('span.items-center > .onclick_emitter > app-atom-select-input > .select-menu > .flex').click();
  cy.contains('p', 'Embarque')
    .should('be.visible')
    .click({ force: true });
  
  cy.get('app-molecule-general-search-select input[type="text"]')
    .should('be.visible')
    .clear()
    .type(`${shipmentNumber}{enter}`);
});

Cypress.Commands.add('validateShipmentResults', (expectedData) => {
  cy.get('#table-results-container', { timeout: 20000 })
    .should('be.visible')
    .and('not.contain', 'Cargando...')
    .within(() => {
      cy.contains('p.font-medium.truncate.text-sm', expectedData.text)
        .should('be.visible')
        .and('have.attr', 'title', expectedData.title);
    });
});