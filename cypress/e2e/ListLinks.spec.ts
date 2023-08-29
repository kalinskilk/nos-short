/// <reference path='../support/index.d.ts' />

describe("ListLinkWorks", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();

    cy.visit("/home");
    cy.url().should("match", /home/);

    cy.intercept(
      "POST",
      "https://url.api.stdlib.com/temporary@0.3.0/create"
    ).as("short-link");

    cy.get("input").type("https://google.com");

    cy.get(".btn-icon").click();
    cy.get(".spinner").should("be.visible");
    cy.wait("@short-link");

    cy.get(".list-link > .label-subs").click();

    cy.url().should("match", /list-links/);
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("Visit List links and validate icons", () => {
    cy.get(".detail-container > :nth-child(1)").should(
      "contain.text",
      "https://google.com"
    );
    cy.get(".detail-container > :nth-child(3)").should(
      "contain.text",
      "Expira em:  6 dias 23 horas 59 minutos"
    );

    cy.get(".btn-icon")
      .find("img")
      .should("have.attr", "src")
      .should("include", "Clipboard.svg");

    cy.get(".btn-icon").click();
    cy.wait(200);

    cy.get(".Toastify__toast-body").should("be.visible");

    cy.get(".btn-icon")
      .find("img")
      .should("have.attr", "src")
      .should("include", "Check.svg");

    cy.wait(5000);

    cy.get(".btn-icon")
      .find("img")
      .should("have.attr", "src")
      .should("include", "Clipboard.svg");

    cy.get(".Toastify__toast-body").should("not.be.visible");

    cy.get(".trash-icon")
      .find("img")
      .should("have.attr", "src")
      .should("include", "Trash.svg");
  });

  it("Should error at remove link", () => {
    cy.intercept(
      "https://url.api.stdlib.com/temporary@0.3.0/destroy",
      { times: 1 },
      {
        statusCode: 500,
        delay: 1000,
        failOnStatusCode: true,
      }
    ).as("destroy-link-error");

    cy.get(":nth-child(2) > .trash-icon > .img-icon").click();
    cy.get(":nth-child(2) > .spinner").should("be.visible");
    cy.wait("@destroy-link-error");

    cy.get(".Toastify__toast-body").should("be.visible");
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "contain.text",
      "Falha ao remover link. Tente novamente."
    );
  });

  it("Should remove link", () => {
    cy.intercept(
      "POST",
      "https://url.api.stdlib.com/temporary@0.3.0/destroy"
    ).as("destroy-link");

    cy.get(":nth-child(2) > .trash-icon > .img-icon").click();
    cy.wait("@destroy-link");

    cy.get(".back-links").click();
    cy.url().should("match", /home/);
  });
});
