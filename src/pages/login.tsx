import React from "react";
import { Formik, Form } from "formik";
import Wrapper from "../components/Wrapper";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/core";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { useLoginMutation } from "../generated/graphql";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <>
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const res = await login({ options: values });
            if (res.data?.login.errors) {
              setErrors(toErrorMap(res.data.login.errors));
            } else if (res.data?.login.user) {
              router.push("/");
            }
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
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
      <DarkModeSwitch />
    </>
  );
};

export default Login;
