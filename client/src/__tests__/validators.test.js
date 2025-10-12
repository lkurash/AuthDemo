import { describe, it, expect } from "vitest";
import {
  validateEmail,
  validateName,
  validatePasswords,
  validateRegisterForm,
} from "@/helpers/validators";

describe("validators", () => {
  it("validateEmail", () => {
    expect(validateEmail("ok@mail.com")).toBe(false);
    expect(validateEmail("bad")).toBeTypeOf("string");
  });

  it("validateName", () => {
    expect(validateName("John")).toBe(false);
    expect(validateName("")).toBeTypeOf("string");
  });

  it("validatePasswords", () => {
    expect(validatePasswords("abc123", "abc123")).toBe(false);
    expect(validatePasswords("abc", "abc")).toBeTypeOf("string");
    expect(validatePasswords("abc123", "zzz")).toBeTypeOf("string");
  });

  it("validateRegisterForm", () => {
    const form = new FormData();
    form.set("name", "John");
    form.set("email", "john@mail.com");
    form.set("password", "abc123");
    form.set("confirm", "abc123");
    expect(validateRegisterForm(form)).toBe(null);
  });
});
