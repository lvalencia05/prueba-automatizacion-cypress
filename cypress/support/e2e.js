// Importaciones necesarias
import './commands'
require('@cypress/xpath');


// Configuraciones globales
beforeEach(() => {
  
  cy.clearLocalStorage()
})