interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplateDTO {
  template: string;
  variables: ITemplateVariables;
}

export default IParseMailTemplateDTO;
