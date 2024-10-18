import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { z } from "zod";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Flex,
  Box,
} from "@mantine/core";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Check authentication state
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    if (data.email === "user@example.com" && data.password === "password123") {
      const token = "mock-token"; // Mock token, replace with real token
      login(token);
      navigate("/"); // Redirect to protected route
    } else {
      alert("Invalid credentials"); // Handle invalid login
    }
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" weight={900}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      {/* Test credential section -- */}
      <Box
        mt="lg"
        p="md"
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[0],
          borderRadius: theme.radius.md,
          textAlign: "center",
          border: `1px solid ${theme.colors.gray[3]}`,
        })}
      >
        <Text weight={700} color="dark" mb={5}>
          Test Credentials
        </Text>
        <Text color="dimmed" size="sm">
          Use the following credentials to log in:
        </Text>
        <Text size="sm" mt={3}>
          <strong>Email:</strong> user@example.com
        </Text>
        <Text size="sm">
          <strong>Password:</strong> password123
        </Text>
      </Box>

      {/* Main form */}
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onSubmit}>
          <TextInput
            label="Email"
            required
            {...register("email")}
            error={
              errors.email && <Text color="red">{errors?.email.message}</Text>
            }
            placeholder="you@mantine.dev"
          />
          <PasswordInput
            label="Password"
            required
            placeholder="Your password"
            mt="md"
            {...register("password")}
            error={
              errors.password && (
                <Text color="red">{errors.password?.message}</Text>
              )
            }
          />
          <Flex justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Flex>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
