import * as yup from "yup";

export const uploadSchema = yup.object().shape({
  group: yup.string().required("Group name is required!"),
  file: yup.mixed().required("File is required!"),
});

export const userSchema = yup.object().shape({
  sender: yup.string().required("Sender name is required"),
});

export const domainSchema = yup.object().shape({
  domain: yup.string().required("Domain name is required"),
  selector: yup.string().required("Key Selector name is required"),
  dkim: yup.mixed().required("File is required!"),
});

export const contactSchema = yup.object().shape({
  sender: yup.string().required("Sender address is required."),
  subject: yup.string().required("Subject of mail is required."),
  receiver: yup.string().required("Select list of receiver's."),
  campaign: yup.string().required("Name of campaign is required."),
  domain: yup.string().required("Domain is required."),
});

export const mailSchema = yup.object().shape({
  sender: yup.string().required("Sender address is required."),
  subject: yup.string().required("Subject of mail is required."),
  receiver: yup.string().required("Select list of receiver's."),
  campaign: yup.string().required("Name of campaign is required."),
  html: yup.string().required("Html is required."),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Please type an email..."),
  password: yup.string().min(6).required("Please enter a password..."),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email().required("Please type an email..."),
  password: yup.string().min(6).required("Please enter a password..."),
  cpassword: yup.string().oneOf([yup.ref("password"), null]),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required("Please type an email..."),
});
