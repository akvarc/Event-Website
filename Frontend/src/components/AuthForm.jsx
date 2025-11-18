import { Form, Link, useActionData, useNavigation, useSearchParams } from "react-router-dom";

function AuthForm() {
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <Form
        method="post"
        className="w-full max-w-md bg-stone-700 px-7 py-7 rounded-2xl space-y-6 shadow-lg"
      >
        <h1 className="text-xl font-bold text-slate-200">
          {isLogin ? "Log in" : "Create a new user"}
        </h1>

        {/* Error Messages */}
        {data && data.errors && (
          <ul className="text-red-300 text-sm space-y-1">
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        {/* Extra Message */}
        {data && data.message && (
          <p className="text-yellow-300 text-sm">{data.message}</p>
        )}

        {/* Email */}
        <p className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-slate-200 text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="rounded-md px-3 py-2 bg-stone-800 text-white border border-stone-600 focus:ring focus:ring-amber-500 outline-none"
          />
        </p>

        {/* Password */}
        <p className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-slate-200 text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="rounded-md px-3 py-2 bg-stone-800 text-white border border-stone-600 focus:ring focus:ring-amber-500 outline-none"
          />
        </p>

        {/* Actions */}
        <div className="flex justify-end items-center space-x-3">
          <Link
            to={`?mode=${isLogin ? "signup" : "login"}`}
            className="text-white px-3 py-2 rounded-md hover:bg-stone-600 transition"
          >
            {isLogin ? "Create new user" : "Login"}
          </Link>

          <button
            disabled={isSubmitting}
            className="bg-yellow-300 px-4 py-2 rounded-md hover:bg-amber-500 text-black font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting…" : "Save"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AuthForm;
