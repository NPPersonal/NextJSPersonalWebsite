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
import LoadingIcon from "./motion/loading-icon";

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
        name: "",
        email: "",
        message: "",
        recaptcha: "",
      },
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      const formValues = {
        "form-name": "contact",
        name: values.name,
        email: values.email,
        message: values.message,
      };
      //mimic sending form to server under development mode
      if (process.env.NODE_ENV !== "production") {
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
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: urlEncoded,
        });
        if (response.ok === false) {
          setFormState({ sending: false, error: null, success: false });
          throw new Error(t("from_submit_fail"));
        }
        form.reset();
        setFormState({ sending: false, error: null, success: true });
        // toast.success(t("from_submit_successful"));
      } catch (error) {
        let errMessage = "";
        if (error instanceof Error) {
          errMessage = error.message;
        } else {
          errMessage = t("from_submit_fail");
        }
        setFormState({
          sending: false,
          error: new Error(errMessage),
          success: false,
        });
        // toast.error(errMessage);
      } finally {
        reCAPTCHARef.current?.reset();
      }
    };

    if (formState.sending === false && formState.error !== null) {
      toast.error(formState.error.message);
    } else if (formState.sending === false && formState.success) {
      toast.success(t("from_submit_successful"));
    }

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
          <LoadingIcon />
          <Typography className="pt-4 text-lg" variant="strong">
            {t("form_preparing")}
          </Typography>
        </div>
      );
    }
    return (
      <React.Fragment>
        <Form {...form}>
          <form
            data-netlify="true"
            name="contact"
            method="post"
            onSubmit={form.handleSubmit(onSubmit)}
            {...props}
          >
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
