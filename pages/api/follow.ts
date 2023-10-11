import FollowBar from "@/components/layout/FollowBar";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }
  try {
    const { userId } = req.body;
    const { currentUser } = await serverAuth(req, res);
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Invalid ID");
    }
    let updatedFollowingIds = [...(user.followingIds || [])];

    if (req.method === "POST") {
      try {
        updatedFollowingIds.push(userId);
      } catch (error) {
        console.log(error);
      }
    }
    if (req.method === "DELETE") {
      try {
        updatedFollowingIds.filter((followingId) => followingId !== userId);
      } catch (error) {
        console.log(error);
      }
    }
    // updated user



  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
