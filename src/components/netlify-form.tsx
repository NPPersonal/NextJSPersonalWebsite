"use client";
import React from "react";
import { useTranslations } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getReCAPTCHAKey } from "@/lib/reCAPTCHA";
import { Textarea } from "./ui/textarea";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Typography } from "./ui/typography";

export interface NetlifyFormProps extends React.ComponentProps<"form"> {
  reCAPTCHALocale?: string;
}

interface FormState {
  error: Error | null;
  success: boolean;
  sending: boolean;
}

const NetlifyForm = React.forwardRef<HTMLFormElement, NetlifyFormProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ reCAPTCHALocale = "en", ...props }, ref) => {
    const t = useTranslations("MessageMe");
    const [reCAPTCHAKey, setReCAPTCHAKey] = React.useState<string | null>(null);
    const [formState, setFormState] = React.useState<FormState>({
      error: null,
      success: false,
      sending: false,
    });
    const reCAPTCHARef = React.useRef<ReCAPTCHA | null>(null);
    const onReCAPTCHAChange = (token: string | null) => {
      if (token) {
        form.setValue("recaptcha", token);
        form.clearErrors("recaptcha");
      } else {
        reCAPTCHARef.current?.reset();
        form.resetField("recaptcha", { defaultValue: "" });
      }
    };
    const onReCAPTCHAError = () => {
      form.setValue("recaptcha", "");
      form.setError("recaptcha", {
        type: "custom",
        message: t("form_recaptcha_error"),
      });
    };
    const formSchema = z
      .object({
        "form-name": z.string(),
        name: z
          .string({
            required_error: t("form_name_required"),
          })
          .trim()
          .min(1, t("form_min_character_required")),
        email: z
          .string({
            required_error: t("form_email_required"),
          })
          .trim()
          .email(t("form_email_invalid"))
          .min(1, t("form_min_character_required")),
        message: z
          .string({
            required_error: t("form_message_required"),
          })
          .trim()
          .min(1, t("form_min_character_required")),
        recaptcha: z
          .string({
            required_error: t("form_no_robot"),
          })
          .min(1, t("form_no_robot")),
      })
      .required({
        name: true,
        email: true,
        message: true,
      });

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        "form-name": "contact",
        name: "",
        email: "",
        message: "",
        recaptcha: "",
      },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
      const formValues = {
        "form-name": values["form-name"],
        name: values.name,
        email: values.email,
        message: values.message,
      };
      //mimic sending form to server under development mode
      if (process.env.NODE_ENV === "development") {
        try {
          console.log(formValues, values);
          setFormState({ sending: true, error: null, success: false });
          //   throw new Error("Unable to sent E-mail");
          setTimeout(() => {
            setFormState({ sending: false, error: null, success: true });
            form.reset();
            toast.success(t("from_submit_successful"));
          }, 3000);
        } catch (error: unknown) {
          let err = null;
          if (error instanceof Error) {
            err = error;
          } else {
            err = new Error(t("from_submit_fail"));
          }
          toast.error(err.message);
          setFormState({ sending: false, error: err, success: false });
        } finally {
          reCAPTCHARef.current?.reset();
        }
        return;
      }

      // This will run in production mode in Netlify server
      const urlEncoded = new URLSearchParams(formValues).toString();
      try {
        setFormState({ sending: true, error: null, success: false });
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: urlEncoded,
        }).then((response) => {
          if (response.ok === false) {
            throw Error(t("from_submit_fail"));
          }
          form.reset();
          toast.success(t("from_submit_successful"));
          setFormState({ sending: false, error: null, success: true });
        });
      } catch (error: unknown) {
        reCAPTCHARef.current?.reset();
        let err = null;
        if (error instanceof Error) {
          err = error;
        } else {
          err = new Error(t("from_submit_fail"));
        }
        toast.error(err.message);
        setFormState({ sending: false, error: err, success: false });
      } finally {
        reCAPTCHARef.current?.reset();
      }
    };

    React.useEffect(() => {
      const retrieveReCAPTCHAKey = async () => {
        const key = await getReCAPTCHAKey();
        setReCAPTCHAKey(key);
      };
      retrieveReCAPTCHAKey();
    }, []);

    if (reCAPTCHAKey === null) {
      return (
        <div className="flex flex-col w-full justify-center items-center">
          <svg
            className="animate-spin w-9 h-9"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <Typography className="pt-4 text-lg" variant="strong">
            {t("form_preparing")}
          </Typography>
        </div>
      );
    }
    return (
      <React.Fragment>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography variant="strong">
                      {t("form_name_label")}
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form_name_placeholder")}
                      disabled={formState.sending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>
                    <Typography variant="strong">
                      {t("form_email_label")}
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form_email_placeholder")}
                      disabled={formState.sending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>
                    <Typography variant="strong">
                      {t("form_message_label")}
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("form_message_placeholder")}
                      disabled={formState.sending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recaptcha"
              render={() => (
                <FormItem className="my-4">
                  <ReCAPTCHA
                    ref={reCAPTCHARef}
                    sitekey={reCAPTCHAKey ? reCAPTCHAKey : ""}
                    onChange={onReCAPTCHAChange}
                    onErrored={onReCAPTCHAError}
                    hl={reCAPTCHALocale}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
              <Button type="submit" disabled={formState.sending}>
                <PaperPlaneIcon />
                <Typography className="ml-2">{t("form_submit_btn")}</Typography>
              </Button>
            </div>
          </form>
        </Form>
        <Toaster richColors position="bottom-center" />
      </React.Fragment>
    );
  }
);

NetlifyForm.displayName = "NetlifyForm";

export default NetlifyForm;
