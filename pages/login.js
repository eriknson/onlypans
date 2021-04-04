import Link from "next/link";
import LoginForm from "../src/components/LoginForm";

export default function LogInPage(props) {
  return (
    <div>
      <h1>Log in</h1>
      <LoginForm />
    </div>
  );
}
