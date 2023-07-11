"use client";
import { getData } from "@/app/firebase/actions";
import { Card, CardBody, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import Header from "./Header";

function FormList() {
  const [pitchList, setPitchList] = useState<any>([]);

  const fetchData = async () => {
    const list = await getData();
    console.log(JSON.stringify(list));
    setPitchList([...list]);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {/* hEY */}
      {{ pitchList: pitchList } ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "20px",
            border: "1px solid red",
          }}
        >
          {/* <Header /> */}
          {pitchList.map((pitch: any) => {
            return (
              <Card
                key={pitch.projectName}
                p="20"
                backgroundColor="white"
                // border="1px red solid"
                borderRadius="10px"
                width="80%"
                ml="20"
                // border="1px solid red"
                transition="box-shadow 0.5s"
                _hover={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)" }}
              >
                <Text>{pitch.formValues.projectName}</Text>
                <Text>{pitch.formValues.projectType}</Text>
              </Card>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default FormList;
