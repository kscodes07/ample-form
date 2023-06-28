import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Radio,
  RadioGroup,
  HStack,
  Textarea,
  Text,
  Card,
  Button,
} from "@chakra-ui/react";
import { addData } from "@/app/firebase/actions";

function Form() {
  const [formValues, setFormValues] = useState<any>({
    projectName: "",
    projectType: "",
    pitch: "",
    team: "",
    socialLinks: "",
    pitchDocs: null,
    pitchMedia: null,
    hasBudget: "Yes",
    includeNFTs: "Yes",
    email: "",
    acceptTerms: "Yes",
  });

  const [formErrors, setFormErrors] = useState<any>({});

  const validateForm = () => {
    const errors: any = {};
    let isValid = true;

    if (!formValues.projectName.trim()) {
      errors.projectName = "Project name is required";
      isValid = false;
    }

    if (!formValues.projectType) {
      errors.projectType = "Project type is required";
      isValid = false;
    }

    if (!formValues.pitch.trim()) {
      errors.pitch = "Pitch is required";
      isValid = false;
    }

    if (!formValues.team.trim()) {
      errors.team = "Team information is required";
      isValid = false;
    }

    if (!formValues.email.trim()) {
      errors.email = "Email address is required";
      isValid = false;
    }

    if (!formValues.acceptTerms) {
      errors.acceptTerms = "Please accept the terms";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (validateForm()) {
      // Valid form, submit the data or perform further actions
      console.log("Form submitted:", formValues);
      await addData(formValues);
    } else {
      // Invalid form, display error messages
      console.log("Form validation failed");
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        as="fieldset"
        display="flex"
        flexDirection="column"
        gap="10"
        ml="10"
        maxW="80%"
      >
        <Card p="5">
          <FormControl isRequired isInvalid={formErrors.projectName}>
            <FormLabel>Name of your Project</FormLabel>
            <Input
              type="text"
              name="projectName"
              value={formValues.projectName}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.projectName}</FormErrorMessage>
          </FormControl>
        </Card>

        <Card p="5">
          <FormControl isRequired isInvalid={formErrors.projectType}>
            <FormLabel>Type Of project</FormLabel>
            <RadioGroup
              defaultValue={formValues.projectType}
              onChange={(value) =>
                setFormValues({ ...formValues, projectType: value })
              }
            >
              <HStack spacing="24px">
                <Radio value="Music">Music</Radio>
                <Radio value="Film">Film</Radio>
                <Radio value="Show">Show</Radio>
              </HStack>
            </RadioGroup>
            <FormErrorMessage>{formErrors.projectType}</FormErrorMessage>
          </FormControl>
        </Card>

        <Card p="5">
          <FormControl isRequired isInvalid={formErrors.pitch}>
            <FormLabel>
              What is your pitch/synopsis that you want to showcase?
            </FormLabel>
            <Textarea
              name="pitch"
              value={formValues.pitch}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.pitch}</FormErrorMessage>
          </FormControl>
        </Card>

        <Card p="5">
          <FormControl isRequired isInvalid={formErrors.team}>
            <FormLabel>
              Who is your team? What experience do you have?
            </FormLabel>
            <Textarea
              name="team"
              value={formValues.team}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.team}</FormErrorMessage>
          </FormControl>
        </Card>

        <Card p="5">
          <FormControl>
            <FormLabel>
              Do you have any social links or a website you would like to share
              with your project?
            </FormLabel>
            <Textarea
              name="socialLinks"
              value={formValues.socialLinks}
              onChange={handleInputChange}
            />
          </FormControl>
        </Card>

        <Card p="5">
          <FormControl isRequired isInvalid={formErrors.pitchDocs}>
            <FormLabel>
              Please upload any pitch docs you have. This could include your
              pitch deck, script, look book, or whatever else you feel
              represents your idea and vision.
            </FormLabel>
            <Input type="file" name="pitchDocs" onChange={handleInputChange} />
            <FormErrorMessage>{formErrors.pitchDocs}</FormErrorMessage>
          </FormControl>
        </Card>

        <Card p="5">
          <FormControl isRequired isInvalid={formErrors.pitchMedia}>
            <FormLabel>
              Please upload any pitch media you have. This could be a
              teaser/pitch reel or an audio demo.
            </FormLabel>
            <Input
              type="file"
              name="pitchMedia"
              accept="audio/*,video/*"
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.pitchMedia}</FormErrorMessage>
          </FormControl>
        </Card>

        <Card p="5">
          <FormControl isRequired>
            <FormLabel>
              Do you have a rough budget you can share if selected?
            </FormLabel>
            <RadioGroup
              defaultValue={formValues.hasBudget}
              onChange={(value) =>
                setFormValues({ ...formValues, hasBudget: value })
              }
            >
              <HStack spacing="24px">
                <Radio value="Yes" colorScheme="green">
                  Yes
                </Radio>
                <Radio value="No" colorScheme="red">
                  No
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </Card>

        <Card p="5">
          <FormControl isRequired>
            <FormLabel>
              Are you open to the idea of including NFTs with your project and
              distributing through Ample's platform and partner platforms?
            </FormLabel>
            <RadioGroup
              defaultValue={formValues.includeNFTs}
              onChange={(value) =>
                setFormValues({ ...formValues, includeNFTs: value })
              }
            >
              <HStack spacing="24px">
                <Radio value="Yes" colorScheme="green">
                  Yes
                </Radio>
                <Radio value="No" colorScheme="red">
                  No
                </Radio>
              </HStack>
            </RadioGroup>
            <FormHelperText>
              **Do not worry, this is not a commitment. We will have an in-depth
              conversation before we make any final decisions.
            </FormHelperText>
          </FormControl>
        </Card>

        <Card p="5">
          <FormControl isRequired isInvalid={formErrors.email}>
            <FormLabel>What is your email address?</FormLabel>
            <Input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
          </FormControl>
        </Card>

        <Card p="5">
          <FormControl isRequired>
            <FormLabel>
              Do you understand and accept that we will be showing your pitch
              content on our site (app.ample.stream) and possibly using your
              pitch material to help market the pitch contest and your project
              throughout the duration of the contest?
            </FormLabel>
            <RadioGroup
              defaultValue={formValues.acceptTerms}
              onChange={(value) =>
                setFormValues({ ...formValues, acceptTerms: value })
              }
            >
              <HStack spacing="24px">
                <Radio value="Yes" colorScheme="green">
                  Yes
                </Radio>
                <Radio value="No" colorScheme="red">
                  No
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </Card>

        <Button
          type="submit"
          colorScheme="blue"
          maxW="100"
          justifyContent="center"
        >
          Submit
        </Button>
      </FormControl>
    </form>
  );
}

export default Form;
