import React from "react";
import { Formik, Form } from "formik";
import Wrapper from "../components/Wrapper";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/core";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();

  return (
    <>
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values) => {
            const res = await register(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
      <DarkModeSwitch />
    </>
  );
};

export default register;
