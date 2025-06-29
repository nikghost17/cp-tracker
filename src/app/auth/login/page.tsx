import LoginForm from "@/components/auth/login-form";

interface LoginPageProps {
  searchParams?: Promise<{
    message?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <LoginForm />
      {params?.message && (
        <p className="mt-4 p-4 bg-red-100 text-red-700 text-center">
          {params.message}
        </p>
      )}
    </div>
  );
}
