import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const { register } = useAuth();
  const {
    handleSubmit,
    register: formRegister,
    formState: { errors },
  } = useForm();

  // Handler for form submission
  const onSubmit = async (data) => {
    try {
      await register(data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
      <form
        className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.username ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500`}
            type="text"
            id="username"
            placeholder="John Doe"
            {...formRegister("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500`}
            type="password"
            id="password"
            placeholder="********"
            {...formRegister("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
