import { URL } from '@api';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';

describe('Constructor Page E2E Test', () => {
  beforeEach(() => {
    setCookie(
      'accessToken',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjMxMDE2NiwiZXhwIjoxNzEyMzExMzY2fQ.v7kdecJvLfdmlBsvf_BySvsfnXX3K0Er__GNYw-NRLM'
    );
    localStorage.setItem(
      'refreshToken',
      '9cbdd5b777edfb92bd9183a7cf2372a12b545c045a9796f94c1afd0b9d374a8794aa15bee20a7556'
    );
    cy.intercept('GET', `**/auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', `**/ingredients`, { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', `**/orders`, { fixture: 'order.json' }).as(
      'placeOrder'
    );
    cy.intercept('POST', `**/auth/login`, { fixture: 'login.json' }).as(
      'login'
    );
    cy.visit('http://localhost:4000');
    cy.wait('@getUser');
  });

  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('должен загружать страницу конструктора и отображать ингредиенты', () => {
    cy.wait('@getIngredients');
    cy.contains('Соберите бургер').should('be.visible');
    cy.get('[data-cy="ingredient-item"]').should('have.length.greaterThan', 0);
  });

  it('должен добавлять ингредиенты в конструктор', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-item"][data-type="bun"]').first().as('bun');
    cy.get('@bun').find('[data-cy="add-button"]').click();
    cy.get('[data-cy="ingredient-item"][data-type="main"]').first().as('main');
    cy.get('@main').find('[data-cy="add-button"]').click();
    cy.get('[data-cy="ingredient-item"][data-type="sauce"]').first().as('sauce');
    cy.get('@sauce').find('[data-cy="add-button"]').click();
    cy.get('[data-cy="constructor"]').should('contain', 'верх').and('contain', 'низ');
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('должен оформлять заказ и проверять модальное окно', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-item"][data-type="bun"]').first().as('bun');
    cy.get('@bun').find('[data-cy="add-button"]').click();
    cy.get('[data-cy="ingredient-item"][data-type="main"]').first().as('main');
    cy.get('@main').find('[data-cy="add-button"]').click();
    cy.get('[data-cy="ingredient-item"][data-type="sauce"]').first().as('sauce');
    cy.get('@sauce').find('[data-cy="add-button"]').click();
    cy.get('[data-cy="constructor"]').should('contain', 'верх').and('contain', 'низ');
    cy.get('[data-cy="order-button"]').click();
    cy.wait('@placeOrder');
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.contains('Space Burger').should('be.visible');
    cy.contains('37865').should('be.visible');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="constructor"]').should('not.contain', 'верх').and('not.contain', 'низ');
  });
});
