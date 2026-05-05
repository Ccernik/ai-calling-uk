import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, role, email, website, source, message, agreeTerms } = body

    // Validate required fields
    if (!fullName || !email || !agreeTerms) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // For now, just log the data and send a success response
    // In production, you'd send an actual email here
    console.log("Demo request received:", {
      fullName,
      role,
      email,
      website,
      source,
      message,
      timestamp: new Date().toISOString(),
    })

    // TODO: Configure nodemailer with your email service
    // const transporter = nodemailer.createTransport({...})
    // await transporter.sendMail({...})

    return NextResponse.json(
      { message: "Demo request submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing demo request:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
