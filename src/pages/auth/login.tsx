import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, loginSchemaType } from "./schemas";
import { login } from "./api";
import { useSetRecoilState } from "recoil";
import authState from "@/state/atom/auth";

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setAuth = useSetRecoilState(authState);
  const onSubmit = async (values: loginSchemaType) => {
    await login(values)
      .then((res) => {
        console.log("🚀 ~ onSubmit ~ response:", res);
        setAuth({
          loggedIn: true,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Log in to homestay Admin panel</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="focus-visible:ring-zinc-500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-zinc-500"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
