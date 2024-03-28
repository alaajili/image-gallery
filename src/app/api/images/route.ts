"use server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page");
  // console.log("fetching page: ", page);
  try {
    const res = await fetch(`https://api.unsplash.com/photos?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Client-ID cS9KXEpaR3x_a8WG4Xz8ezMM5Si84HgjMplLLQd2RRw`,
      },
    
    });
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("error while fetching");
    return Response.json([]);
  }
}