export type EmailMessage = {
  from?: string;
  to: string[];
  subject: string;
  html: string;
};
