import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  RadioGroup,
  HStack,
  Radio,
  useToast,
} from "@chakra-ui/react";
import firebase from "firebase/app";
import "firebase/firestore";

// Initialize Firebase
// const firebaseConfig = {
//   // Your Firebase configuration
// };

// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

function FormGPT() {
  const toast = useToast();
  const [formValues, setFormValues] = useState<any>({
    projectName: "",
    projectType: "",
    pitch: "",
    team: "",
    socialLinks: "",
    pitchDocs: [],
    pitchMedia: null,
    hasBudget: "",
    includeNFTs: "",
    email: "",
    acceptTerms: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "pitchDocs") {
      setFormValues({ ...formValues, pitchDocs: [...files] });
    } else if (name === "pitchMedia") {
      setFormValues({ ...formValues, pitchMedia: files[0] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("projectName", formValues.projectName);
      formData.append("projectType", formValues.projectType);
      formData.append("pitch", formValues.pitch);
      formData.append("team", formValues.team);
      formData.append("socialLinks", formValues.socialLinks);
      formValues.pitchDocs.forEach((doc: any, index: any) => {
        formData.append(`pitchDoc${index + 1}`, doc);
      });
      if (formValues.pitchMedia) {
        formData.append("pitchMedia", formValues.pitchMedia);
      }
      formData.append("hasBudget", formValues.hasBudget);
      formData.append("includeNFTs", formValues.includeNFTs);
      formData.append("email", formValues.email);
      formData.append("acceptTerms", formValues.acceptTerms);

      //   await db.collection("forms").add({
      //     projectName: formValues.projectName,
      //     projectType: formValues.projectType,
      //     pitch: formValues.pitch,
      //     team: formValues.team,
      //     socialLinks: formValues.socialLinks,
      //     pitchDocs: formValues.pitchDocs.map((doc: any) => doc.name),
      //     pitchMedia: formValues.pitchMedia ? formValues.pitchMedia.name : null,
      //     hasBudget: formValues.hasBudget,
      //     includeNFTs: formValues.includeNFTs,
      //     email: formValues.email,
      //     acceptTerms: formValues.acceptTerms,
      //   });

      // Reset form values
      setFormValues({
        projectName: "",
        projectType: "",
        pitch: "",
        team: "",
        socialLinks: "",
        pitchDocs: [],
        pitchMedia: null,
        hasBudget: "",
        includeNFTs: "",
        email: "",
        acceptTerms: "",
      });

      toast({
        title: "Form submitted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error submitting form",
        description:
          "An error occurred while submitting the form. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Name of your project (500 character limit)</FormLabel>
        <Textarea
          name="projectName"
          value={formValues.projectName}
          onChange={handleInputChange}
          maxLength={500}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Type of project</FormLabel>
        <RadioGroup
          name="projectType"
          value={formValues.projectType}
          onChange={handleInputChange}
        >
          <HStack spacing="24px">
            <Radio value="Music">Music</Radio>
            <Radio value="Film">Film</Radio>
            <Radio value="Show">Show</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>
          What is your pitch/synopsis that you want to showcase? (500 character
          limit)
        </FormLabel>
        <Textarea
          name="pitch"
          value={formValues.pitch}
          onChange={handleInputChange}
          maxLength={500}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>
          Who is your team? What experience do you have? (500 character limit)
        </FormLabel>
        <Textarea
          name="team"
          value={formValues.team}
          onChange={handleInputChange}
          maxLength={500}
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          Do you have any social links or a website you'd like to share with
          your project?
        </FormLabel>
        <Input
          type="text"
          name="socialLinks"
          value={formValues.socialLinks}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          Please upload any pitch docs you have. This could include your pitch
          deck, script, look book or whatever else you feel represents your idea
          and vision. (limit to 2 docs)
        </FormLabel>
        <Input
          type="file"
          name="pitchDocs"
          multiple
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>
          Please upload any pitch media you have. This could be a teaser/pitch
          reel or an audio demo. (limit to 1 video or audio file)
        </FormLabel>
        <Input
          type="file"
          name="pitchMedia"
          accept="audio/*,video/*"
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>
          Do you have a rough budget you can share if selected?
        </FormLabel>
        <RadioGroup
          name="hasBudget"
          value={formValues.hasBudget}
          onChange={handleInputChange}
        >
          <HStack spacing="24px">
            <Radio value="Y">Yes</Radio>
            <Radio value="N">No</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>
          Are you open to the idea of including NFTs with your project and
          distributing through Ample's platform and partner platforms? **Don't
          worry, this isn't a commitment; we will have an in-depth conversation
          before we make any final decisions.
        </FormLabel>
        <RadioGroup
          name="includeNFTs"
          value={formValues.includeNFTs}
          onChange={handleInputChange}
        >
          <HStack spacing="24px">
            <Radio value="Y">Yes</Radio>
            <Radio value="N">No</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>What is your email address?</FormLabel>
        <Input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>
          Do you understand and accept that we will be showing your pitch
          content on our site (app.ample.stream) and possibly using your pitch
          material to help market the pitch contest and your project through the
          duration of the contest?
        </FormLabel>
        <RadioGroup
          name="acceptTerms"
          value={formValues.acceptTerms}
          onChange={handleInputChange}
        >
          <HStack spacing="24px">
            <Radio value="Y">Yes</Radio>
            <Radio value="N">No</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <Button
        type="submit"
        colorScheme="blue"
        maxW="100"
        justifyContent="center"
      >
        Submit
      </Button>
    </form>
  );
}

export default FormGPT;
