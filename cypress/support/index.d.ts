//load type definitions from Cypress module
/// <reference types="Cypress" />
/* import { DocumentNode } from 'graphql'; */

declare namespace Cypress {
  interface Chainable<Subject> {
    saveLocalStorage(): Chainable<Element>;
    restoreLocalStorage(): Chainable<Element>;
  }
}
