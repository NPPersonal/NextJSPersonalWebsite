"use server";

export const getReCAPTCHAKey = async () => {
  return process.env.RECAPTCHA_KEY ? process.env.RECAPTCHA_KEY : "";
};
