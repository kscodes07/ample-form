"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Form from "@/components/Form";
import { ChakraProvider } from "@chakra-ui/react";
import FormGPT from "@/components/FormGPT";

export default function Home() {
  return (
    <ChakraProvider>
      <Form />
      {/* <FormGPT /> */}
    </ChakraProvider>
  );
}
