import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

interface IMailTemplateProvider {
  parse(mailTemplate: IParseMailTemplateDTO): Promise<string>;
}

export default IMailTemplateProvider;
