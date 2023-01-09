import React from "react";

interface FormWithErrors {
  clearErrors(): void;
}

export const errorTimeout = (form: FormWithErrors, timeout?: number) => {
  setTimeout(() => form.clearErrors(), timeout ? timeout : 5000)
};

export const flushTextAreaCursor = (e: React.FocusEvent<HTMLTextAreaElement, HTMLElement>) => {
  const len = e.currentTarget.value.length;
  e.currentTarget.setSelectionRange(len, len);
}

export const preventTextAreaSubmitOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key == "Enter" && !e.shiftKey) {
    const target = e.target as HTMLTextAreaElement;
    const form = target.form;
    e.preventDefault();
    form?.requestSubmit();
  }
}
