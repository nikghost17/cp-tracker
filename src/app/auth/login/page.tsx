import LoginForm from "@/components/auth/login-form";

interface LoginPageProps {
  searchParams?: {
    message?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <LoginForm />
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-red-100 text-red-700 text-center">
          {searchParams.message}
        </p>
      )}
    </div>
  );
}
