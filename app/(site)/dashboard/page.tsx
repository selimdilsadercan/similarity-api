import { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import RequestApiKey from "./components/RequestApiKey";
import { formatDistance } from "date-fns";
import DashboardClient from "./table";

////

export const metadata: Metadata = {
  title: "Dashboard | Similarity API",
  description: "Free & open-source text similarity API",
};

const page = async () => {
  //user
  const user = await currentUser();
  if (!user?.id) redirect("/sign-in");

  ////

  //finding active api keys
  const apiKeys = await db.apiKey.findMany({
    where: { userId: user.id },
  });
  const activeApiKey = apiKeys.find((key) => key.enabled);

  ////

  //finding formattedRequests
  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id),
      },
    },
  });
  const formattedRequests = userRequests.map((req) => ({
    ...req,
    timestamp: `${formatDistance(new Date(req.timestamp), new Date())} ago`,
    status: req.status.toString(),
    duration: `${req.duration} ms`,
  }));

  console.log(formattedRequests);

  return (
    <div className="mx-auto mt-16 max-w-7xl">
      {activeApiKey ? (
        <DashboardClient
          userFirstName={user.firstName}
          activeApiKeyKey={activeApiKey.key}
          data={formattedRequests}
        />
      ) : (
        <RequestApiKey />
      )}
    </div>
  );
};

export default page;
