import Users from "../../../models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, res) => {

  


    try {
        await connectToDB();
      const users = await Users.find();

      return new Response(JSON.stringify(users), { status: 200 })
      
    } catch (error) {
      console.error(error);

      return new Response("Internal Server Error", { status: 500 });
    }
  };