/// <reference path='../support/index.d.ts' />

describe("HomeWorks", () => {
  it("Visit home page", () => {
    cy.visit("/home");
    cy.url().should("match", /home/);
  });

  it("Should initials values", () => {
    cy.visit("/home");
    cy.get("input").should("have.value", "");
    cy.get(".btn-icon").should("be.disabled");

    cy.get(".btn-icon")
      .find("img")
      .should("have.attr", "src")
      .should("include", "Link.svg");
  });

  it("Should display error on short", () => {
    cy.visit("/home");

    cy.intercept(
      "https://url.api.stdlib.com/temporary@0.3.0/create",
      { times: 1 },
      {
        statusCode: 500,
        delay: 1000,
        failOnStatusCode: true,
      }
    ).as("short-link-error");

    cy.get("input").type("https://google.com");

    cy.get(".btn-icon").click();
    cy.get(".spinner").should("be.visible");
    cy.wait("@short-link-error");

    cy.wait(200);

    cy.get(".Toastify__toast-body").should("be.visible");
    cy.get(".Toastify__toast-body > :nth-child(2)").should(
      "contain.text",
      "Falha ao encurtar link. Tente novamente."
    );
  });

  it("Should short link", () => {
    cy.intercept("POST", "https://url.api.stdlib.com/temporary@0.3.0/create", {
      delay: 2000,
      statusCode: 200,
      body: {
        key: "vFbvj96",
        link_url: "https://url.dev/vFbvj96/",
        ttl: 604800,
        url: "https://google.com",
      },
    }).as("short-link");

    cy.visit("/home");
    cy.get("input").type("https://google.com");
    cy.get(".btn-icon").click();
    cy.get(".spinner").should("be.visible");
    cy.wait("@short-link");
    cy.get(".label-prepend").should("have.text", "https://url.dev/vFbvj96/");

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

    cy.get(":nth-child(2) > .label-subs").should("be.visible");
  });
});
