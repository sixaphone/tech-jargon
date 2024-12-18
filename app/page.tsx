"use client";

import { Textarea } from "@/components/ui/textarea";
import Particles from "@/components/ui/particles";
import { Chips } from "@/components/ui/chips";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/chips copy";
import { generateResponse } from "@/server/jargon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import {
  GenerateJargonDto,
  GenerateJargonSchema,
  Levels,
} from "@/models/jargon";
import { SCOPES } from "@/constants/scopes";
import { TypeWriter } from "@/components/ui/type-writer";
import Image from "next/image";
import { ClipboardCopy } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<GenerateJargonDto>({
    values: {
      level: Levels.simple,
      text: "",
    },
    resolver: zodResolver(GenerateJargonSchema),
  });

  const onSubmit = useCallback(async (values: GenerateJargonDto) => {
    setResponse(() => null);
    const res = await generateResponse(values.text, values.level, values.scope);
    setResponse(() => res);
  }, []);

  const scope = watch("scope");

  return (
    <div className="min-h-screen flex flex-col">
      <main className="relative px-10 gap-10 flex flex-1 w-full flex-col items-center justify-center overflow-hidden bg-background">
        <h1 className="motion-preset-bouncetext-4xl text-center font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl text-dark">
          Tell us what you did and we will make sure it sounds complicated and
          advanced 🚀
        </h1>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <Select
            value={watch("level")}
            onValueChange={(value) =>
              setValue("level", value as GenerateJargonDto["level"])
            }
          >
            {errors.level && (
              <span className="text-red-500 text-sm">
                {errors.level.message}
              </span>
            )}
            <SelectTrigger className="w-full mb-4 z-10 bg-white">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Level</SelectLabel>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="complex">Complex</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {errors.text && (
            <span className="text-red-500 text-sm">{errors.text.message}</span>
          )}
          <Textarea
            autoFocus
            placeholder="Tell us what you did"
            className={cn(
              "motion-preset-fade shadow-lg shadow-gray-300 min-h-32 p-8 text-white bg-gray-800 placeholder:text-gray-300",
              errors.text ? "border-red-700" : ""
            )}
            maxLength={255 * 2}
            {...register("text")}
          />

          <p className="mt-4 mb-2 text-lg font-semibold">
            Additionaly select a tag to make it sound more professional
            (optional)
          </p>

          <Chips
            onChange={(item: string) => {
              setValue(
                "scope",
                item === scope
                  ? undefined
                  : (item as GenerateJargonDto["scope"])
              );
            }}
            value={scope as string}
            items={SCOPES}
          />

          <Button className="mt-8 w-full p-7 transition-transform duration-200 active:scale-x-[0.99]">
            {isSubmitting ? <Spinner /> : "Generate"}
          </Button>
        </form>
        <div className="flex flex-col gap-3 py-2 border min-h-32 text-black w-full z-10">
          {response && (
            <div className="flex w-full justify-end pr-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(response!);
                      }}
                    >
                      <ClipboardCopy width={15} height={15} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="border bg-gray-800 text-white z-10 p-2 text-sm font-semibold ">
                    Copy
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          {response && (
            <div className="px-8">
              <TypeWriter text={response} />
            </div>
          )}

          {!response && (
            <div className="w-full min-h-32 flex justify-center items-center">
              <p>The systems response will be here</p>
            </div>
          )}
        </div>
        <Particles
          className="absolute inset-0"
          quantity={1000}
          ease={80}
          color={"#000"}
          refresh
        />
      </main>
      <footer className="w-full border-t bg-white gap-2 flex justify-center items-center h-14">
        <Image width={24} height={24} src="/github.svg" alt="Github logo" />
        <a target="_blank" href="https://github.com/sixaphone">
          GitHub
        </a>
      </footer>
    </div>
  );
}
