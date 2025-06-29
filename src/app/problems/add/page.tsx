import AddProblemForm from "@/components/problems/add-problem-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AddProblemPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login?message=You must be logged in to add a problem');
  }

  return (
    <div>
      <AddProblemForm />
      {params.message && (
        <p className="mt-4 p-4 bg-red-100 text-red-700 text-center max-w-lg mx-auto rounded-lg">
          {params.message}
        </p>
      )}
    </div>
  );
} 