import { deleteCookie, setCookie } from '../../../src/utils/cookie';
import { SELECTORS } from '../../support/selectors';

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
    cy.visit('/');
    cy.wait('@getUser');
  });

  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('должен загружать страницу конструктора и отображать ингредиенты', () => {
    cy.wait('@getIngredients');
    cy.contains('Соберите бургер').should('be.visible');
    cy.get(`[data-cy="${SELECTORS.INGREDIENT_ITEM}"]`).should('have.length.greaterThan', 0);
  });

  it('должен добавлять ингредиенты в конструктор', () => {
    cy.wait('@getIngredients');
    cy.get(`[data-cy="${SELECTORS.INGREDIENT_ITEM}"][data-type="bun"]`).first().within(() => {
      cy.get(`${SELECTORS.ADD_BUTTON}`).click();
    });
    cy.get(`[data-cy="${SELECTORS.INGREDIENT_ITEM}"][data-type="main"]`).first().within(() => {
      cy.get(`${SELECTORS.ADD_BUTTON}`).click();
    });
    cy.get(`[data-cy="${SELECTORS.INGREDIENT_ITEM}"][data-type="sauce"]`).first().within(() => {
      cy.get(`${SELECTORS.ADD_BUTTON}`).click();
    });
    cy.get(`[data-cy="${SELECTORS.CONSTRUCTOR}"]`).should('contain', 'верх').and('contain', 'низ');
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    cy.wait('@getIngredients');
    cy.get(`[data-cy="${SELECTORS.INGREDIENT_ITEM}"]`).first().click();
    cy.get(`[data-cy="${SELECTORS.MODAL}"]`).should('be.visible');
    cy.get(`[data-cy="${SELECTORS.MODAL}"]`).within(() => {
      cy.get('img')
        .should('have.attr', 'src')
        .and('include', 'bun-02-large.png');
      cy.contains('Краторная булка N-200i').should('be.visible');
      cy.contains('80').should('be.visible');
      cy.contains('24').should('be.visible');
      cy.contains('53').should('be.visible');
      cy.contains('420').should('be.visible');
    });
    cy.get(`[data-cy="${SELECTORS.MODAL_CLOSE}"]`).click();
    cy.get(`[data-cy="${SELECTORS.MODAL}"]`).should('not.exist');
  });

  it('должен закрывать модальное окно ингредиента клавишей Escape', () => {
    cy.wait('@getIngredients');
    cy.get(`[data-cy="${SELECTORS.INGREDIENT_ITEM}"]`).first().click();
    cy.get(`[data-cy="${SELECTORS.MODAL}"]`).should('be.visible');
    cy.get('body').type('{esc}');
    cy.get(`[data-cy="${SELECTORS.MODAL}"]`).should('not.exist');
  });

  it('должен оформлять заказ и проверять модальное окно', () => {
    cy.wait('@getIngredients');
    cy.get(`[data-cy="${SELECTORS.INGREDIENT_ITEM}"][data-type="bun"]`).first().within(() => {
      cy.get(`${SELECTORS.ADD_BUTTON}`).click();
    });
    cy.get(`[data-cy="${SELECTORS.INGREDIENT_ITEM}"][data-type="main"]`).first().within(() => {
      cy.get(`${SELECTORS.ADD_BUTTON}`).click();
    });
    cy.get(`[data-cy="${SELECTORS.INGREDIENT_ITEM}"][data-type="sauce"]`).first().within(() => {
      cy.get(`${SELECTORS.ADD_BUTTON}`).click();
    });
    cy.get(`[data-cy="${SELECTORS.CONSTRUCTOR}"]`).should('contain', 'верх').and('contain', 'низ');
    cy.get(`[data-cy="${SELECTORS.ORDER_BUTTON}"]`).click();
    cy.wait('@placeOrder');
    cy.get(`[data-cy="${SELECTORS.MODAL}"]`).should('be.visible');
    cy.contains('Space Burger').should('be.visible');
    cy.contains('37865').should('be.visible');
    cy.get(`[data-cy="${SELECTORS.MODAL_CLOSE}"]`).click();
    cy.get(`[data-cy="${SELECTORS.MODAL}"]`).should('not.exist');
    cy.get(`[data-cy="${SELECTORS.CONSTRUCTOR}"]`).should('not.contain', 'верх').and('not.contain', 'низ');
  });
});
