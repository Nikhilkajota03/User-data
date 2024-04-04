import Users from "../../../../models/user";
import { connectToDB } from "@utils/database";


export const PATCH = async (request, {params}) => {


    console.log(params.userId)

    const userId = params.userId;

    console.log(  "parameter" ,    params.userId);
  
  
    const { name, email, phoneNumber, hobbies } = await request.json();
  
    console.log(name, email, phoneNumber, hobbies)
  
    try {
        await connectToDB();


      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        { name, email, phoneNumber, hobbies },
        { new: true }
      );
  
      if (!updatedUser) {
        return new Response("User NOT found", { status: 404 })
      }
  
      return new Response(JSON.stringify(updatedUser), { status: 200 })
  
    } catch (error) {
      console.error(error);
      return new Response("Internal server error", { status: 500 })
    }
  };