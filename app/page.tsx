"use client";

import { Textarea } from "@/components/ui/textarea";
import Particles from "@/components/ui/particles";
import { Chips } from "@/components/ui/chips";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/chips copy";

const scopes = [
  "frontend",
  "backend",
  "devops",
  "design",
  "management",
  "other",
] as const;

const FormSchema = z.object({
  text: z.string().min(1).max(255),
  tag: z.enum(scopes).optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = useCallback(
    async (values: FormValues) => {
      const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(1000);
      reset();
      console.log({ values });
    },
    [reset]
  );

  console.log({ isSubmitting, errors });

  const tag = watch("tag");

  return (
    <main className="relative p-10  gap-10 flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <h1 className="motion-preset-bounce mb-10 text-4xl text-center font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-dark">
        Tell us what you did and we will make sure it sounds complicated and
        advanced 🚀
      </h1>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        {errors.text && (
          <span className="text-red-500 text-sm">{errors.text.message}</span>
        )}
        <Textarea
          autoFocus
          className={cn(
            "motion-preset-fade shadow-lg shadow-gray-300 min-h-32 p-8 text-white bg-gray-800",
            errors.text ? "border-red-700" : ""
          )}
          maxLength={255 * 2}
          {...register("text")}
        />

        <p className="mt-4 mb-2 text-lg font-semibold">
          Additionaly select a tag to make it sound more professional (optional)
        </p>

        <Chips
          onChange={(item: string) => {
            setValue(
              "tag",
              item === tag ? undefined : (item as FormValues["tag"])
            );
          }}
          value={tag as string}
          items={scopes}
        />

        <Button className="mt-8 w-full p-7 transition-transform duration-200 active:scale-x-[0.99]">
          {isSubmitting ? <Spinner /> : "Generate"}
        </Button>
      </form>
      <div className="motion-preset-fade shadow-gray-300 min-h-32 p-8 text-white w-full z-10"></div>
      <Particles
        className="absolute inset-0"
        quantity={1000}
        ease={80}
        color={"#000"}
        refresh
      />
    </main>
  );
}
