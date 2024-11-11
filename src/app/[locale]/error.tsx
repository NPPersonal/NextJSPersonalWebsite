"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Common");
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex flex-col items-center">
      <Image
        className="mb-8"
        src="/static/images/error_icon.webp"
        alt="error image"
        width={200}
        height={200}
        priority
      />
      <Typography className="mb-8" variant="lg">
        {t("encounter_error")}
      </Typography>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {t("try_again")}
      </Button>
    </div>
  );
}
