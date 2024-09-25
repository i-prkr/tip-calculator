export default class Form {
  constructor() {
    this.fields = [];
    this.validations = [];
    this.state = false;
    this.submit = () => {};
  }

  addField({type, key, value, element, errors, valid}) {
    const field = {
      type,
      key,
      value,
      element,
      errors,
      valid
    };
    this.fields.push(field);
  }

  addValidation(validation) {
    this.validations.push(validation);
  }

  printForm() {
    console.log(`Fields: ${this.fields}`)
    console.log(`validations: ${this.validations}`)
  }

  submit(){}

  reset(){}

  validateInputs(){}
}
