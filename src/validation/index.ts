import * as yup from "yup";

export const schemaLogin = yup.object({
  identifier: yup
    .string()
    .required("Email Is Required")
    .email("Enter Vaild Email ex:kkk@kkk.com"),
  password: yup
    .string()
    .required("Password Is Required")
    .min(6, "Enter At Least 6 Number Or Character"),
});
export const schemaAdd = yup.object({
  title: yup
    .string()
    .required("Title  Is Required")
    .min(5, "Enter At Least 5 Character"),
  descrption: yup
    .string()
    .required("Descrption Is Required")
    .min(5, "Enter At Least 5 Character"),
  price: yup
    .number()
    .required("Price Is Required")
    .min(2, "Enter At Least 2 Number"),
  stock: yup
    .number()
    .required("Stock Is Required")
    .min(2, "Enter At Least 2 Number"),
});
