import assert from "assert";
import { styleText } from "util";
class RegisterForm {
  elements = {
    titleInput: () => cy.get("#title"),
    titleFeedBack: () => cy.get("#titleFeedback"),
    imageUrlInput: () => cy.get("#imageUrl"),
    urlFeedBack: () => cy.get("#urlFeedback"),
    submitBtn: () => cy.get("#btnSubmit"),
  };

  typeTitle(text) {
    if (!text) return;
    this.elements.titleInput().type(text);
  }

  typeUrl(text) {
    if (!text) return;
    this.elements.imageUrlInput().type(text);
  }

  clickSubmit() {
    this.elements.submitBtn().click();
  }
}

const registerForm = new RegisterForm();

describe("Image Registration", () => {
  after(() => {
    cy.clearAllLocalStorage();
  });

  const input = {
    title: "",
    url: "",
  };

  const colors = {
    errors: "rgb(220, 53, 69)",
    sucess: "rgb(220, 53, 69s)",
  };

  it("Given I am on the image registration page", () => {
    cy.visit("/");
  });

  it(`When I enter "${input.title}" in the title field`, () => {
    registerForm.typeTitle(input.text);
  });

  it(`When I enter "${input.url}" in the url field`, () => {
    registerForm.typeUrl(input.url);
  });

  it(`Then I click the submit button`, () => {
    registerForm.clickSubmit();
  });

  it(`Then I should see "Please type a title for the image" message above the title field`, () => {
    registerForm.elements
      .titleFeedBack()
      .should("contains.text", "Please type a title for the image");
    // registerForm.elements.titleFeedBack().should((elements) => {
    //   debugger;
    // });
  });

  it(`And I should see "Please type a valid URL" message above the imageUrl field`, () => {
    registerForm.elements
      .urlFeedBack()
      .should("contains.text", "Please type a valid URL");
  });
  it(`And I should see an exclamation icon in the title and URL fields`, () => {
    registerForm.elements.titleInput().should(([elements]) => {
      const styles = window.getComputedStyle(elements);
      const border = styles.getPropertyValue("border-right-color");
      assert.strictEqual(border, colors.errors);
    });
  });
});

describe("Submitting an image", () => {
  const colors = {
    errors: "rgb(220, 53, 69)",
    sucess: "rgb(220, 53, 69s)",
  };

  after(() => {
    cy.clearAllLocalStorage();
  });

  it("Given I am on the image registration page", () => {
    cy.visit("/");
  });

  it("When I enter 'Alien BR' in the title field", () => {
    // registerForm.typeTitle("Alien BR");
  });

  it("Then I should see a check icon in the title field", () => {
    // registerForm.elements.titleInput().should(([elements]) => {
    //   const style = window.getComputedStyle(elements);
    //   const border = style.getPropertyValue("border-right-color");
    //   assert.strictEqual(border, colors.errors);
    // });
  });

  it("The i enter in the url field", () => {
    // registerForm.typeUrl(
    //   "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg"
    // );
  });

  it("Then I can hit enter to submit the form", () => {
    // registerForm.elements.submitBtn().click();
  });

  it("Veja se o placeholder do title tem 'Image Title'", () => {
    registerForm.elements.titleInput().should(([elements]) => {
      const placeholder = elements.placeholder === "Image Title";
      assert.strictEqual(placeholder, true);
    });
  });
});
