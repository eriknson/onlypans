import Link from "next/link";
import SignUpForm from "../src/components/SignupForm";

export default function SignUpPage(props) {
  return (
    <div>
      <h1>Sign up</h1>
      <SignUpForm />
    </div>
  );
}
