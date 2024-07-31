import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  // In Next.js old versions new version handle it by itself
  // This should be added in all other routes
  // WORK: it checks what is request type , if user send POST request with this route it should give some warning or message
  //   if (request.method !== "GET") {
  //     return Response.json(
  //       {
  //         success: false,
  //         message: "This route allowed only for GET method",
  //       },
  //       { status: 405 }
  //     );
  //   }

  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    const result = UsernameQuerySchema.safeParse(queryParam);
    // console.log(result);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];

      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    // console.log(result.data);
    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken, Try another!",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique and valid",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while validating username", error);

    return Response.json(
      {
        success: false,
        message: "Error while validating username",
      },
      { status: 500 }
    );
  }
}
