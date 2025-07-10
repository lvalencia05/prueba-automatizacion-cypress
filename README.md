Pruebas Automatizadas de Autenticación y Búsqueda

Este proyecto contiene pruebas automatizadas para validar el flujo de autenticación y búsqueda de embarques en una aplicación web de Selaski utilizando Cypress.

📋 Requisitos

Node.js v16+
Cypress v12+
Navegador Chrome o Edge instalado

🛠 Instalación
Clonar el repositorio:

bash
git clone [url-del-repositorio]
Instalar dependencias:

bash
npm install

🚀 Ejecución

Modo interactivo (interfaz gráfica):

bash
npx cypress open
Modo headless (consola):

bash
npx cypress run

🔍 Casos de Prueba

#	Nombre	                                                            Descripción
1	Login exitoso + búsqueda válida	- Autenticación con PIN válido
                                                                        - Validación del dashboard
                                                                        - Búsqueda y validación de embarque existente
2	Error con PIN inválido	                                            - Autenticación fallida
                                                                        - Validación de mensaje de error
3	Búsqueda sin resultados	- Búsqueda de embarque inexistente
                                                                        - Validación de mensaje "Sin datos para mostrar"

📊 Reportes y Evidencias

Screenshots: Se guardan automáticamente en cypress/screenshots/ (tanto para pruebas exitosas como fallidas)

Videos: Grabación completa de cada ejecución en cypress/videos/

Evidencias: Incluye capturas de los resultados más relevantes

🛠 Comandos Personalizados
Comando	                    Descripción
loginWithPin(d1,d2,d3,d4)	Autenticación con PIN de 4 dígitos
validateDashboard()	        Valida el dashboard después de login
searchShipment(num)	        Realiza búsqueda de embarque
validateShipmentResults
(data)                      Valida resultados de búsqueda
validateLoginError()	    Valida mensaje de PIN incorrecto
validateNoResults()	        Valida mensaje de "sin datos"


⚙ Configuración de Datos
El archivo test-data.json contiene:

json
{
  "baseUrl": "https://www.selaski.com/public/reports/shared?token=cdexd34d7a31da5257e1d5f7af80e21995f0dfen5",
  "validPin": { "digit1": "5", "digit2": "5", "digit3": "6", "digit4": "9" },
  "invalidPin": "0",
  "validShipment": "Prueba 1",
  "validShipmentExpected": { "title": "Prueba 1-02", "text": "Prueba 1-02" },
  "nonExistentShipment": "No-3546"
}
📁 Estructura del Proyecto
text
/cypress/
├── /e2e/
│   └── authentication.cy.js       # Casos de prueba principales
├── /fixtures/
│   └── test-data.json            # Datos de prueba
├── /screenshots/                 # Capturas automáticas
├── /videos/                      # Grabaciones de ejecución
├── /support/
│   ├── commands.js               # Comandos personalizados
│   └── e2e.js                  # Configuraciones globales
cypress.config.js                 # Configuración principal

📄 Documentación Técnica
authentication.cy.js
javascript

/**
 * PRUEBAS DE AUTENTICACIÓN Y BÚSQUEDA
 * Contiene 3 casos de prueba end-to-end:
 * 1. Login exitoso + búsqueda válida
 * 2. Error con PIN inválido
 * 3. Búsqueda sin resultados
 * 
 * Configuración:
 * - beforeEach: Visita la URL y espera el campo de PIN
 * - afterEach: Captura screenshot si el test pasa
 * 
 * Datos: Importa test-data.json para valores de prueba
 */

commands.js
javascript

/**
 * COMANDOS PERSONALIZADOS
 * Contiene comandos reutilizables para:
 * - Autenticación (loginWithPin)
 * - Validación de dashboard (validateDashboard)
 * - Búsqueda (searchShipment)
 * - Validación de resultados (validateShipmentResults)
 * - Validación de errores (validateLoginError, validateNoResults)
 */

test-data.json
javascript

/**
 * DATOS DE PRUEBA
 * Estructura:
 * - baseUrl: URL de la aplicación
 * - validPin: Objeto con los 4 dígitos del PIN válido
 * - invalidPin: PIN incorrecto
 * - validShipment: Número de embarque existente
 * - validShipmentExpected: Resultado esperado de búsqueda
 * - nonExistentShipment: Número de embarque inexistente
 * 
 * Modificación: Ajustar valores según entorno de prueba
 */

cypress.config.js
javascript

/**
 * CONFIGURACIÓN PRINCIPAL
 * Ajustes clave:
 * - Timeouts: 10 segundos para comandos
 * - Viewport: 1280x720
 * - Videos: Habilitados con compresión
 * - Screenshots: Habilitados para fallos
 * - Plugins: Se pueden añadir listeners de eventos
 */