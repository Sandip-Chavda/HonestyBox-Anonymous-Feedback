import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;

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

  try {
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or Already deleted!",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted Successfuly",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while deleteing message ", error);

    return Response.json(
      {
        success: false,
        message: "Error while deleteing message!",
      },
      { status: 500 }
    );
  }
}
