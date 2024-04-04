import Users from "../../../models/user";
import { connectToDB } from "@utils/database";



export const POST = async (request) => {
  

  const { name, phoneNumber, email, hobbies } = await request.json();

  console.log(name, phoneNumber, email, hobbies);

  if (!name || !phoneNumber || !email || !hobbies) {
    // return res.status(422).json({ error: "Please add all the fields" });
    return new Response(
      JSON.stringify({ error: "Please add all the fields" }),
      { status: 422 }
    );
  }

  try {

    await connectToDB();
   

    const existingUser = await Users.findOne({ $or: [{ email: email }] });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists with that email" }),
        { status: 422 }
      );
    }

    const user = new Users({
      name,
      phone_number: phoneNumber,
      email,
      hobbies: hobbies,
    });

    await user.save();
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
