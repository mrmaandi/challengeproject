import classNames from "classnames";
import type { GetStaticProps, NextPage } from "next";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";

interface Challenge {
  id: string;
  title: string;
}

export interface AddChallengeData {
  title: string;
}

interface Props {
  challenges: Challenge[];
}

const Home: NextPage = ({ challenges }: any) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: { title: "" } });
  const router = useRouter();

  const onSubmit = (data: AddChallengeData) => {
    console.log(data);

    fetch("/api/add-challenge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      router.replace(router.asPath);
      console.log(res);
    });
    reset();
  };

  const getFormErrorMessage = (name: string) => {
    return (
      errors.title && <small className="p-error">{errors.title.message}</small>
    );
  };

  return (
    <>
      <h2>Add challenge</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required." }}
          render={({ field, fieldState }) => (
            <span className="p-float-label">
              <InputText
                id={field.name}
                {...field}
                autoFocus
                className={classNames({ "p-invalid": fieldState.invalid })}
              />
              <label htmlFor={field.name}>Title</label>
            </span>
          )}
        />
        {getFormErrorMessage("email")}
        <Button type="submit" label="Submit" className="mt-2" />
      </form>

      {challenges.map((challenge: Challenge) => (
        <p key={challenge.id}>{challenge.title}</p>
      ))}
    </>
  );
};

export async function getStaticProps(context: GetStaticProps) {
  const prisma = new PrismaClient();

  const challenges: Challenge[] = await prisma.challenge
    .findMany()
    .finally(async () => {
      await prisma.$disconnect();
    });

  return {
    props: { challenges: JSON.parse(JSON.stringify(challenges)) },
  };
}

export default Home;
