import Users from "../../../../models/user";
import { connectToDB } from "@utils/database";

export const DELETE = async (request, { params }) => {
    console.log("parameter", params.userId);
    try {
      await connectToDB();
      const user = await Users.findByIdAndDelete(params.userId);
      if (!user) {
        return new Response("User NOT found", { status: 404 });
      }
      return new Response("User deleted successfully", { status: 200 });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Failed to Delete user", { status: 500 });
    }
  };



