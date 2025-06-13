import { User } from "@/lib/types/user.type";
import { Role } from '@/lib/types/user.type';
import { apiClientMethods } from '@/lib/utils/apiClient';

type LoginUserFunc = (data: { email: string; password: string }) => Promise<{
  success: boolean;
  error: string | null;
  data: Pick<User, "id" | "email" | "role" | "name"> | null;
}>;

export const LoginUser: LoginUserFunc = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiClientMethods.post<{
      success: boolean;
      data: Pick<User, "id" | "email" | "role" | "name">;
      message?: string;
    }>(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data);

    if (response.success && response.data) {
      return {
        success: true,
        error: null,
        data: response.data,
      };
    }

    return {
      success: false,
      error: response.message || "Invalid credentials.",
      data: null,
    };
  } catch (err) {
    console.error("Login error:", err);
    return {
      success: false,
      error: "Network error. Please check your connection.",
      data: null,
    };
  }
};

export type RegisterUserFunc = (data: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  confirmPassword: string;
}) => Promise<{
  success: boolean;
  error: string | null;
  data:
    | (Pick<User, "id" | "email" | "role"> & {
        name: string;
      })
    | null;
}>;

export const RegisterUser: RegisterUserFunc = async (data: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  confirmPassword: string;
}) => {
  try {
    const user = {
      email: data.email,
      password: data.password,
      name: `${data.firstname} ${data.lastname}`,
    };
    console.log(user);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      }
    );

    const json = await res.json();

    console.log(res.status);
    //console.log(json);
    //console.log(json.data);
    if (res.status === 201) {
      return {
        success: true,
        error: null,
        data: json.data,
      };
    }

    if (res.status >= 400 && res.status < 500) {
      return {
        success: false,
        error: json.message || "Invalid credentials.",
        data: null,
      };
    }

    if (res.status >= 500) {
      return {
        success: false,
        error: "Server is busy, please try again later.",
        data: null,
      };
    }
    return {
      success: false,
      error: "Something went wrong.",
      data: null,
    };
  } catch (err) {
    console.error("Login error:", err);
    return {
      success: false,
      error: "Network error. Please check your connection.",
      data: null,
    };
  }
};

export type SubmitOTPVerficationCodeFunc = (
  verificationCode: string
) => Promise<{
  success: boolean;
  error: string | null;
  data: null;
}>;

export const SubmitOTPVerficationCode: SubmitOTPVerficationCodeFunc = async (
  code
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code }),
      }
    );

    const json = await res.json();

    if (res.ok) {
      return {
        success: true,
        error: null,
        data: null,
      };
    }

    if (res.status >= 400 && res.status < 500) {
      return {
        success: false,
        error: json.message || "Invalid credentials.",
        data: null,
      };
    }
    if (res.status >= 500) {
      return {
        success: false,
        error: "Server is busy, please try again later.",
        data: null,
      };
    }

    return {
      success: false,
      error: "Something went wrong.",
      data: null,
    };
  } catch (err) {
    console.error("Login error:", err);
    return {
      success: false,
      error: "Network error. Please check your connection.",
      data: null,
    };
  }
};

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export const UserApis = {
  me: async (): Promise<ApiResponse<UserResponse>> => {
    try {
      return await apiClientMethods.get<ApiResponse<UserResponse>>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`
      );
    } catch (error) {
      return {
        success: false,
        message: 'Network error while getting user info',
        data: null
      };
    }
  },

  refreshToken: async (): Promise<ApiResponse<UserResponse>> => {
    try {
      return await apiClientMethods.get<ApiResponse<UserResponse>>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`
      );
    } catch (error) {
      return {
        success: false,
        message: 'Network error while refreshing token',
        data: null
      };
    }
  }
} as const;
