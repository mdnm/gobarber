interface IMailProvider {
  sendMail(to: string, body: string): Promise<void>;
}

export default IMailProvider;
