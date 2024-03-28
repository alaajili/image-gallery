"use server"
export async function POST(req: Request) {
    
    const body = await req.json()
    // console.log(body)

    if (body.username === "muser1" && body.password === "mpassword1" ||
        body.username === "muser2" && body.password === "mpassword2")
    {
        return Response.json({status: "success", message: "success"})
    }
    else if (body.username === "muser3" && body.password === "mpassword3") {
        return  Response.json({status: "failed", message: "Blocked user"})
    }
    return Response.json({status: "failed", message: "Invalid credentials"})
}