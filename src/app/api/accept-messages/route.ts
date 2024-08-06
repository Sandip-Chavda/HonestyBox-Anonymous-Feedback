import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated, try login/signup first!",
      },
      { status: 401 }
    );
  }

  const userId = user._id;

  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update message acceptance status!",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message aceeptance status updated successfully...",
        updatedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to update message acceptance status! ", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update message acceptance status!",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated, try login/signup first!",
      },
      { status: 401 }
    );
  }

  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found, try login/signup!",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to get message acceptance status! ", error);
    return Response.json(
      {
        success: false,
        message: "Failed to get message acceptance status!",
      },
      { status: 500 }
    );
  }
}
