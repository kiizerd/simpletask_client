import type React from "react";

interface FormWithErrors {
  clearErrors: () => void;
}

export const errorTimeout = (
  form: FormWithErrors,
  timeout: number = 10
): void => {
  timeout *= 1000;
  setTimeout(() => {
    form.clearErrors();
  }, timeout);
};

export const flushTextAreaCursor = (
  e: React.FocusEvent<HTMLTextAreaElement, HTMLElement>
): void => {
  const len = e.currentTarget.value.length;
  e.currentTarget.setSelectionRange(len, len);
};

export const preventTextAreaSubmitOnEnter = (
  e: React.KeyboardEvent<HTMLTextAreaElement>
): void => {
  if (e.key === "Enter" && !e.shiftKey) {
    const target = e.target as HTMLTextAreaElement;
    const form = target.form;
    e.preventDefault();
    form?.requestSubmit();
  }
};
