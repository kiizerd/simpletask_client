interface FormWithErrors {
  clearErrors(): void;
}

export const errorTimeout = (form: FormWithErrors, timeout?: number) => {
  setTimeout(() => form.clearErrors(), timeout ? timeout : 5000)
};
